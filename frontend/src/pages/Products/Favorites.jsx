import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
    const favorites = useSelector(selectFavoriteProduct);

    return (
        <div className="container mx-auto p-4">
             <h1 className="text-2xl font-bold text-center text-pink-600 mb-6 uppercase tracking-wide">
                Favorite Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {favorites.map((product) => (
                    <div key={product._id} className="flex justify-center">
                        <div className="w-full">
                            <Product product={product} />
                        </div>
                    </div>
                ))}
            </div>
        </div>


    );
};

export default Favorites;