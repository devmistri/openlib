import { Link } from "react-router-dom";

import SearchBox from "./SearchBox";


export default function Header()
{
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-6 sm:px-6 lg:px-8">
                <Link to="/" className="text-2xl">📚</Link>

                <SearchBox />

                <button className="text-2xl">👤</button>
            </div>

        </header>
    );
}
