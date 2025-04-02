import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
    const { data: orders, isLoading, error } = useGetOrdersQuery();

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <div className="container mx-auto px-4 mt-6 max-w-screen-lg"> {/* Reduced container padding and set max width */}
                    <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
                        <AdminMenu/>
                        <table className="w-11/12 text-left border-collapse mx-auto"> {/* Table width set to 11/12 */}
                            {/* Table Head */}
                            <thead className="bg-gray-700 text-gray-200 text-lg">
                                <tr>
                                    <th className="p-4">Item</th>
                                    <th className="p-4">ID</th>
                                    <th className="p-4">User</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Total</th>
                                    <th className="p-4">Paid</th>
                                    <th className="p-4">Delivered</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="bg-gray-900 text-gray-300 divide-y divide-gray-700">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-700 transition">
                                        {/* Image */}
                                        <td className="p-4">
                                            <img
                                                src={order.orderItems[0].image}
                                                alt="Order Item"
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                        </td>

                                        {/* Order ID */}
                                        <td className="p-4 text-sm">{order._id}</td>

                                        {/* User */}
                                        <td className="p-4">{order.user ? order.user.username : "N/A"}</td>

                                        {/* Date */}
                                        <td className="p-4">{order.createdAt?.substring(0, 10) || "N/A"}</td>

                                        {/* Total Price */}
                                        <td className="p-4 font-semibold">${order.totalPrice.toFixed(2)}</td>

                                        {/* Payment Status */}
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${order.isPaid ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                                            >
                                                {order.isPaid ? "Completed" : "Pending"}
                                            </span>
                                        </td>

                                        {/* Delivery Status */}
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${order.isDelivered ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                                            >
                                                {order.isDelivered ? "Delivered" : "Pending"}
                                            </span>
                                        </td>

                                        {/* View More Button */}
                                        <td className="p-4 text-center">
                                            <Link to={`/order/${order._id}`}>
                                                <button className="bg-pink-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-pink-600 transition">
                                                    More
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


            )}
        </>
    );
};

export default OrderList;