import { useNavigate } from "react-router-dom";

const NoProducts = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            {/* SVG Illustration */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                className="w-48 h-48 text-gray-400"
                fill="currentColor"
            >
                <path d="M320 96c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144S399.5 96 320 96zM144 240c0-97.2 78.8-176 176-176s176 78.8 176 176-78.8 176-176 176-176-78.8-176-176zm480 240h-64c-17.7 0-32-14.3-32-32v-16h-32v16c0 35.3 28.7 64 64 64h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h64c35.3 0 64-28.7 64-64v-16h-32v16c0 17.7-14.3 32-32 32H16c-8.8 0-16-7.2-16-16s7.2-16 16-16h576c8.8 0 16 7.2 16 16s-7.2 16-16 16z" />
            </svg>

            {/* Message */}
            <h2 className="text-2xl font-semibold text-gray-300 mt-4">No Products Available</h2>
            <p className="text-gray-400 mt-2">Check back later or add a new product.</p>

            {/* Add Product Button */}
            <button
                onClick={() => navigate("/admin/productlist")}
                className="mt-6 px-6 py-3 bg-pink-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-pink-600 transition-all duration-300"
            >
                Add Product
            </button>
        </div>
    );
};

export default NoProducts;
