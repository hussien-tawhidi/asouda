import { connectDB } from "@/lib/db";
import { saveUploadedFiles } from "@/lib/image";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    // Parse JSON arrays
    const parseJSON = (value: string | null) => {
      if (!value) return [];
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    };

    // --- Extract simple fields ---
    const _id = (formData.get("_id") as string) || undefined;
    const name = (formData.get("name") as string) || "";
    const price = Number(formData.get("price")) || 0;
    const category = (formData.get("category") as string) || "";
    const size = (formData.get("size") as string) || "";
    const material = (formData.get("material") as string) || "";
    const discount = Number(formData.get("discount")) || 0;
    const brand = (formData.get("brand") as string) || "";
    const description = (formData.get("description") as string) || "";
    const dimensions = (formData.get("dimensions") as string) || "";
    const weight = (formData.get("weight") as string) || "";
    const careInstructions = (formData.get("careInstructions") as string) || "";
    const bedSize = (formData.get("bedSize") as string) || "";
    const frameType = (formData.get("frameType") as string) || "";
    const assemblyRequired = formData.get("assemblyRequired") === "true";
    const warranty = (formData.get("warranty") as string) || "";

    // --- Parse JSON arrays ---
    const colors = parseJSON(formData.get("colors") as string);
    const features = parseJSON(formData.get("features") as string);

    // --- Handle image uploads ---
    let imageUrls: string[] = [];

    // Get all file entries under "image" or "images"
    const imageEntries = formData.getAll("image"); // or "images"
    console.log("📸 Image entries:", imageEntries);

    if (imageEntries.length > 0) {
      // Filter to only File objects
      const files = imageEntries.filter(
        (entry): entry is File => entry instanceof File,
      );

      if (files.length > 0) {
        imageUrls = await saveUploadedFiles(files, `products/${category}/${name}`);
        console.log("✅ Saved images:", imageUrls);
      }
    }

    // Build product object
    const productData = {
      _id,
      name,
      price,
      category,
      size,
      material,
      rating: 5,
      reviews: 5,
      sold: 10,
      stock: 100,
      discount,
      brand,
      description,
      dimensions,
      weight,
      careInstructions,
      bedSize,
      frameType,
      assemblyRequired,
      warranty,
      image: imageUrls, // array of public URLs
      colors,
      features,
    };

    // Create or update
    let product;
    if (_id) {
      product = await Product.findByIdAndUpdate(_id, productData, {
        new: true,
        runValidators: true,
      });
      if (!product) {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 },
        );
      }
    } else {
      product = new Product(productData);
      await product.save();
    }

    return NextResponse.json(
      { message: "Product saved successfully", product },
      { status: 201 },
    );
  } catch (error) {
    console.error("❌ Error creating/updating product:", error);
    return NextResponse.json(
      { message: "Error processing request", error: String(error) },
      { status: 500 },
    );
  }
}
