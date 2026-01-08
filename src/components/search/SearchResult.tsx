import type Book from "@/types/book";

interface SearchResultProps
{
    item: Book;
}

export default function SearchResult({ item }: SearchResultProps)
{
    const coverImageURL = item.cover_i
        ? `https://covers.openlibrary.org/b/id/${item.cover_i}-S.jpg`
        : "https://openlibrary.org/images/icons/avatar_book-sm.png";

    return (
        <div className="flex gap-3 p-2 hover:bg-gray-100 cursor-pointer">
            <img
                src={coverImageURL}
                alt={"No Image"}
                className="w-12 h-16 object-cover"
            />
            <div className="flex flex-col">
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-gray-600">{item.author_name?.[0] || "Unknown author"}</div>
            </div>
        </div>
    );
}
