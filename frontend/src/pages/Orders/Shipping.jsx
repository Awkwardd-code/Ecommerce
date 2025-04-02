import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    saveShippingAddress,
    savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const [address, setAddress] = useState(shippingAddress.address || "");
    const [city, setCity] = useState(shippingAddress.city || "");
    const [postalCode, setPostalCode] = useState(
        shippingAddress.postalCode || ""
    );
    const [country, setCountry] = useState(shippingAddress.country || "");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    };

    // Payment
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate("/shipping");
        }
    }, [navigate, shippingAddress]);

    return (
        <div className="container mx-auto mt-10 px-6">
            <ProgressSteps step1 step2 />

            <div className="mt-16 flex justify-center">
                <form
                    onSubmit={submitHandler}
                    className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg"
                >
                    <h1 className="text-3xl font-semibold text-white mb-6">Shipping</h1>

                    {/* Address Field */}
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Address</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Enter address"
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    {/* City Field */}
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">City</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Enter city"
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    {/* Postal Code Field */}
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Postal Code</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Enter postal code"
                            value={postalCode}
                            required
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>

                    {/* Country Field */}
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Country</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="Enter country"
                            value={country}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>

                    {/* Payment Method */}
                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2">Select Payment Method</label>
                        <div className="flex items-center space-x-3">
                            <label className="flex items-center text-gray-300 cursor-pointer">
                                <input
                                    type="radio"
                                    className="form-radio text-pink-500 focus:ring-pink-500"
                                    name="paymentMethod"
                                    value="PayPal"
                                    checked={paymentMethod === "PayPal"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <span className="ml-2">PayPal or Credit Card</span>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        className="bg-pink-500 text-white py-3 px-6 rounded-full text-lg font-semibold w-full transition hover:bg-pink-600"
                        type="submit"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Shipping;