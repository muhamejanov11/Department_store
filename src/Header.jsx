// Header.jsx
import { useState } from "react";
import image1 from "./assets/image100.png";
import { Link } from "react-router-dom";

const Header = ({ products, setFilteredProducts }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <header className="bg-blue-600 py-3 px-4 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
            <img className="w-32 md:w-48 h-auto" src={image1} alt="Лого" />
            <div className="flex items-center border-2 border-white rounded-lg px-2 py-1 w-full max-w-md">
                <span>🔎</span>
                <input
                    value={searchQuery}
                    onChange={handleSearch}
                    className="bg-transparent text-white w-full ml-2 outline-none placeholder:text-white"
                    placeholder="Искать товары"
                />
            </div>
            <div className="flex flex-col items-center gap-1 mt-2 md:mt-0">
                <Link to="/cart" className="text-white font-semibold hover:underline">Корзина</Link>
                <a className="text-red-400 hover:underline" href="https://t.me/Krutoy2282013" target="_blank" rel="noopener noreferrer">Связаться с разроботчиком</a>
            </div>
        </header>
    );
};

export default Header;
