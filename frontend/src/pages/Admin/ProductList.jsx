import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
    useCreateProductMutation,
    useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

function ProductList() {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    console.log(category);

    const [quantity, setQuantity] = useState("");
    const [brand, setBrand] = useState("");
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const { data: categories } = useFetchCategoriesQuery();

    // Effect hook to update state dynamically without refreshing the page
    useEffect(() => {
        if (imageUrl) {
            setImage(imageUrl); // Updating image state
        }
    }, [imageUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append("image", image);
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("quantity", quantity);
            productData.append("brand", brand);
            productData.append("countInStock", stock);

            const { data } = await createProduct(productData);

            if (data.error) {
                toast.error("Product create failed. Try Again.");
            } else {
                toast.success(`${data.name} is created`);
                navigate("/"); // Navigate back to the product listing page
                // Update the form state without refreshing the page
                setName("");
                setDescription("");
                setPrice("");
                setCategory("");
                setQuantity("");
                setBrand("");
                setStock(0);
                setImageUrl(null); // Reset the image preview
            }
        } catch (error) {
            console.error(error);
            toast.error("Product create failed. Try Again.");
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
            setImageUrl(res.image); // Update imageUrl which triggers useEffect hook
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

    return (
        <div className="container xl:mx-auto sm:mx-0 py-8">
            <div className="flex justify-center items-center min-h-screen">
                <AdminMenu/>
                <div className="md:w-3/4 lg:w-2/3 xl:w-2/3 bg-gray-900 p-8 rounded-lg shadow-xl">

                    <h2 className="text-3xl font-semibold text-white mb-6">Create Product</h2>

                    {/* Product Image Preview */}
                    {imageUrl && (
                        <div className="text-center mb-4">
                            <img
                                src={imageUrl}
                                alt="Product"
                                className="mx-auto max-h-[250px] rounded-lg shadow-lg"
                            />
                        </div>
                    )}

                    {/* File Upload */}
                    <div className="mb-6">
                        <label className="cursor-pointer flex flex-col items-center justify-center text-white px-4 py-10 border-2 border-dashed border-pink-500 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all ease-in-out duration-200">
                            {image ? image.name : "Click to Upload Image"}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={uploadFileHandler}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Form Inputs */}
                    <div className="space-y-6">

                        {/* Name & Price */}
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full">
                                <label className="text-white text-sm">Name</label>
                                <input
                                    type="text"
                                    className="p-3 w-full border-2 border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="Enter product name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="w-full">
                                <label className="text-white text-sm">Price</label>
                                <input
                                    type="number"
                                    className="p-3 w-full border-2 border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="Enter price in USD"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Quantity & Brand */}
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full">
                                <label className="text-white text-sm">Quantity</label>
                                <input
                                    type="number"
                                    className="p-3 w-full border-2 border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="Enter available quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="w-full">
                                <label className="text-white text-sm">Brand</label>
                                <input
                                    type="text"
                                    className="p-3 w-full border-2 border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="Enter brand name"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-white text-sm">Description</label>
                            <textarea
                                className="p-3 w-full border-2 border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder="Enter a brief product description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="3"
                            ></textarea>
                        </div>

                        {/* Stock & Category */}
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full">
                                <label className="text-white text-sm">Count In Stock</label>
                                <input
                                    type="number"
                                    className="p-3 w-full border-2 border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="Enter stock quantity"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>
                            <div className="w-full">
                                <label className="text-white text-sm">Category</label>
                                <select
                                    className="p-3 w-full border-2 border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={category}
                                >
                                    <option value="">Select a category</option>
                                    {categories?.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center mt-6">
                            <button
                                onClick={handleSubmit}
                                className="py-3 px-10 rounded-lg text-lg font-bold bg-pink-600 hover:bg-pink-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-900"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
}

export default ProductList;
