import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
    const { data, isLoading, error } = useGetTopProductsQuery();
    console.log(data);


    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <h1>ERROR</h1>;
    }

    return (

        <>
            <div className="flex justify-around">
                <div className="xl:block lg:hidden md:hidden sm:block w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
                        {data.map((product) => (
                            <div key={product._id} className="flex justify-center">
                                <SmallProduct product={product} />
                            </div>
                        ))}
                    </div>
                </div>
                <ProductCarousel />
            </div>
        </>

    );
};

export default Header;