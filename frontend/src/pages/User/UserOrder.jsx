import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
    const { data: orders, isLoading, error } = useGetMyOrdersQuery();

    return (
        <div className="container max-w-5xl mx-auto px-6 md:px-8 mt-6">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-200">My Orders</h2>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error?.data?.error || error.error}</Message>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
                        <thead className="bg-gray-800 text-gray-100 text-lg">
                            <tr>
                                <th className="py-4 px-3 text-center">Image</th>
                                <th className="py-4 px-3 text-center">ID</th>
                                <th className="py-4 px-3 text-center">Date</th>
                                <th className="py-4 px-3 text-center">Total</th>
                                <th className="py-4 px-3 text-center">Paid</th>
                                <th className="py-4 px-3 text-center">Delivered</th>
                                <th className="py-4 px-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="bg-gray-700 text-gray-200 divide-y divide-gray-600">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-600 transition">
                                    {/* Image Column */}
                                    <td className="py-4 px-3 text-center">
                                        <img src={order.orderItems[0].image} alt="Order" className="w-16 h-16 object-cover rounded-md mx-auto" />
                                    </td>

                                    {/* Order ID */}
                                    <td className="py-4 px-3 text-center text-sm">{order._id}</td>

                                    {/* Order Date */}
                                    <td className="py-4 px-3 text-center">{order.createdAt.substring(0, 10)}</td>

                                    {/* Total Price */}
                                    <td className="py-4 px-3 text-center font-semibold">${order.totalPrice.toFixed(2)}</td>

                                    {/* Payment Status */}
                                    <td className="py-4 px-3 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${order.isPaid ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                                }`}
                                        >
                                            {order.isPaid ? "Completed" : "Pending"}
                                        </span>
                                    </td>

                                    {/* Delivery Status */}
                                    <td className="py-4 px-3 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${order.isDelivered ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                                }`}
                                        >
                                            {order.isDelivered ? "Delivered" : "Pending"}
                                        </span>
                                    </td>

                                    {/* Action Button */}
                                    <td className="py-4 px-3 text-center">
                                        <Link to={`/order/${order._id}`}>
                                            <button className="bg-pink-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-pink-600 transition">
                                                View Details
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    );
};

export default UserOrder;