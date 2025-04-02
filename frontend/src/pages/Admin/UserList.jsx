import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import AdminMenu from "./AdminMenu";
import {
    useDeleteUserMutation,
    useGetUsersQuery,
    useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";

function UserList() {
    const { data, refetch, isLoading, error } = useGetUsersQuery();  // Get the full response object
    const [deleteUser] = useDeleteUserMutation();
    const [updateUser] = useUpdateUserMutation();

    const [editableUserId, setEditableUserId] = useState(null);
    const [editableFields, setEditableFields] = useState({ username: "", email: "" });

    // Log the full response
    useEffect(() => {
        console.log("Full API response:", { data, isLoading, error }); // Full response logging
        refetch();
    }, [refetch, data]);

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteUser(id);
                toast.success("User deleted successfully!");
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const toggleEdit = (id, username, email) => {
        setEditableUserId(id);
        setEditableFields({ username, email });
    };

    const updateHandler = async (id) => {
        try {
            await updateUser({
                userId: id,
                username: editableFields.username,
                email: editableFields.email,
            });
            setEditableUserId(null);
            toast.success("User updated successfully!");
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    // Check if 'users' is an array and contains data
    const users = data?.users || [];  // Assuming the data returned contains a `users` property

    const isUsersAvailable = Array.isArray(users) && users.length > 0;

    return (
        <div className="bg-gray-900 flex items-center justify-center py-6 min-h-screen">
            <AdminMenu/>
            <div className="container mx-auto px-6 w-full max-w-5xl">
                {/* Heading */}
                <h1 className="text-4xl font-extrabold text-white text-center mb-6">
                    Users Management
                </h1>

                {/* Loader or Error Handling */}
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error?.data?.message || error.error}</Message>
                ) : (
                    <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-xl">
                        <table className="w-full border-collapse">
                            {/* Table Head */}
                            <thead className="bg-gray-700 text-gray-300 text-sm">
                                <tr>
                                    <th className="px-6 py-4 text-left">ID</th>
                                    <th className="px-6 py-4 text-left">NAME</th>
                                    <th className="px-6 py-4 text-left">EMAIL</th>
                                    <th className="px-6 py-4 text-left">ADMIN</th>
                                    <th className="px-6 py-4 text-left">ACTIONS</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="bg-gray-700 text-white">
                                {isUsersAvailable ? (
                                    users.map((user) => (
                                        <tr
                                            key={user._id}
                                            className="hover:bg-gray-600 transition-all duration-200"
                                        >
                                            {/* ID */}
                                            <td className="px-6 py-3">{user._id}</td>

                                            {/* Name */}
                                            <td className="px-6 py-3">
                                                {editableUserId === user._id ? (
                                                    <div className="flex items-center space-x-2">
                                                        <input
                                                            type="text"
                                                            value={editableFields.username || ""}
                                                            onChange={(e) =>
                                                                setEditableFields({
                                                                    ...editableFields,
                                                                    username: e.target.value,
                                                                })
                                                            }
                                                            className="w-full p-2 border border-gray-500 rounded-lg bg-gray-600 text-white focus:ring-2 focus:ring-pink-500"
                                                        />
                                                        <button
                                                            onClick={() => updateHandler(user._id)}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all"
                                                        >
                                                            <FaCheck />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center space-x-2">
                                                        <span>{user.username}</span>
                                                        <button
                                                            onClick={() =>
                                                                toggleEdit(user._id, user.username, user.email)
                                                            }
                                                            className="text-gray-400 hover:text-pink-400"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>

                                            {/* Email */}
                                            <td className="px-6 py-3">
                                                {editableUserId === user._id ? (
                                                    <div className="flex items-center space-x-2">
                                                        <input
                                                            type="text"
                                                            value={editableFields.email || ""}
                                                            onChange={(e) =>
                                                                setEditableFields({
                                                                    ...editableFields,
                                                                    email: e.target.value,
                                                                })
                                                            }
                                                            className="w-full p-2 border border-gray-500 rounded-lg bg-gray-600 text-white focus:ring-2 focus:ring-pink-500"
                                                        />
                                                        <button
                                                            onClick={() => updateHandler(user._id)}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all"
                                                        >
                                                            <FaCheck />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center space-x-2">
                                                        <a
                                                            href={`mailto:${user.email}`}
                                                            className="text-pink-400 hover:text-pink-300 transition"
                                                        >
                                                            {user.email}
                                                        </a>
                                                        <button
                                                            onClick={() =>
                                                                toggleEdit(user._id, user.username, user.email)
                                                            }
                                                            className="text-gray-400 hover:text-pink-400"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>

                                            {/* Admin Status */}
                                            <td className="px-6 py-3 text-center">
                                                {user.isAdmin ? (
                                                    <FaCheck className="text-green-500" />
                                                ) : (
                                                    <FaTimes className="text-red-500" />
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-3 flex justify-center space-x-2">
                                                {!user.isAdmin && (
                                                    <button
                                                        onClick={() => deleteHandler(user._id)}
                                                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition transform hover:scale-105"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-3 text-center text-gray-400">
                                            No users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>



    );
}

export default UserList;
