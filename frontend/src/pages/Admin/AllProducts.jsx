import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import moment from "moment";
import { useGetProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import NoProducts from '../../components/NoProducts';

function AllProducts() {
    const [keyword, setKeyword] = useState("");
    const {
        data,
        isLoading,
        isError,
        error,
        refetch
    } = useGetProductsQuery({ keyword });

    const [dbChanged, setDbChanged] = useState(false);

    useEffect(() => {
        if (dbChanged) {
            refetch();
            setDbChanged(false);
        }
    }, [dbChanged, refetch]);

    // Normalize products to always be an array
    const products = Array.isArray(data) ? data : data?.products || [];

    // Debugging log
    console.log("Data:", data, "Normalized Products:", products, "Is Array?", Array.isArray(products));

    if (isLoading) return <div className="text-white text-center"><Loader /></div>;
    if (isError) return <div className="text-white text-center">Error loading products: {error?.message || "Unknown error"}</div>;
    if (products.length === 0) return <div className="text-white text-center"><NoProducts /></div>;

    return (
        <div className="container mx-auto px-4 max-w-7xl min-h-screen flex items-center justify-center">
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">

                <AdminMenu />
                <div className="flex-1 p-6 bg-gray-800 rounded-lg shadow-lg">
                    <div className="mb-6">
                        <h2 className="text-3xl font-extrabold text-white bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700">
                            All Products ({products.length})
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        {products.map((product) => (

                            <Link
                                key={product._id}
                                to={`/admin/product/update/${product._id}`}
                                className="block bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                                aria-label={`Update ${product.name}`}
                            >
                                <div className="flex flex-col sm:flex-row">
                                    <div className="sm:w-48 flex-shrink-0">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-48 object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
                                        />
                                    </div>
                                    <div className="p-5 flex-1">
                                        <div className="flex items-center justify-between mb-3">
                                            <h5 className="text-xl font-semibold text-white">
                                                {product?.name || "Unnamed Product"}
                                            </h5>
                                            <p className="text-gray-400 text-sm">
                                                {moment(product.createdAt).format("MMMM Do YYYY")}
                                            </p>
                                        </div>
                                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                                            {product?.description || "No description available"}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <Link
                                                to={`/admin/product/update/${product._id}`}
                                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-md hover:bg-pink-600 focus:ring-4 focus:ring-pink-900/50 transition-colors duration-200"
                                            >
                                                Update Product
                                                <svg
                                                    className="w-4 h-4 ml-2"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 14 10"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                                    />
                                                </svg>
                                            </Link>
                                            <p className="text-lg font-medium text-white">
                                                ${product?.price ?? "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllProducts;