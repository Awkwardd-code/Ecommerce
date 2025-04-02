import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";
import { useGetProductsQuery } from "./redux/api/productApiSlice"; // Adjust path
import Loader from "./components/Loader";

function App() {
  // Fetch products globally and react to DB changes via tags
  const { 
    data: products, 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useGetProductsQuery({ keyword: "" });

  const handleDbChange = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <Loader/>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Error loading products: {error?.message || "Unknown error"}
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
}

export default App;