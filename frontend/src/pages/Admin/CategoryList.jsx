import { useState, useEffect } from "react";
import {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

function CategoryList() {
    const { data: categories, refetch } = useFetchCategoriesQuery();

    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updatingName, setUpdatingName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    // Tracking category create, update, or delete events
    const [categoryChanged, setCategoryChanged] = useState(false);

    const handleCreateCategory = async (e) => {
        e.preventDefault();

        if (!name) {
            toast.error("Category name is required");
            return;
        }

        try {
            const result = await createCategory({ name }).unwrap();
            if (result.error) {
                toast.error(result.error);
            } else {
                setName("");
                toast.success(`${result.name} is created.`);
                setCategoryChanged(true);  // Set the categoryChanged state to true
            }
        } catch (error) {
            console.error(error);
            toast.error("Creating category failed, try again.");
        }
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();

        if (!updatingName) {
            toast.error("Category name is required");
            return;
        }

        try {
            const result = await updateCategory({
                categoryId: selectedCategory._id,
                updatedCategory: {
                    name: updatingName,
                },
            }).unwrap();

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(`${result.name} is updated`);
                setSelectedCategory(null);
                setUpdatingName("");
                setModalVisible(false);
                setCategoryChanged(true);  // Set the categoryChanged state to true
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteCategory = async () => {
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap();

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(`${result.name} is deleted.`);
                setSelectedCategory(null);
                setModalVisible(false);
                setCategoryChanged(true);  // Set the categoryChanged state to true
            }
        } catch (error) {
            console.error(error);
            toast.error("Category deletion failed. Try again.");
        }
    };

    // useEffect to trigger refetch when category changes (create, update, delete)
    useEffect(() => {
        if (categoryChanged) {
            refetch();
            setCategoryChanged(false);
        }
    }, [categoryChanged, refetch]);

    return (
        <div className="container mx-auto px-6 max-w-4xl min-h-screen flex flex-col items-center justify-center">
            <div className="w-full bg-gray-900 p-8 rounded-xl shadow-2xl">
                <AdminMenu/>
                {/* Heading */}
                <h2 className="text-3xl font-extrabold text-white bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-center py-2 mb-6">
                    Manage Categories
                </h2>

                {/* Category Form */}
                <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />

                {/* Divider */}
                <div className="my-6 border-t border-gray-700"></div>

                {/* Category List */}
                <div className="flex flex-wrap justify-center gap-4">
                    {categories?.map((category) => (
                        <button
                            key={category._id}
                            className="bg-gray-800 border border-pink-500 text-pink-500 py-2 px-5 rounded-lg 
                        hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-md"
                            onClick={() => {
                                setModalVisible(true);
                                setSelectedCategory(category);
                                setUpdatingName(category.name);
                            }}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Category Edit Modal */}
                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                    <CategoryForm
                        value={updatingName}
                        setValue={setUpdatingName}
                        handleSubmit={handleUpdateCategory}
                        buttonText="Update"
                        handleDelete={handleDeleteCategory}
                    />
                </Modal>
            </div>
        </div>

    );
}

export default CategoryList;
