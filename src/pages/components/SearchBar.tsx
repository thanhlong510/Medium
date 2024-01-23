import Link from 'next/link';
import React, { useState } from 'react';

interface Post {
  id: string;
  title: string;
}

interface SearchBarProps {
  data: Post[];
}


const SearchBar: React.FC<SearchBarProps> = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Post[]>([]);
  
    const handleSearch = (query: string) => {
      const normalizedQuery = query.toLowerCase().trim();
      const filteredResults = data.filter((item) =>
        item.title.toLowerCase().includes(normalizedQuery)
      );
      setSearchResults(filteredResults);
    };
  
    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      const query = (e.target as HTMLInputElement).value;
      setSearchTerm(query);
      handleSearch(query);
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onInput={handleInput}
          className="rounded border border-gray-300 p-2"
        />
        {searchTerm && (
          <div className="mt-2">
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map((result) => (
                    <Link key={result.id} href={`/post/${result.id}`}>
                    <li >{result.title}</li>
                    </Link>
                  
                ))}
              </ul>
            ) : (
              <p>No result available.</p>
            )}
          </div>
        )}
      </div>
    );
  };
  

export default SearchBar