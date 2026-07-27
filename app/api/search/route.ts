import { connectDB } from "@/lib/db";
import Product from "@/model/Product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();

    // Parse pagination parameters (fallback to defaults)
    const page = Math.max(parseInt(searchParams.get("page") || "1"), 1);
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);
    const skip = (page - 1) * limit;

    // ❌ Empty query
    if (!q) {
      return NextResponse.json({
        results: [],
        pagination: { page, limit, total: 0, pages: 0 },
        query: "",
      });
    }

    // 🔒 Escape regex special characters (ReDoS protection)
    const escapeRegex = (str: string) =>
      str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const safeQuery = escapeRegex(q);

    // Build search query – you can extend this to include description, tags, etc.
    const searchQuery = {
      $or: [
        { name: { $regex: safeQuery, $options: "i" } },
        // Optionally search in description as well
        { description: { $regex: safeQuery, $options: "i" } },
      ],
    };

    // Run both queries in parallel for performance
    const [products, total] = await Promise.all([
      Product.find(searchQuery)
        .select("_id name slug price image description category rating reviews price discount") // include description for snippets
        .limit(limit)
        .skip(skip)
        .lean()
        .exec(),
      Product.countDocuments(searchQuery),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      results: products,
      pagination: {
        page,
        limit,
        total,
        pages: totalPages,
      },
      query: q,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      {
        results: [],
        pagination: { page: 1, limit: 10, total: 0, pages: 0 },
        error: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
