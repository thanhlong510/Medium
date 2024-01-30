import Link from "next/link";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RouterOutputs } from "~/utils/api";
type inputType = RouterOutputs["post"]["getPostsbyUserId"];

const SearchBar = ({ data }: { data: inputType }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<inputType>([]);

  const handleSearch = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim();
    const filteredResults = data.filter((item) =>
      item.title.toLowerCase().includes(normalizedQuery),
    );
    setSearchResults(filteredResults);
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const query = (e.target as HTMLInputElement).value;
    setSearchTerm(query);
    handleSearch(query);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onInput={handleInput}
        className="rounded-3xl border border-gray-300 p-2"
      />
      {searchTerm && (
        <div className="absolute top-9 mt-2 w-full">
          {searchResults.length > 0 ? (
            <ul className="rounded-2xl border border-gray-300 bg-white  ">
              {searchResults.map((result) => (
                <div
                  key={result.postId}
                  className="my-2 w-full rounded-2xl p-2 hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-[16px] w-[16px]">
                      <CiSearch />
                    </div>

                    <Link
                      key={result.postId}
                      href={`/post/${result.postId}`}
                      className=""
                    >
                      <li className="cursor-pointer  p-1 hover:bg-gray-100">
                        {result.title}
                      </li>
                    </Link>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p className="rounded border border-gray-300 bg-white p-2">
              No result available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
