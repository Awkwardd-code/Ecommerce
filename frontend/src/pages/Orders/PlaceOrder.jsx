import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate("/shipping");
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const dispatch = useDispatch();

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <>
            <ProgressSteps step1 step2 step3 />

            <div className="max-w-4xl mx-auto mt-8 px-6 md:px-8">
                {/* If Cart is Empty */}
                {cart.cartItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                ) : (
                    <div className="overflow-x-auto bg-gray-800 p-4 rounded-lg shadow-lg">
                        <table className="w-full border-collapse border border-gray-600">
                            <thead>
                                <tr className="bg-gray-700 text-white">
                                    <th className="px-4 py-2 text-left">Image</th>
                                    <th className="px-4 py-2 text-left">Product</th>
                                    <th className="px-4 py-2 text-center">Quantity</th>
                                    <th className="px-4 py-2 text-center">Price</th>
                                    <th className="px-4 py-2 text-center">Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cart.cartItems.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-600">
                                        <td className="p-2">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                        </td>

                                        <td className="p-2">
                                            <Link to={`/product/${item.product}`} className="text-blue-400 hover:underline">
                                                {item.name}
                                            </Link>
                                        </td>

                                        <td className="p-2 text-center">{item.qty}</td>
                                        <td className="p-2 text-center">${item.price.toFixed(2)}</td>
                                        <td className="p-2 text-center font-semibold">
                                            ${(item.qty * item.price).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Order Summary */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-5 text-white">Order Summary</h2>

                    <div className="grid md:grid-cols-2 gap-6 bg-gray-800 p-6 rounded-lg shadow-lg">
                        {/* Price Breakdown */}
                        <ul className="text-lg space-y-2 text-gray-300">
                            <li><span className="font-semibold">Items:</span> ${cart.itemsPrice}</li>
                            <li><span className="font-semibold">Shipping:</span> ${cart.shippingPrice}</li>
                            <li><span className="font-semibold">Tax:</span> ${cart.taxPrice}</li>
                            <li className="text-xl text-white"><span className="font-semibold">Total:</span> ${cart.totalPrice}</li>
                        </ul>

                        {/* Shipping Info */}
                        <div className="text-gray-300">
                            <h2 className="text-xl font-semibold text-white mb-2">Shipping</h2>
                            <p>
                                <strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </div>

                        {/* Payment Method */}
                        <div className="text-gray-300">
                            <h2 className="text-xl font-semibold text-white mb-2">Payment Method</h2>
                            <strong>Method:</strong> {cart.paymentMethod}
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && <Message variant="danger">{error.data.message}</Message>}

                    {/* Place Order Button */}
                    <button
                        type="button"
                        className={`mt-6 w-full py-3 rounded-full text-lg font-semibold transition 
                ${cart.cartItems.length === 0
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-pink-500 hover:bg-pink-600 text-white"}`
                        }
                        disabled={cart.cartItems.length === 0}
                        onClick={placeOrderHandler}
                    >
                        Place Order
                    </button>

                    {/* Loading Indicator */}
                    {isLoading && <Loader />}
                </div>
            </div>
        </>

    );
};

export default PlaceOrder;