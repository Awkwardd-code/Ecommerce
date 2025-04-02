import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";


function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate("/login?redirect=/shipping");
    };
    return (
        <div className="container mx-auto mt-8 px-4 md:px-6 max-w-3xl bg-gray-900 p-6 rounded-lg relative z-10 shadow-lg">
            {cartItems.length === 0 ? (
                <div className="text-center text-lg text-white">
                    Your cart is empty. <Link to="/shop" className="text-pink-500">Go To Shop</Link>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {/* Cart Items List */}
                    <div className="bg-gray-800 p-4 rounded-lg shadow-md z-20 relative">
                        <h1 className="text-2xl font-semibold mb-4 text-white">Shopping Cart</h1>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                    <div className="flex-1">
                                        <Link to={`/product/${item._id}`} className="text-pink-400 text-lg font-medium">
                                            {item.name}
                                        </Link>
                                        <div className="text-gray-300 text-sm">{item.brand}</div>
                                        <div className="text-white font-bold">${item.price}</div>
                                    </div>
                                    <select
                                        className="w-16 p-2 border rounded bg-gray-600 text-white"
                                        value={item.qty}
                                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                    <button className="text-red-400" onClick={() => removeFromCartHandler(item._id)}>
                                        <FaTrash size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <div className="w-full p-6 bg-gray-800 rounded-lg shadow-md z-10 relative">
                        <h2 className="text-xl font-semibold mb-2 text-white">Order Summary</h2>
                        <p className="text-gray-400 text-lg">Items: ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</p>
                        <p className="text-2xl font-bold text-white">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</p>
                        <button
                            className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full disabled:opacity-50 text-white"
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
