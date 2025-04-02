import React from 'react';
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    useGetProductDetailsQuery,
    useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from '../../redux/features/cart/cartSlice';

function ProductDetails() {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetProductDetailsQuery(productId);

    const { userInfo } = useSelector((state) => state.auth);

    const [createReview, { isLoading: loadingProductReview }] =
        useCreateReviewMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap();
            refetch();
            toast.success("Review created successfully");
        } catch (error) {
            toast.error(error?.data || error.message);
        }
    };
    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate("/cart");
    };

    return (
        <>
            <div className=" text-left mt-8  ">
                <Link
                    to="/"
                    className="text-white font-semibold hover:underline mx-auto block md:w-[fit-content]"
                >
                    Go Back
                </Link>
            </div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.message}
                </Message>
            ) : (
                <>
                    <div className="flex flex-col md:flex-row items-center mt-8 space-y-8 md:space-y-0 md:space-x-8 mx-auto w-full max-w-[1200px] bg-gray-900 p-8 rounded-lg">
                        <div className="relative w-full md:w-[45%] lg:w-[40%] xl:w-[35%]">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full rounded-xl object-cover"
                            />
                            <HeartIcon product={product} className="absolute top-2 right-2" />
                        </div>

                        <div className="flex flex-col justify-between w-full md:w-[50%] lg:w-[55%] xl:w-[60%] bg-gray-900 p-6 rounded-lg shadow-lg">
                            <h2 className="text-3xl font-semibold text-white mb-4">{product.name}</h2>

                            <p className="text-gray-300 text-sm md:text-base mb-4">{product.description}</p>

                            <p className="text-4xl font-extrabold text-pink-600 mb-6">${product.price}</p>

                            <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-12 mb-6">
                                <div className="space-y-4">
                                    <h1 className="flex items-center text-sm md:text-base text-white">
                                        <FaStore className="mr-2 text-pink-500" /> Brand: {product.brand}
                                    </h1>
                                    <h1 className="flex items-center text-sm md:text-base text-white">
                                        <FaClock className="mr-2 text-pink-500" /> Added: {moment(product.createAt).fromNow()}
                                    </h1>
                                    <h1 className="flex items-center text-sm md:text-base text-white">
                                        <FaStar className="mr-2 text-pink-500" /> Reviews: {product.numReviews}
                                    </h1>
                                </div>

                                <div className="space-y-4">
                                    <h1 className="flex items-center text-sm md:text-base text-white">
                                        <FaStar className="mr-2 text-pink-500 " /> Ratings: {rating}
                                    </h1>
                                    <h1 className="flex items-center text-sm md:text-base text-white">
                                        <FaShoppingCart className="mr-2 text-pink-500" /> Quantity: {product.quantity}
                                    </h1>
                                    <h1 className="flex items-center text-sm md:text-base text-white">
                                        <FaBox className="mr-2 text-pink-500" /> In Stock: {product.countInStock}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex justify-between items-center gap-4 mt-6">
                                {/* Ratings with Golden Stars */}
                                <div className="flex items-center text-pink-600">

                                    <Ratings
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                        starRatedColor="#F472B6" // Pink color
                                    />

                                </div>

                                {product.countInStock > 0 && (
                                    <div>
                                        <select
                                            value={qty}
                                            onChange={(e) => setQty(e.target.value)}
                                            className="p-2 w-[6rem] rounded-lg text-black bg-white"
                                        >
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                    className="bg-pink-600 text-white py-3 px-6 rounded-lg w-full md:w-auto transition-all duration-300 hover:bg-pink-700 disabled:bg-gray-400"
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>


                    </div>

                    {/* Product Tabs */}
                    <div className="mt-12 mx-auto w-full max-w-[1200px]">
                        <ProductTabs
                            loadingProductReview={loadingProductReview}
                            userInfo={userInfo}
                            submitHandler={submitHandler}
                            rating={rating}
                            setRating={setRating}
                            comment={comment}
                            setComment={setComment}
                            product={product}
                        />
                    </div>
                </>
            )}
        </>


    )
}

export default ProductDetails
