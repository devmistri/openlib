import React from "react";

import { useSearchParams } from "react-router-dom";


export default function SearchResults()
{
    const [searchParams] = useSearchParams();

    const query = searchParams.get("q") || "";


    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl mb-4">
                You searched for <span className="font-bold">{query}</span>
            </h1>
        </div>
    )
}
