import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/model/Product";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const formData = await req.formData();
    
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const material = formData.get("material") as string;
    const color = formData.get("color") as string;
    const size = formData.get("size") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const discount = Number(formData.get("discount"));

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 },
      );
    }

    product.name = name;
    product.category = category;
    product.material = material;
    product.color = color;
    product.size = size;
    product.description = description;
    product.price = price;
    product.discount = discount;

    // Update images here if new images are uploaded

    await product.save();

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 },
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error.",
      },
      { status: 500 },
    );
  }
}
