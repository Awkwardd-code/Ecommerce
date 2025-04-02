import React, { useState, useEffect } from 'react';
import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineLogin,
    AiOutlineUserAdd,
    AiOutlineShoppingCart
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import "./Navigation.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from '../../redux/features/auth/authSlice';
import FavoritesCount from "../Products/FavoritesCount";

function Navigation() {
    const { userInfo } = useSelector(state => state.auth);
    const { cartItems } = useSelector((state) => state.cart);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        if (!showSidebar) {
            setDropdownOpen(false);
        }
    }, [showSidebar]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    // Function to close dropdown when hovering out of navigation-container
    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };
    const firstLetter = userInfo && userInfo.username && userInfo.username.length > 0
        ? userInfo.username.charAt(0).toUpperCase()
        : '';
    return (
        <div
            style={{ zIndex: 9999 }}
            className={`${showSidebar ? "hidden" : "flex"
                } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh] fixed transition-all duration-300 ease-in-out`}
            id="navigation-container"
            onMouseLeave={handleMouseLeave} // Close dropdown on hover-out
        >
            <div className="flex flex-col justify-center space-y-4">
                <Link
                    to="/"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem] opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
                        HOME
                    </span>
                </Link>
                <Link
                    to="/shop"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem] opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
                        SHOP
                    </span>
                </Link>
                <Link to="/cart" className="flex relative">
                    <div className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">CART</span>{" "}
                    </div>

                    <div className="absolute top-9">
                        {cartItems.length > 0 && (
                            <span>
                                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                                </span>
                            </span>
                        )}
                    </div>
                </Link>
                <Link
                    to="/favorite"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <FaHeart className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem] opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
                        FAVORITE
                    </span>
                    <FavoritesCount />
                </Link>
            </div>

            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="flex items-center text-gray-800 focus:outline-none"
                >
                    {userInfo ? (
                        <div className="flex items-center">
                            {/* Circular badge with the first letter of the username */}
                            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-lg">
                                {firstLetter}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {userInfo && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ml-1 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : "rotate-0"
                                }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 15l7-7 7 7"
                            />
                        </svg>
                    )}
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && userInfo && (
                    <ul
                        className={`absolute right-0 bottom-full mb-2 w-48 space-y-2 rounded-lg bg-white dark:bg-gray-800 
                      text-gray-600 dark:text-white shadow-lg transition-all duration-300 ease-in-out transform origin-bottom 
                      ${dropdownOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
                    >
                        {userInfo.isAdmin && (
                            <>
                                <li>
                                    <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/productlist" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/categorylist" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        Category
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/orderlist" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/userlist" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        Users
                                    </Link>
                                </li>

                            </>
                        )}
                        <li>
                            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                Profile
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={logoutHandler}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                )}
            </div>

            {/* For unauthenticated users */}
            {!userInfo && (
                <ul>
                    <li>
                        <Link
                            to="/login"
                            className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
                        >
                            <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                            <span className="hidden nav-item-name opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
                                LOGIN
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/register"
                            className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
                        >
                            <AiOutlineUserAdd size={26} />
                            <span className="hidden nav-item-name opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
                                REGISTER
                            </span>
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default Navigation;