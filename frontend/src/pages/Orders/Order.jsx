import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
    useDeliverOrderMutation,
    useGetOrderDetailsQuery,
    useGetPaypalClientIdQuery,
    usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
    const { id: orderId } = useParams();

    const {
        data: order,
        refetch,
        isLoading,
        error,
    } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [deliverOrder, { isLoading: loadingDeliver }] =
        useDeliverOrderMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const {
        data: paypal,
        isLoading: loadingPaPal,
        error: errorPayPal,
    } = useGetPaypalClientIdQuery();

    useEffect(() => {
        if (!errorPayPal && !loadingPaPal && paypal.clientId) {
            const loadingPaPalScript = async () => {
                paypalDispatch({
                    type: "resetOptions",
                    value: {
                        "client-id": paypal.clientId,
                        currency: "USD",
                    },
                });
                paypalDispatch({ type: "setLoadingStatus", value: "pending" });
            };

            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadingPaPalScript();
                }
            }
        }
    }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                await payOrder({ orderId, details });
                refetch();
                toast.success("Order is paid");
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        });
    }

    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [{ amount: { value: order.totalPrice } }],
            })
            .then((orderID) => {
                return orderID;
            });
    }

    function onError(err) {
        toast.error(err.message);
    }

    const deliverHandler = async () => {
        await deliverOrder(orderId);
        refetch();
    };

    return isLoading ? (
        <Loader />
    ) : error ? (
        <Messsage variant="danger">{error.data.message}</Messsage>
    ) : (
        <div className="container max-w-5xl mx-auto flex flex-col md:flex-row px-6 md:px-8 mt-6 space-y-6 md:space-y-0 md:space-x-8">
            {/* Left Section (Order Items) */}
            <div className="md:w-2/3">
                <div className="border border-gray-300 bg-gray-800 p-6 rounded-lg shadow-lg">
                    {order.orderItems.length === 0 ? (
                        <Message>Order is empty</Message>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead className="border-b-2 border-gray-600 bg-gray-700 text-white">
                                    <tr>
                                        <th className="p-4">Image</th>
                                        <th className="p-4">Product</th>
                                        <th className="p-4 text-center">Quantity</th>
                                        <th className="p-4">Unit Price</th>
                                        <th className="p-4">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.orderItems.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-600">
                                            <td className="p-4">
                                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                            </td>
                                            <td className="p-4">
                                                <Link to={`/product/${item.product}`} className="text-blue-400 hover:underline">{item.name}</Link>
                                            </td>
                                            <td className="p-4 text-center">{item.qty}</td>
                                            <td className="p-4 text-center">${item.price.toFixed(2)}</td>
                                            <td className="p-4 text-center font-semibold">${(item.qty * item.price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Section (Order Summary) */}
            <div className="md:w-1/3 space-y-6">
                {/* Shipping Details */}
                <div className="border border-gray-300 bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-white">Shipping</h2>
                    <p className="text-gray-300"><strong className="text-pink-500">Order:</strong> {order._id}</p>
                    <p className="text-gray-300"><strong className="text-pink-500">Name:</strong> {order.user.username}</p>
                    <p className="text-gray-300"><strong className="text-pink-500">Email:</strong> {order.user.email}</p>
                    <p className="text-gray-300"><strong className="text-pink-500">Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                    <p className="text-gray-300"><strong className="text-pink-500">Method:</strong> {order.paymentMethod}</p>

                    {order.isPaid ? (
                        <Message variant="success">Paid on {order.paidAt}</Message>
                    ) : (
                        <Message variant="danger">Not paid</Message>
                    )}
                </div>

                {/* Order Summary */}
                <div className="border border-gray-300 bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-white">Order Summary</h2>
                    <div className="text-gray-300 space-y-3">
                        <div className="flex justify-between"><span>Items:</span><span>${order.itemsPrice}</span></div>
                        <div className="flex justify-between"><span>Shipping:</span><span>${order.shippingPrice}</span></div>
                        <div className="flex justify-between"><span>Tax:</span><span>${order.taxPrice}</span></div>
                        <div className="flex justify-between text-lg font-bold text-white"><span>Total:</span><span>${order.totalPrice}</span></div>
                    </div>

                    {/* Payment Options */}
                    {!order.isPaid && (
                        <div className="mt-4">
                            {loadingPay && <Loader />}
                            {isPending ? <Loader /> : (
                                <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} />
                            )}
                        </div>
                    )}

                    {loadingDeliver && <Loader />}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <button
                            type="button"
                            className="bg-pink-500 text-white w-full py-2 mt-4 rounded-lg font-semibold hover:bg-pink-600 transition"
                            onClick={deliverHandler}
                        >
                            Mark As Delivered
                        </button>
                    )}
                </div>
            </div>
        </div>


    );
};

export default Order;