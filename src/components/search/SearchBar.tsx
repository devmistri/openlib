import React, { useEffect } from "react";

import { useState } from "react";

import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import SearchResults from "./SearchResults";

import type Book from "@/types/book";


export default function SearchBar()
{
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState("");
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState<Book[]>([]);


    async function search()
    {
        console.log(`searching for: ${query}`);

        const response = await fetch(`https://openlibrary.org/search.json?title=${query}&limit=5&fields=key,title,author_name,cover_i`);

        const data = await response.json();

        // console.log(data);
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

                {showSearchResults && (<SearchResults items={searchResults} />)}
            </form>
        </>
    );
}
