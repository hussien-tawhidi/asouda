import { useState, useCallback } from "react";
import { MostSellProductType } from "@/types";

export function useSearch() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MostSellProductType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const runSearch = useCallback(async (query: string, signal?: AbortSignal) => {
    const q = query.trim();

    if (!q) {
      setResults([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
        signal,
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setResults(data.results || []);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError("خطا در دریافت نتایج");
        setResults([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, results, error, runSearch };
}
