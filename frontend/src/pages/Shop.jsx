import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
    setCategories,
    setProducts,
    setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
    const dispatch = useDispatch();
    const { categories, products, checked, radio } = useSelector(
        (state) => state.shop
    );

    const categoriesQuery = useFetchCategoriesQuery();
    const [priceFilter, setPriceFilter] = useState("");

    const filteredProductsQuery = useGetFilteredProductsQuery({
        checked,
        radio,
    });

    useEffect(() => {
        if (!categoriesQuery.isLoading) {
            dispatch(setCategories(categoriesQuery.data));
        }
    }, [categoriesQuery.data, dispatch]);

    useEffect(() => {
        if (!checked.length || !radio.length) {
            if (!filteredProductsQuery.isLoading) {
                // Filter products based on both checked categories and price filter
                const filteredProducts = filteredProductsQuery.data.filter(
                    (product) => {
                        // Check if the product price includes the entered price filter value
                        return (
                            product.price.toString().includes(priceFilter) ||
                            product.price === parseInt(priceFilter, 10)
                        );
                    }
                );

                dispatch(setProducts(filteredProducts));
            }
        }
    }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

    const handleBrandClick = (brand) => {
        const productsByBrand = filteredProductsQuery.data?.filter(
            (product) => product.brand === brand
        );
        dispatch(setProducts(productsByBrand));
    };

    const handleCheck = (value, id) => {
        const updatedChecked = value
            ? [...checked, id]
            : checked.filter((c) => c !== id);
        dispatch(setChecked(updatedChecked));
    };

    // Add "All Brands" option to uniqueBrands
    const uniqueBrands = [
        ...Array.from(
            new Set(
                filteredProductsQuery.data
                    ?.map((product) => product.brand)
                    .filter((brand) => brand !== undefined)
            )
        ),
    ];

    const handlePriceChange = (e) => {
        // Update the price filter state when the user types in the input filed
        setPriceFilter(e.target.value);
    };

    return (
        <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Filter Section */}
                <div className="bg-gray-900 p-5 rounded-lg shadow-lg w-full md:w-1/4 h-screen sticky top-0">
                    <h2 className="text-lg font-semibold text-white text-center py-2 bg-black rounded-lg mb-4">
                        Filter by Categories
                    </h2>
                    <div className="space-y-3 overflow-y-auto max-h-[30vh] pr-2 scrollbar-hide">
                        {categories?.map((c) => (
                            <div key={c._id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id={`category-${c._id}`}
                                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                                    className="w-4 h-4 text-pink-600 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-pink-500"
                                />
                                <label htmlFor={`category-${c._id}`} className="text-white text-sm font-medium">
                                    {c.name}
                                </label>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-lg font-semibold text-white text-center py-2 bg-black rounded-lg mt-6 mb-4">
                        Filter by Brands
                    </h2>
                    <div className="space-y-3 overflow-y-auto max-h-[20vh] pr-2 scrollbar-hide">
                        {uniqueBrands?.map((brand) => (
                            <div key={brand} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    id={`brand-${brand}`}
                                    name="brand"
                                    onChange={() => handleBrandClick(brand)}
                                    className="w-4 h-4 text-pink-500 bg-gray-700 border-gray-600 focus:ring-2 focus:ring-pink-500"
                                />
                                <label htmlFor={`brand-${brand}`} className="text-white text-sm font-medium">
                                    {brand}
                                </label>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-lg font-semibold text-white text-center py-2 bg-black rounded-lg mt-6 mb-4">
                        Filter by Price
                    </h2>
                    <input
                        type="text"
                        placeholder="Enter Price"
                        value={priceFilter}
                        onChange={handlePriceChange}
                        className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gray-800 text-white"
                    />

                    <button
                        className="w-full border mt-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
                        onClick={() => window.location.reload()}
                    >
                        Reset Filters
                    </button>
                </div>


                {/* Products Section */}
                <div className="flex-1 p-5 bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                    <h2 className="text-lg font-semibold text-white text-center mb-4">
                        {products?.length} Products
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 scrollbar-hidden">
                        {products.length === 0 ? (
                            <Loader />
                        ) : (
                            products?.map((p) => (
                                <ProductCard key={p._id} p={p} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;