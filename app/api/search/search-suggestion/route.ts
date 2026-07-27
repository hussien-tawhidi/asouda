
import { connectDB } from "@/lib/db";
import Product from "@/model/Product";

// /api/products/random
export async function GET() {
  await connectDB();
  const products = await Product.aggregate([{ $sample: { size: 6 } }]);
  return Response.json(products);
}
