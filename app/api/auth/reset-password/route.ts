import { NextResponse } from "next/server";

import crypto from "crypto";

import bcrypt from "bcryptjs";

import User from "@/model/User";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json(
        {
          message: "اطلاعات لازم وارد نشده است.",
        },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          message: "رمز عبور باید حداقل ۶ کاراکتر باشد.",
        },
        { status: 400 },
      );
    }

    // Hash token from URL
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: {
        $gt: new Date(),
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "لینک تغییر رمز عبور نامعتبر یا منقضی شده است.",
        },
        { status: 400 },
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;

    // Invalidate token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return NextResponse.json({
      message: "رمز عبور با موفقیت تغییر کرد. در حال انتقال به صفحه ورود...",
    });
  } catch (error) {
    console.error("RESET_PASSWORD_ERROR:", error);

    return NextResponse.json(
      {
        message: "خطای داخلی سرور.",
      },
      { status: 500 },
    );
  }
}
