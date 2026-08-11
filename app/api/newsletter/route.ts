import { NextResponse } from "next/server";
import Newsletter from "@/model/Newsletter";
import { connectDB } from "@/lib/db";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "ایمیل الزامی است",
        },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "ایمیل وارد شده معتبر نیست",
        },
        { status: 400 },
      );
    }

    // Check duplicate
    const existingSubscriber = await Newsletter.findOne({
      email: normalizedEmail,
    });

    if (existingSubscriber) {
      return NextResponse.json(
        {
          success: false,
          message: "این ایمیل قبلاً در خبرنامه ثبت شده است",
        },
        { status: 409 },
      );
    }

    // Save subscriber
    const subscriber = await Newsletter.create({
      email: normalizedEmail,
    });

    return NextResponse.json(
      {
        success: true,
        message: "با موفقیت در خبرنامه ثبت شدید",
        data: {
          id: subscriber._id,
          email: subscriber.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Newsletter API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ثبت ایمیل",
      },
      { status: 500 },
    );
  }
}
