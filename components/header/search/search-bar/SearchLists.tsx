import { KeyboardEvent } from "react";
import SearchResultItem from "./SearchResultItems";
import { MostSellProductType } from "@/types";

export default function SearchList({
  results,
  selectedIndex,
  setSelectedIndex,
  onSearch,
  query,
  highlightMatch,
}: {
  results: MostSellProductType[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  onSearch: (q: string) => void;
  highlightMatch: (text: string | undefined, query: string) => React.ReactNode;
  query: string;
}) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev: number) =>
        prev < results.length - 1 ? prev + 1 : prev,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev: number) => (prev > 0 ? prev - 1 : -1));
    }

    if (e.key === "Enter" && selectedIndex >= 0) {
      onSearch(results[selectedIndex].name);
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      {results.map((item, index) => (
        <SearchResultItem
          key={item._id}
          item={item}
          index={index}
          query={query} // ✅ FIX
          selected={selectedIndex === index}
          onClick={onSearch}
          highlightMatch={highlightMatch}
        />
      ))}
    </div>
  );
}
