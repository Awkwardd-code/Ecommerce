import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
    return (
        <div className="w-[20rem] ml-[2rem] p-3 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl rounded-lg bg-gray-800">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[15rem] object-cover rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                />
                <HeartIcon product={product} />
            </div>

            <div className="p-4 space-y-2">
                <Link to={`/product/${product._id}`} className="text-decoration-none">
                    <h2 className="text-white text-lg font-semibold leading-tight truncate">
                        {product.name}
                    </h2>
                </Link>

                <div className="flex justify-between items-center">
                    <span className="bg-pink-500 text-white text-xs font-medium py-1 px-2.5 rounded-full">
                        ${product.price}
                    </span>

                  
                </div>
            </div>
        </div>

    );
};

export default SmallProduct;