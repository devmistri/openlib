import type Book from "@/types/book";

import SearchResult from "./SearchResult";


export default function SearchResults({ items }: { items: Book[] })
{
    console.log(items);

    return (
        <div
            className="absolute top-full left-0 right-0 mt-1 bg-white border rounded shadow-lg z-50"
            onMouseDown={(e) => e.preventDefault()}
        >
            {items.map(item => <SearchResult key={item.key} item={item} />)}
        </div>
    );
}
