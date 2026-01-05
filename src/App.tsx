import { Routes, Route } from "react-router-dom";

import Header from "./components/Header.tsx";

import Dashboard from "./pages/Dashboard.tsx";
import SearchResults from "./pages/SearchResults.tsx";


function App()
{
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/books/:id" element={<h1>Book Detail</h1>} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </div>
    )
}

export default App;
