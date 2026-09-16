
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import User from "@/model/User";

import { toGregorian, isValidJalaaliDate } from "jalaali-js";

function normalizeDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (char) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(char))
    )
    .replace(/[٠-٩]/g, (char) =>
      String("٠١٢٣٤٥٦٧٨٩".indexOf(char))
    );
}

export async function PATCH(req: Request) {
  try {
    // --------------------------------
    // Authentication
    // --------------------------------

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          message:
            "برای انجام این کار باید وارد حساب کاربری شوید.",
        },
        { status: 401 }
      );
    }

    // --------------------------------
    // Request body
    // --------------------------------

    const body = await req.json();

    const { name, email, phone, birthday } = body;

    // --------------------------------
    // Name validation
    // --------------------------------

    if (!name?.trim()) {
      return NextResponse.json(
        {
          message: "نام و نام خانوادگی الزامی است.",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // Email validation
    // --------------------------------

    if (!email?.trim()) {
      return NextResponse.json(
        {
          message: "ایمیل الزامی است.",
        },
        { status: 400 }
      );
    }

    const normalizedName = name.trim();

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    // --------------------------------
    // Phone
    // --------------------------------

    const normalizedPhone = phone
      ? normalizeDigits(phone.trim())
      : "";

    // --------------------------------
    // Email format
    // --------------------------------

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        {
          message: "فرمت ایمیل صحیح نیست.",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // Phone format
    // --------------------------------

    if (normalizedPhone) {
      const phoneRegex = /^09\d{9}$/;

      if (!phoneRegex.test(normalizedPhone)) {
        return NextResponse.json(
          {
            message: "شماره تلفن صحیح نیست.",
          },
          { status: 400 }
        );
      }
    }

    // --------------------------------
    // Birthday
    // Jalali → Gregorian
    // --------------------------------

    let normalizedBirthday: string | null = null;

    if (birthday) {
      if (typeof birthday !== "string") {
        return NextResponse.json(
          {
            message: "فرمت تاریخ تولد صحیح نیست.",
          },
          { status: 400 }
        );
      }

      // Convert Persian/Arabic digits to English
      const jalaliDate = normalizeDigits(
        birthday.trim()
      );

      // Check format
      if (!/^\d{4}-\d{2}-\d{2}$/.test(jalaliDate)) {
        return NextResponse.json(
          {
            message: "فرمت تاریخ تولد صحیح نیست.",
          },
          { status: 400 }
        );
      }

      const [jy, jm, jd] = jalaliDate
        .split("-")
        .map(Number);

      // Check whether the Jalali date is actually valid
      if (!isValidJalaaliDate(jy, jm, jd)) {
        return NextResponse.json(
          {
            message: "تاریخ تولد معتبر نیست.",
          },
          { status: 400 }
        );
      }

      // Convert Jalali → Gregorian
      const {
        gy,
        gm,
        gd,
      } = toGregorian(jy, jm, jd);

      // Save Gregorian date
      normalizedBirthday = [
        gy,
        String(gm).padStart(2, "0"),
        String(gd).padStart(2, "0"),
      ].join("-");
    }

    // --------------------------------
    // Database
    // --------------------------------

    await connectDB();

    // --------------------------------
    // Check duplicate email
    // --------------------------------

    const existingUser = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: session.user.id },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message:
            "این ایمیل قبلاً توسط کاربر دیگری استفاده شده است.",
        },
        { status: 409 }
      );
    }

    // --------------------------------
    // Update user
    // --------------------------------

    const updatedUser =
      await User.findByIdAndUpdate(
        session.user.id,
        {
          $set: {
            name: normalizedName,
            email: normalizedEmail,
            phone: normalizedPhone,
            birthday: normalizedBirthday,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      ).select("-password");

    // --------------------------------
    // User not found
    // --------------------------------

    if (!updatedUser) {
      return NextResponse.json(
        {
          message: "کاربر پیدا نشد.",
        },
        { status: 404 }
      );
    }

    // --------------------------------
    // Success
    // --------------------------------

    return NextResponse.json(
      {
        message:
          "اطلاعات پروفایل با موفقیت به‌روزرسانی شد.",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "PROFILE_UPDATE_ERROR:",
      error
    );

    return NextResponse.json(
      {
        message:
          "خطا در ذخیره تغییرات. لطفاً دوباره تلاش کنید.",
      },
      { status: 500 }
    );
  }
}
