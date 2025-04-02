import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";

import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

function Profile() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

    useEffect(() => {
        setUserName(userInfo.username);
        setEmail(userInfo.email);
    }, [userInfo.email, userInfo.username]);

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    username,
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success("Profile updated successfully");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="bg-gray-900 flex items-center justify-center min-h-screen">
            <section className="container mx-auto p-6">
                <div className="flex justify-center items-center">
                    <div className="w-full md:w-1/3 bg-gray-800 p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-white mb-6">Update Profile</h2>

                        <form onSubmit={submitHandler} className="space-y-6">
                            {/* Name Input */}
                            <div>
                                <label className="block text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter name"
                                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 outline-none transition-all duration-300"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label className="block text-gray-300 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 outline-none transition-all duration-300"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-gray-300 mb-2">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 outline-none transition-all duration-300"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label className="block text-gray-300 mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 outline-none transition-all duration-300"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-pink-500 text-white py-3 px-5 rounded-lg hover:bg-pink-600 transition-all duration-300"
                                >
                                    Update
                                </button>

                                <Link
                                    to="/user-orders"
                                    className="bg-pink-600 text-white py-3 px-5 rounded-lg hover:bg-pink-700 transition-all duration-300"
                                >
                                    My Orders
                                </Link>
                            </div>

                            {/* Loader */}
                            {loadingUpdateProfile && <Loader />}
                        </form>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default Profile
