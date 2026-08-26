import { NextResponse } from "next/server";
import crypto from "crypto";

import User from "@/model/User";
import { connectDB } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        {
          message: "ایمیل الزامی است.",
        },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          message: "ایمیل معتبر نیست.",
        },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email });

    // Don't reveal whether the email exists
    if (!user) {
      return NextResponse.json({
        message:
          "اگر حسابی با این ایمیل وجود داشته باشد، لینک تغییر رمز برای شما ارسال خواهد شد.",
      });
    }

    // Generate secure token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token before saving it
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Expire after 30 minutes
    user.resetPasswordToken = hashedToken;

    user.resetPasswordExpires = new Date(Date.now() + 30 * 60 * 1000);

    await user.save();

    const resetUrl =
      `${process.env.NEXT_PUBLIC_APP_URL}` +
      `/reset-password?token=${resetToken}`;

    await sendPasswordResetEmail({
      to: user.email,
      name: user.name,
      resetUrl,
    });

    return NextResponse.json({
      message: "لینک تغییر رمز عبور به ایمیل شما ارسال شد.",
    });
  } catch (error) {
    console.error("FORGOT_PASSWORD_ERROR:", error);

    return NextResponse.json(
      {
        message: "ارسال ایمیل با مشکل مواجه شد. دوباره تلاش کنید.",
      },
      { status: 500 },
    );
  }
}
