import React from "react";

import { useState } from "react";

import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Header()
{
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [query, setQuery] = useState(searchParams.get("q") || "");

    function handleSearch(e: React.FormEvent)
    {
        e.preventDefault();

        if (query.trim())
        {
            navigate(`/search?q=${query}`);
        }
    }

    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-6 sm:px-6 lg:px-8">
                <Link to="/" className="text-2xl">📚</Link>

                <form onSubmit={handleSearch} className="flex-1">
                    <input
                        type="text"
                        placeholder="Search for books"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="!w-full border border-gray-300 rounded px-4 py-2"
                    />
                </form>

                <button className="text-2xl">👤</button>
            </div>

        </header>
    );
}
