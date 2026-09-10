import { connectDB } from "@/lib/db";
import { auth } from "@/auth";
import Order from "@/model/Order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "لطفاً ابتدا وارد حساب خود شوید." },
        { status: 401 },
      );
    }

    await connectDB();

    const formData = await req.formData();

    const productId = formData.get("productId") as string;
    const price = Number(formData.get("price"));

    const extrasRaw = formData.get("extras") as string;

    const extras = extrasRaw ? JSON.parse(extrasRaw) : [];

    const image = formData
      .getAll("image")
      .filter((item): item is string => typeof item === "string");

    const order = await Order.create({
      userId: session.user.id,

      productId,
      price,

      bedSize: formData.get("bedSize"),
      materials: formData.get("materials"),
      color: formData.get("color"),
      fabric: formData.get("fabric"),
      fabricColor: formData.get("fabricColor"),
      mattress: formData.get("mattress"),

      drawers: Number(formData.get("drawers") || 0),

      extras,

      description: formData.get("description"),
      userAddress: formData.get("userAddress"),
      phone: formData.get("phone"),

      image,
    });

    return NextResponse.json(
      {
        message: "سفارش با موفقیت ثبت شد.",
        order,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create order error:", error);

    return NextResponse.json({ message: "خطا در ثبت سفارش." }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find()
      .populate("userId", "name email phone")
      .populate("productId", "name price image")
      .sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Get orders error:", error);

    return NextResponse.json(
      { message: "خطا در دریافت سفارش‌ها." },
      { status: 500 },
    );
  }
}