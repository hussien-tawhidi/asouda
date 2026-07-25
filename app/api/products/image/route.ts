// app/api/products/delete-image/route.ts

import { NextRequest, NextResponse } from "next/server";
import Product from "@/model/Product";
import fs from "fs/promises";
import path from "path";
import { connectDB } from "@/lib/db";
import { saveUploadedFile } from "@/lib/image";

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();

    const productId = formData.get("productId") as string;
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "No image uploaded" },
        { status: 400 },
      );
    }

    
    await connectDB();
    
    const product = await Product.findById(productId);
    const imageUrl = await saveUploadedFile(
      file,
      `products/${product.category}/${product.name}`,
    );

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    // Add the new image instead of replacing all images
    product.image.push(imageUrl);

    await product.save();

    return NextResponse.json({
      success: true,
      image: imageUrl,
      images: product.image,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { productId, imageUrl } = await req.json();

    if (!productId || !imageUrl) {
      return NextResponse.json(
        { message: "Missing productId or imageUrl" },
        { status: 400 },
      );
    }

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    // Remove image from MongoDB
    product.image = product.image.filter((img: string) => img !== imageUrl);

    await product.save();

    // Delete file from /public
    const relativePath = imageUrl.startsWith("/")
      ? imageUrl.slice(1)
      : imageUrl;

    const filePath = path.join(process.cwd(), "public", relativePath);

    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.log("🚀 ~ DELETE ~ err:", err);
      console.warn("Image file not found:", filePath);
    }

    return NextResponse.json({
      success: true,
      image: product.image,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
