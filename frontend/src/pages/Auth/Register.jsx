import React from 'react';
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

function Register() {
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = await register({ username, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
                toast.success("User successfully registered");
            } catch (err) {
                console.log(err);
                toast.error(err.data.message);
            }
        }
    };

    return (
        <div
            className="bg-gray-900 flex items-center justify-center"
            style={{ minHeight: '98vh' }}
        >
            <section className="flex flex-row items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                {/* Form Section */}
                <div className="w-full md:w-4/5 lg:w-1/2 p-8 bg-gray-800 rounded-lg shadow-lg max-h-[85vh] flex flex-col justify-center">
                    <h1 className="text-3xl font-bold mb-4 text-white">Register</h1>

                    <form onSubmit={submitHandler} className="container w-full max-w-md space-y-6">
                        <div className="my-[2rem]">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                                placeholder="Enter name"
                                value={username}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="my-[2rem]">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="my-[2rem]">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="my-[2rem]">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full bg-pink-600 text-white px-4 py-3 rounded-lg cursor-pointer my-[1rem] hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300 disabled:bg-pink-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </button>

                        {isLoading && <Loader />}
                    </form>

                    <div className="mt-4">
                        <p className="text-gray-300">
                            Already have an account?{" "}
                            <Link
                                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                                className="text-pink-400 hover:underline hover:text-pink-300 transition-colors duration-200"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Image Section */}
                <div className="hidden lg:block w-full lg:w-1/2 p-8">
                    <img
                        src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
                        alt="Decorative background"
                        className="h-[40rem] w-full rounded-lg"
                    />
                </div>
            </section>
        </div>

    )
}

export default Register
