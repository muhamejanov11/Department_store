import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainSite from "./MainSite";
import Cart from "./Cart";
import { useState, useEffect } from "react";

function App() {
    const [cart, setCart] = useState(() => {
        // Загружаем корзину из localStorage при запуске
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Сохраняем корзину в localStorage при каждом изменении
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Добавить в корзину
    const addToCart = (product) => {
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    // Удалить из корзины
    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.id !== productId));
    };

    // Очистить корзину
    const clearCart = () => {
        setCart([]);
    };

    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-[#FDF5E6]">

                <Routes>
                    <Route path="/" element={<MainSite addToCart={addToCart} />} />
                    <Route path="/cart" element={
                        <Cart 
                            cart={cart} 
                            setCart={setCart} 
                            removeFromCart={removeFromCart} 
                            clearCart={clearCart}
                        />} 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
