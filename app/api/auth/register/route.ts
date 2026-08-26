import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/model/User";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, email, password, phone } = body;

    // Validate fields
    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        {
          message: "تمامی فیلدها الزامی هستند.",
        },
        {
          status: 400,
        },
      );
    }

    // Check existing user
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "این ایمیل قبلا ثبت شده است.",
        },
        {
          status: 409,
        },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,

      // First user can be admin manually
      // change this later if needed
      role: "user",
    });

    return NextResponse.json(
      {
        message: "ثبت نام با موفقیت انجام شد.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("REGISTER_ERROR:", error);

    return NextResponse.json(
      {
        message: "خطای داخلی سرور.",
      },
      {
        status: 500,
      },
    );
  }
}
