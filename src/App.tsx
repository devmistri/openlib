import { Routes, Route } from "react-router-dom";

function App()
{
    return (
        <div className="min-h-screen bg-gray-50">
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/books/:id" element={<h1>Book Detail</h1>} />
                <Route path="/books" element={<h1>Book List</h1>} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </div>
    )
}

export default App;
