"use client";

import { useEffect, useState } from "react";
import { SearchResultsProps } from "@/types";
import SearchLoadingProduct from "./search-bar/SearchLoadingProduct";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearch } from "@/hooks/useSearch";
import SearchError from "./search-bar/SearchError";
import SearchEmpty from "./search-bar/SearchEmpty";
import SearchHeader from "./search-bar/SearchHeader";
import SearchList from "./search-bar/SearchLists";

export default function SearchResults({ query, onSearch }: SearchResultsProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const debouncedQuery = useDebounce(query, 400);
  const { loading, results, error, runSearch } = useSearch();

  useEffect(() => {
    const controller = new AbortController();
    runSearch(debouncedQuery, controller.signal);
    return () => controller.abort();
  }, [debouncedQuery, runSearch]);

  if (!query.trim()) return null;
  if (loading) return <SearchLoadingProduct />;
  if (error)
    return <SearchError error={error} retry={() => runSearch(query)} />;
  if (!results.length) return <SearchEmpty />;

  return (
    <div className='space-y-2'>
      <SearchHeader count={results.length} query={query} onSearch={onSearch} />

      <SearchList
        query={query}
        results={results}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        onSearch={onSearch}
        highlightMatch={(text: string | undefined) => text} // reuse your fn
      />
    </div>
  );
}
