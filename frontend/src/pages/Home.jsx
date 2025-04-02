import React from 'react';
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from './Products/Product';

function Home() {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-center items-center mt-12 px-6 sm:px-8 md:px-12 lg:px-16">
            <div className="flex justify-between items-center w-full max-w-6xl">
              <h1 className="text-3xl sm:text-4xl font-semibold text-white text-center">
                Special Products
              </h1>

              <Link
                to="/shop"
                className="bg-pink-600 text-white font-semibold rounded-full py-3 px-8 transition-all duration-300 hover:bg-pink-700 hover:scale-105 ml-4"
              >
                Shop Now
              </Link>
            </div>
          </div>


          <div>
            <div className="flex justify-center flex-wrap mt-4">
              {data.products.map((product) => (
                <div key={product._id} className='mb-4 mt-2'>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>


        </>
      )}
    </>
  )
}

export default Home
