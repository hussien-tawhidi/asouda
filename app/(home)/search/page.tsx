import { Suspense } from "react";
import SearchResultsGrid from "../../../components/header/SearchResultsGrid";
import Loader from "@/components/common/Loader";

async function fetchSearchResults(q: string, page: number, limit: number) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000" ||
    "https://asouda.vercel.app";
  const res = await fetch(
    `${baseUrl}/api/search?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`,
    { cache: "no-store" },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }
  return res.json();
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; limit?: string }>;
}) {
  // ✅ Await the promise
  const params = await searchParams;

  const q = params.q?.trim() || "";
  const page = Math.max(parseInt(params.page || "1"), 1);
  const limit = Math.min(parseInt(params.limit || "12"), 50);

  // Show a message when no query is provided
  if (!q) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <h1 className='text-2xl font-bold text-earth-brown'>جستجو</h1>
        <p className='text-earth-brown/60 mt-4'>عبارت جستجو را وارد کنید</p>
      </div>
    );
  }

  const data = await fetchSearchResults(q, page, limit);
  const { results = [], pagination } = data;

  return (
    <div className=' mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold text-earth-brown mb-2'>
        نتایج جستجو برای {q}
      </h1>
      <p className='text-earth-brown/60 mb-6'>
        {pagination?.total ?? 0} نتیجه یافت شد
      </p>
      <Suspense fallback={<Loader />}>
        <SearchResultsGrid
          products={results}
          pagination={pagination}
          query={q}
        />
      </Suspense>
    </div>
  );
}
