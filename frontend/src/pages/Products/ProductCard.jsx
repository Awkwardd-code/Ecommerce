import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
    const dispatch = useDispatch();

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
        toast.success("Item added successfully", {
            position: "top-right",
            autoClose: 2000,
        });
    };

    return (
        <div className="max-w-sm relative bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <section className="relative">
                <Link to={`/product/${p._id}`}>
                    <span className="absolute bottom-3 right-3 bg-pink-200 text-pink-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                        {p?.brand}
                    </span>
                    <img
                        className="cursor-pointer w-full h-44 object-cover"
                        src={p.image}
                        alt={p.name}
                    />
                </Link>
                <HeartIcon product={p} className="absolute top-3 left-3" />
            </section>

            <div className="p-5">
                <div className="flex justify-between items-center">
                    <h5 className="text-lg font-semibold text-white truncate w-3/4">{p?.name}</h5>
                    <p className="font-semibold text-pink-500">
                        {p?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}
                    </p>
                </div>

                <p className="mb-3 text-gray-400 text-sm">
                    {p?.description?.substring(0, 60)} ...
                </p>

                <section className="flex justify-between items-center">
                    <Link
                        to={`/product/${p._id}`}
                        className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300"
                    >
                        Read More
                        <svg
                            className="w-4 h-4 ml-2 inline"
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

                    <button
                        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white"
                        onClick={() => addToCartHandler(p, 1)}
                    >
                        <AiOutlineShoppingCart size={22} />
                    </button>
                </section>
            </div>
        </div>
    );
};

export default ProductCard;