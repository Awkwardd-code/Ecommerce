import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

function ProductUpdate() {
    const params = useParams();
    const navigate = useNavigate();

    const {
        data: productData,
        isLoading: productLoading,
        isError: productError,
        error: productFetchError,
        refetch
    } = useGetProductByIdQuery(params._id, { refetchOnMountOrArgChange: true });
    const { data: categories = [], isLoading: categoriesLoading } = useFetchCategoriesQuery();

    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [brand, setBrand] = useState("");
    const [stock, setStock] = useState(0);

    const [uploadProductImage] = useUploadProductImageMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        if (productData && productData._id) {
            console.log("Product Data:", productData);
            setName(productData.name || "");
            setDescription(productData.description || "");
            setPrice(productData.price || "");
            setCategory(productData.category?._id || productData.category || "");
            setQuantity(productData.quantity || "");
            setBrand(productData.brand || "");
            setImage(productData.image || "");
            setStock(productData.countInStock || 0);
        }
    }, [productData]);

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success("Image uploaded successfully", {
                position: "top-right",
                autoClose: 2000,
            });
            setImage(res.image);
        } catch (err) {
            toast.error(err?.data?.message || "Image upload failed.", {
                position: "top-right",
                autoClose: 2000,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("quantity", quantity);
            formData.append("brand", brand);
            formData.append("countInStock", stock);

            const result = await updateProduct({ productId: params._id, formData }).unwrap();
            toast.success("Product successfully updated", {
                position: "top-right",
                autoClose: 2000,
            });
            navigate("/admin/allproductslist");
        } catch (err) {
            toast.error(err?.data?.message || "Product update failed. Try again.", {
                position: "top-right",
                autoClose: 2000,
            });
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const result = await deleteProduct(params._id).unwrap();
                toast.success(`"${result.name}" has been deleted`, {
                    position: "top-right",
                    autoClose: 2000,
                });
                navigate("/admin/allproductslist");
            } catch (err) {
                toast.error(err?.data?.message || "Delete failed. Try again.", {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
        }
    };

    if (productLoading || categoriesLoading) {
        return <Loader/>
    }

    if (productError) {
        return <div className="text-white text-center">Error: {productFetchError?.data?.message || "Failed to load product"}</div>;
    }

    return (
        <div className="container mx-auto px-6 max-w-5xl min-h-screen flex items-center justify-center">
            <div className="flex flex-col gap-8 w-full bg-gray-800 rounded-xl shadow-2xl p-8">
                <AdminMenu />
                <div className="w-full bg-gray-900 p-8 sm:p-10 lg:p-12 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-extrabold text-white bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text py-2 mb-8 text-center">
                        Update / Delete Product
                    </h2>

                    {image && (
                        <div className="text-center mb-8">
                            <img
                                src={image}
                                alt="Product"
                                className="mx-auto max-h-[300px] rounded-lg shadow-xl"
                            />
                        </div>
                    )}

                    <div className="mb-8">
                        <label className="cursor-pointer flex flex-col items-center justify-center text-white px-6 py-12 border-2 border-dashed border-pink-500 rounded-lg bg-gray-900 hover:bg-gray-800 transition-all ease-in-out duration-300">
                            {image ? "Change Image" : "Click to Upload Image"}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={uploadFileHandler}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="w-full">
                                <label className="text-white text-lg">Name</label>
                                <input
                                    type="text"
                                    className="p-4 w-full border-2 border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-pink-500 focus:outline-none"
                                    placeholder="Enter product name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="w-full">
                                <label className="text-white text-lg">Price</label>
                                <input
                                    type="number"
                                    className="p-4 w-full border-2 border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-pink-500 focus:outline-none"
                                    placeholder="Enter price in USD"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="w-full">
                                <label className="text-white text-lg">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    className="p-4 w-full border-2 border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-pink-500 focus:outline-none"
                                    placeholder="Enter available quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="w-full">
                                <label className="text-white text-lg">Brand</label>
                                <input
                                    type="text"
                                    className="p-4 w-full border-2 border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-pink-500 focus:outline-none"
                                    placeholder="Enter brand name"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-white text-lg">Description</label>
                            <textarea
                                className="p-4 w-full border-2 border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-pink-500 focus:outline-none"
                                placeholder="Enter a brief product description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                            ></textarea>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="w-full">
                                <label className="text-white text-lg">Count In Stock</label>
                                <input
                                    type="number"
                                    className="p-4 w-full border-2 border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-pink-500 focus:outline-none"
                                    placeholder="Enter stock quantity"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>
                            <div className="w-full">
                                <label className="text-white text-lg">Category</label>
                                <select
                                    className="p-4 w-full border-2 border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-pink-500 focus:outline-none"
                                    value={category || ""}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-between mt-8">
                            <button
                                onClick={handleSubmit}
                                className="py-3 px-10 rounded-lg text-lg font-semibold bg-green-600 hover:bg-green-500 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-green-400"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleDelete}
                                className="py-3 px-10 rounded-lg text-lg font-semibold bg-red-600 hover:bg-red-500 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-red-400"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductUpdate;