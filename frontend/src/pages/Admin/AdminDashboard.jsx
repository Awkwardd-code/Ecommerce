import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
    useGetTotalOrdersQuery,
    useGetTotalSalesByDateQuery,
    useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
    const { data: sales, isLoading } = useGetTotalSalesQuery();
    const { data: customers, isLoading: loading } = useGetUsersQuery();
    const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
    const { data: salesDetail } = useGetTotalSalesByDateQuery();

    const [state, setState] = useState({
        options: {
            chart: {
                type: "line",
            },
            tooltip: {
                theme: "dark",
            },
            colors: ["#00E396"],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: "smooth",
            },
            title: {
                text: "Sales Trend",
                align: "left",
            },
            grid: {
                borderColor: "#ccc",
            },
            markers: {
                size: 1,
            },
            xaxis: {
                categories: [],
                title: {
                    text: "Date",
                },
            },
            yaxis: {
                title: {
                    text: "Sales",
                },
                min: 0,
            },
            legend: {
                position: "top",
                horizontalAlign: "right",
                floating: true,
                offsetY: -25,
                offsetX: -5,
            },
        },
        series: [{ name: "Sales", data: [] }],
    });

    useEffect(() => {
        if (salesDetail) {
            const formattedSalesDate = salesDetail.map((item) => ({
                x: item._id,
                y: item.totalSales,
            }));

            setState((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: formattedSalesDate.map((item) => item.x),
                    },
                },

                series: [
                    { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
                ],
            }));
        }
    }, [salesDetail]);

    return (
        <section className="xl:ml-[4rem] md:ml-[2rem] sm:ml-0 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Dashboard Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Sales Card */}
                <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-500 rounded-xl p-6 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="rounded-full w-12 h-12 bg-white text-pink-600 flex items-center justify-center text-2xl font-extrabold shadow-md">
                        $
                    </div>
                    <p className="mt-4 text-sm text-white/80 font-medium tracking-wide">Total Sales</p>
                    <h1 className="text-3xl font-extrabold text-white mt-2 tracking-tight">
                        {isLoading ? <Loader className="animate-spin h-8 w-8 text-white/50" /> : `$${sales.totalSales.toFixed(2)}`}
                    </h1>
                </div>

                {/* Customers Card */}
                <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-blue-500 rounded-xl p-6 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="rounded-full w-12 h-12 bg-white text-blue-600 flex items-center justify-center text-2xl font-extrabold shadow-md">
                        <i className="fas fa-users"></i>
                    </div>
                    <p className="mt-4 text-sm text-white/80 font-medium tracking-wide">Total Customers</p>
                    <h1 className="text-3xl font-extrabold text-white mt-2 tracking-tight">
                        {isLoading ? <Loader className="animate-spin h-8 w-8 text-white/50" /> : customers?.length}
                    </h1>
                </div>

                {/* All Orders Card */}
                <div className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-xl p-6 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="rounded-full w-12 h-12 bg-white text-red-600 flex items-center justify-center text-2xl font-extrabold shadow-md">
                        <i className="fas fa-box"></i>
                    </div>
                    <p className="mt-4 text-sm text-white/80 font-medium tracking-wide">All Orders</p>
                    <h1 className="text-3xl font-extrabold text-white mt-2 tracking-tight">
                        {isLoading ? <Loader className="animate-spin h-8 w-8 text-white/50" /> : orders?.totalOrders}
                    </h1>
                </div>
            </div>

            {/* Chart Section */}
            <div className="mt-12 max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Overview</h2>
                <div className="flex justify-center">
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="bar"
                        width="100%"
                        height={400}
                    />
                </div>
            </div>

            {/* Order List Section */}
            <div className="mt-12 max-w-5xl mx-auto">
                <OrderList />
            </div>
        </section>
    );
};

export default AdminDashboard;