import { connectDB } from "@/lib/db";
import Product from "@/model/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().lean();

    return NextResponse.json(
      {
        success: true,
        data: products,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/products:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت محصولات",
      },
      { status: 500 },
    );
  }
}
