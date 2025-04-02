import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/api/usersApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()

    const { userInfo } = useSelector(state => state.auth);
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || "/";


    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            console.log(res);
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
            toast.success("User successfully logged in");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="bg-gray-900 flex items-center justify-center min-h-screen">
            <section className="flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full w-full">

                {/* Form Section */}
                <div className="w-full md:w-4/5 lg:w-1/2 p-8 bg-gray-800 rounded-lg shadow-lg max-h-[80vh] flex flex-col justify-center">
                    <h1 className="text-3xl font-bold mb-6 text-white">Sign In</h1>

                    <form onSubmit={submitHandler} className="container w-full max-w-md space-y-6">
                        <div className="my-[2rem]">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 p-3 border border-gray-600 rounded-lg w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full bg-pink-600 text-white px-4 py-3 rounded-lg cursor-pointer my-[1rem] hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300 disabled:bg-pink-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>

                        {isLoading && <Loader />}
                    </form>

                    <div className="mt-4">
                        <p className="text-gray-300">
                            New Customer?{" "}
                            <Link
                                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                                className="text-pink-400 hover:underline hover:text-pink-300 transition-colors duration-200"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Image Section */}
                <div className="hidden md:block w-full lg:w-1/2 p-8">
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                        alt="Decorative background"
                        className="h-[30rem] w-full rounded-lg"
                    />
                </div>
            </section>
        </div>

    )
}

export default Login
