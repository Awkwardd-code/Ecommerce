const Modal = ({ isOpen, onClose, children }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Dark Overlay with Blur Effect */}
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-md"></div>

                    {/* Modal Container */}
                    <div className="absolute bg-white p-6 rounded-xl shadow-xl max-w-lg w-full transform transition-all 
              duration-300 scale-95 animate-fadeIn">

                        {/* Close Button */}
                        <div className="flex justify-end">
                            <button
                                className="text-gray-600 hover:text-gray-900 bg-gray-200 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 
                  transition-all duration-300 ease-in-out transform hover:scale-110"
                                onClick={onClose}
                                aria-label="Close Modal"
                            >
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="text-center mt-2">{children}</div>
                    </div>
                </div>
            )}
        </>


    );
};

export default Modal;