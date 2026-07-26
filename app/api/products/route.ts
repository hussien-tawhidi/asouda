import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/model/Product";
import fs from "fs/promises";
import path from "path";

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required." },
        { status: 400 },
      );
    }

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 },
      );
    }
    if (Array.isArray(product.image)) {
      await Promise.all(
        product.image.map(async (imagePath: string) => {
          try {
            // Example imagePath: "/uploads/products/abc.jpg"
            const filePath = path.join(
              process.cwd(),
              "public",
              imagePath.replace(/^\/+/, ""),
            );

            await fs.unlink(filePath);
          } catch (error) {
            console.error(`Failed to delete ${imagePath}:`, error);
          }
        }),
      );
    }
    await Product.findByIdAndDelete(productId);

    return NextResponse.json(
      {
        success: true,
        message: "Product deleted successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE Product Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error.",
      },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    console.log("🚀 ~ GET ~ searchParams:", searchParams)

    const category = searchParams.get("category");
    console.log("🚀 ~ GET ~ category:", category)
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");

    const query: Record<string, unknown> = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    let mongoQuery = Product.find(query);

    switch (sort) {
      case "cheap":
        mongoQuery = mongoQuery.sort({ price: 1 });
        break;

      case "expensive":
        mongoQuery = mongoQuery.sort({ price: -1 });
        break;

      case "discount":
        mongoQuery = mongoQuery.sort({ discount: -1 });
        break;

      case "popular":
        mongoQuery = mongoQuery.sort({ rating: -1 });
        break;

      case "newest":
        mongoQuery = mongoQuery.sort({ createdAt: -1 });
        break;

      default:
        mongoQuery = mongoQuery.sort({ createdAt: -1 });
    }

    const products = await mongoQuery.lean();

    return NextResponse.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products.",
      },
      {
        status: 500,
      },
    );
  }
}
