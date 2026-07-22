import { connectDB } from "@/lib/db";
import Product from "@/model/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    // Helper to safely parse JSON strings
    const parseJSON = (value: string | null) => {
      if (!value) return [];
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    };

    // Extract simple fields with defaults
    const _id = (formData.get("_id") as string) || undefined;
    const name = (formData.get("name") as string) || "";
    const price = Number(formData.get("price")) || 0;
    const category = (formData.get("category") as string) || "";
    const size = (formData.get("size") as string) || "";
    const material = (formData.get("material") as string) || "";
    const rating = Number(formData.get("rating")) || 5;
    const reviews = Number(formData.get("reviews")) || 0;
    const sold = Number(formData.get("sold")) || 0;
    const stock = Number(formData.get("stock")) || 0;
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

    // Parse JSON arrays
    const image = parseJSON(formData.get("image") as string);
    const colors = parseJSON(formData.get("colors") as string);
    const features = parseJSON(formData.get("features") as string);

    // Build the product object
    const productData = {
      _id,
      name,
      price,
      category,
      size,
      material,
      rating,
      reviews,
      sold,
      stock,
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
      image,
      colors,
      features,
    };

    // If _id is provided, update; otherwise create new
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

    console.log("✅ Product saved:", product._id);

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
