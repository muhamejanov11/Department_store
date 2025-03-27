// Cart.jsx
import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart, removeFromCart }) => {
    const incrementQuantity = (id) => {
        setCart(
            cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (id) => {
        setCart(
            cart.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                    : item
            )
        );
    };

    const totalPrice = cart.reduce(
        (sum, item) => sum + (parseFloat(item.price) || 0) * item.quantity,
        0
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Корзина</h1>

            {cart.length === 0 ? (
                <>
                    <p>Корзина пуста</p>
                    <Link to="/">
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Вернуться к продуктам
                        </button>
                    </Link>
                </>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white p-4 rounded-xl shadow-md mb-4 flex items-center space-x-4"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded border"
                            />
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                <p>Цена: {(parseFloat(item.price) || 0).toFixed(2)} $</p>
                                <p>Количество: {item.quantity}</p>
                                <div className="flex space-x-2 mt-2">
                                    <button
                                        className="px-2 py-1 bg-green-500 text-white rounded"
                                        onClick={() => incrementQuantity(item.id)}
                                    >
                                        +
                                    </button>
                                    <button
                                        className="px-2 py-1 bg-yellow-500 text-white rounded"
                                        onClick={() => decrementQuantity(item.id)}
                                    >
                                        -
                                    </button>
                                    <button
                                        className="px-2 py-1 bg-red-500 text-white rounded"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="text-xl font-bold mt-4">
                        Итого: {totalPrice.toFixed(2)} $
                    </div>
                    <Link to="/">
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Вернуться к продуктам
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Cart;
