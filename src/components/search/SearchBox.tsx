import React, { useEffect } from "react";

import { useState } from "react";

import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function SearchBox()
{
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [query, setQuery] = useState("");

    const [showSearchResults, setShowSearchResults] = useState(false);

    const [searchResults, setSearchResults] = useState([]);


    async function search()
    {
        console.log(`searching for: ${query}`);

        const response = await fetch(`https://openlibrary.org/search.json?title=${query}&limit=5&fields=key,title,author_name,cover_i`);

        const data = await response.json();

        console.log(data);
        setSearchResults(data.docs || []);
    }

    function debounce()
    {
        if (query.length === 0)
        {
            return;
        }

        const timer = setTimeout(search, 500);

        return () => clearTimeout(timer)
    }

    function handleSearch(e: React.FormEvent)
    {
        e.preventDefault();

        if (query.trim())
        {
            navigate(`/search?q=${query}`);

            setShowSearchResults(false);
        }
    }

    useEffect(debounce, [query]);

    useEffect(() => {
        setShowSearchResults(false);
        setQuery(searchParams.get("q") || "");
    }, [searchParams])


    return (
        <>
            <form onSubmit={handleSearch} className="flex-1 relative">
                <input
                    type="text"
                    placeholder="Search for books"
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value);
                        setShowSearchResults(e.target.value.length > 0);
                    }}
                    onFocus={() => query.length > 0 && setShowSearchResults(true)}
                    onBlur={() => setShowSearchResults(false)}
                    className="!w-full border border-gray-300 rounded px-4 py-2"
                />

                {showSearchResults && searchResults.length > 0 && (
                    <div
                        className="absolute top-full left-0 right-0 mt-1 bg-white border rounded shadow-lg z-50"
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        {searchResults.map((book) => (
                            <div key={book.key} className="flex gap-3 p-4 hover:bg-gray-100 cursor-pointer">
                                {book.cover_i && (
                                    <img
                                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
                                        alt={book.title}
                                        className="w-12 h-16 object-cover"
                                    />
                                )}
                                <div className="font-semibold">{book.title}</div>

                                <div className="text-gray-600">
                                    {book.author_name?.[0] || "Unknown Author"}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </form>

        </>
    );
}
