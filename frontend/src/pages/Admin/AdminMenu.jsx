import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`${isMenuOpen ? "top-4 right-4 bg-[#0D0D0D]" : "top-5 right-7 bg-[#151515]"} 
      p-4 fixed rounded-2xl shadow-xl transition-all duration-300 z-50 cursor-pointer hover:scale-105`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" size={26} />
        ) : (
          <>
            <div className="w-7 h-0.5 bg-gray-300 my-1 transition-all"></div>
            <div className="w-7 h-0.5 bg-gray-300 my-1 transition-all"></div>
            <div className="w-7 h-0.5 bg-gray-300 my-1 transition-all"></div>
          </>
        )}
      </button>

      {/* Sidebar */}
      <section
        className={`fixed top-0 right-0 h-full w-[300px] bg-[#151515]/80 backdrop-blur-xl shadow-2xl 
      transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} 
      p-8 z-40 rounded-l-2xl border-l border-gray-700`}
      >
        <ul className="mt-12 space-y-5">
          {[
            { to: "/admin/dashboard", text: "Admin Dashboard" },
            { to: "/admin/categorylist", text: "Create Category" },
            { to: "/admin/productlist", text: "Create Product" },
            { to: "/admin/allproductslist", text: "All Products" },
            { to: "/admin/userlist", text: "Manage Users" },
            { to: "/admin/orderlist", text: "Manage Orders" },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className="block py-3 px-5 text-white font-semibold text-lg rounded-lg 
              transition-all duration-300 hover:bg-[#2E2D2D] hover:text-green-400"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </section>

      {/* Overlay Background when Menu is Open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity z-30"
          onClick={toggleMenu}
        ></div>
      )}
    </>

  );
};

export default AdminMenu;