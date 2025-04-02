import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// Custom Left Arrow for carousel
const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 text-white flex items-center justify-center rounded-full shadow-md z-20"
    onClick={onClick}
  >
    ❮
  </button>
);

// Custom Right Arrow for carousel
const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 text-white flex items-center justify-center rounded-full shadow-md z-20"
    onClick={onClick}
  >
    ❯
  </button>
);

const ProductCarousel = () => {
  
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="mb-6 flex justify-center items-center relative">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings} className="w-full max-w-3xl px-4 sm:px-6 relative">
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div
                key={_id}
                className="bg-gray-900 p-5 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl relative"
              >
                {/* Product Image */}
                <img
                  src={image}
                  alt={name}
                  className="w-full h-[24rem] object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
                />

                {/* Product Details */}
                <div className="mt-3 text-white">
                  <Link to={`/product/${_id}`} className="text-decoration-none text-xl font-bold text-pink-400">
                    <h2 className="text-white text-lg font-semibold leading-tight truncate">
                      {name}
                    </h2>
                  </Link>

                  <p className="text-lg text-gray-300 font-semibold mt-1">
                    ${price.toFixed(2)}
                  </p>

                  {/* Short Description */}
                  <p className="mt-2 text-gray-400 text-sm">
                    {description.length > 100
                      ? `${description.substring(0, 100)}...`
                      : description}
                  </p>

                  {/* Additional Info */}
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="space-y-2">
                      <p className="flex items-center text-gray-300 text-sm">
                        <FaStore className="mr-1 text-pink-500" /> Brand:{" "}
                        <span className="ml-1">{brand}</span>
                      </p>
                      <p className="flex items-center text-gray-300 text-sm">
                        <FaClock className="mr-1 text-pink-500" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </p>
                      <p className="flex items-center text-gray-300 text-sm">
                        <FaStar className="mr-1 text-yellow-400" /> Reviews:{" "}
                        {numReviews}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="flex items-center text-gray-300 text-sm">
                        <FaStar className="mr-1 text-yellow-400" /> Rating:{" "}
                        {rating.toFixed(1)}
                      </p>
                      <p className="flex items-center text-gray-300 text-sm">
                        <FaShoppingCart className="mr-1 text-green-400" />{" "}
                        Quantity: {quantity}
                      </p>
                      <p className="flex items-center text-gray-300 text-sm">
                        <FaBox className="mr-1 text-blue-400" /> In Stock:{" "}
                        {countInStock}
                      </p>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    
                    className="mt-4 w-2/5 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md">
                    Add to Cart
                  </button>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
