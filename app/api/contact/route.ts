import { connectDB } from "@/lib/db";
import ContactMessage from "@/model/ContactMessage";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const { name, email, phone, subject, message } = body;

    // Required fields
    if (!name?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "نام الزامی است",
        },
        { status: 400 },
      );
    }

    if (!email?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "ایمیل الزامی است",
        },
        { status: 400 },
      );
    }

    if (!subject?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "موضوع پیام الزامی است",
        },
        { status: 400 },
      );
    }

    if (!message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "متن پیام الزامی است",
        },
        { status: 400 },
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "ایمیل وارد شده معتبر نیست",
        },
        { status: 400 },
      );
    }

    // Save message
    const contactMessage = await ContactMessage.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || "",
      subject: subject.trim(),
      message: message.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "پیام شما با موفقیت ارسال شد",
        data: {
          id: contactMessage._id,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطایی در ارسال پیام رخ داد",
      },
      { status: 500 },
    );
  }
}
