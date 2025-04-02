import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
    return (
        <div className="w-[30rem] ml-[2rem] p-4 relative bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[20rem] object-cover rounded-lg transition-transform transform hover:scale-105"
                />
                {/* Optional: Add HeartIcon or any other elements here */}
                <HeartIcon product={product} />
            </div>

            <div className="p-4">
                <Link to={`/product/${product._id}`} className="text-decoration-none">
                    <h2 className="flex justify-between items-center">
                        <div className="text-lg text-white font-semibold truncate">{product.name}</div>
                        <span className="bg-pink-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                            ${product.price}
                        </span>
                    </h2>
                </Link>
            </div>
        </div>

    );
};

export default Product;