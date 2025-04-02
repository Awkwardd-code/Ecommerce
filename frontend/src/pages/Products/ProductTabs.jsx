import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Top Bar Navigation */}
      <section className="w-full bg-gray-900 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between bg-gray-900 rounded-xl p-2 sticky top-0 w-full mx-auto z-10">
          {[{ id: 1, title: "Write Your Review" }, { id: 2, title: "All Reviews" }, { id: 3, title: "Related Products" }]
            .map((tab) => (
              <div
                key={tab.id}
                className={`flex-1 p-4 cursor-pointer text-lg rounded-lg text-center transition-all duration-300
            ${activeTab === tab.id
                    ? "bg-white font-bold text-pink-600 border-b-4 border-pink-600 shadow-md transform scale-105"
                    : "text-gray-300 hover:bg-gray-700 hover:border-b-4 hover:border-pink-600 hover:scale-105"
                  }
            sm:text-base sm:p-3 sm:flex-1 sm:w-auto md:text-lg md:p-4 md:flex-1`}
                onClick={() => handleTabClick(tab.id)}
                aria-selected={activeTab === tab.id ? "true" : "false"}
                role="tab"
                tabIndex={0}
              >
                {tab.title}
              </div>
            ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full flex flex-col md:flex-row mt-6 gap-8">

        {/* Second Section: Content */}
        <section className="w-full p-4 bg-gray-800 rounded-lg shadow-lg">
          {activeTab === 1 && (
            <div className="flex justify-center pb-8">
              <div className="w-full sm:w-[70%] md:w-[60%] pt-4 px-8 pb-4 bg-gray-900 rounded-lg shadow-xl z-30">
                {userInfo ? (
                  <form onSubmit={submitHandler} className="space-y-4 pb-8"> {/* Reduced space-y-6 to space-y-4 */}
                    <div className="my-4">
                      <label htmlFor="rating" className="block text-xl text-white mb-2">
                        Rating
                      </label>
                      <select
                        id="rating"
                        required
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="p-3 border border-gray-500 rounded-lg w-full text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        <option value="1">Inferior</option>
                        <option value="2">Decent</option>
                        <option value="3">Great</option>
                        <option value="4">Excellent</option>
                        <option value="5">Exceptional</option>
                      </select>
                    </div>

                    <div className="my-2">
                      <label htmlFor="comment" className="block text-xl text-white mb-2">
                        Comment
                      </label>
                      <textarea
                        id="comment"
                        rows="4"
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="p-3 border border-gray-500 rounded-lg w-full text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                        placeholder="Write your comment here..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loadingProductReview}
                      className="bg-pink-600 text-white py-3 px-6 rounded-lg w-full transition-all duration-300 hover:bg-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {loadingProductReview ? (
                        <span className="flex justify-center items-center">
                          <svg
                            className="animate-spin w-5 h-5 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path
                              className="opacity-75"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                              d="M4 12a8 8 0 1 1 16 0 8 8 0 1 1-16 0z"
                            ></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </form>
                ) : (
                  <p className="text-white text-center mt-4">
                    Please <Link to="/login" className="text-pink-600 hover:underline">sign in</Link> to write a review.
                  </p>
                )}
              </div>
            </div>


          )}

          {activeTab === 2 && (
            <>
              <div>{product.reviews.length === 0 && <p className="text-white">No Reviews</p>}</div>
              <div>
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-[#1A1A1A] p-4 rounded-lg mb-5 shadow-md"
                  >
                    <div className="flex justify-between">
                      <strong className="text-[#B0B0B0]">{review.name}</strong>
                      <p className="text-[#B0B0B0]">{review.createdAt.substring(0, 10)}</p>
                    </div>
                    <p className="my-4 text-white">{review.comment}</p>
                    <Ratings value={review.rating} starRatedColor="#F472B6"  />
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 3 && (
            <section className="flex flex-wrap justify-between gap-4 px-4 sm:px-6 mt-6">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div
                  key={product._id}
                  className="w-[100%] sm:w-[45%] md:w-[45%] lg:w-[45%] xl:w-[45%] p-4"
                >
                  <SmallProduct product={product} />
                </div>
              ))
            )}
          </section>
          
          



          )}
        </section>
      </div>
    </div>





  );
};

export default ProductTabs;