// MainSite.jsx
import React, { useEffect, useState } from "react";
import Header from "./Header";

const MainSite = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetch("http://192.168.68.101:5000/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch((error) => console.error("Ошибка загрузки:", error));
    }, []);

    return (
        <div className="bg-[#FDF5E6] min-h-screen">
            <Header products={products} setFilteredProducts={setFilteredProducts} />

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <li
                            key={product.id}
                            className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => setSelectedProduct(product)}
                        >
                            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-md border" />
                            <h3 className="mt-2 text-lg font-semibold text-gray-700 text-center">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.price}</p>
                            <button
                                className="mt-2 bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 w-full"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                }}
                            >
                                Добавить в корзину
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="text-center col-span-4 text-gray-500">Товар не найден</p>
                )}
            </ul>

            {selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm relative">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                            onClick={() => setSelectedProduct(null)}
                        >
                            ✖
                        </button>
                        <img src={selectedProduct.image} alt={selectedProduct.name} className="w-32 h-32 object-cover rounded-md border mx-auto" />
                        <h2 className="text-2xl font-bold text-center mt-4">{selectedProduct.name}</h2>
                        <p className="text-gray-700 text-center mt-2 text-lg font-semibold">Цена: {selectedProduct.price} $</p>
                        <p className="text-gray-500 mt-4 text-center">{selectedProduct.description || "Описание отсутствует"}</p>
                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
                            onClick={() => setSelectedProduct(null)}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainSite;
