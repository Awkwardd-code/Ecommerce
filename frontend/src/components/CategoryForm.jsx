const CategoryForm = ({
    value,
    setValue,
    handleSubmit,
    buttonText = "Submit",
    handleDelete,
}) => {
    return (
        <div className="p-8 bg-gray-900 rounded-xl shadow-lg w-full max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Field with Glass Effect */}
                <input
                    type="text"
                    className="py-4 px-5 border border-gray-700 rounded-lg w-full bg-gray-800 text-white placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                    placeholder="Write category name..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                {/* Buttons */}
                <div className="flex justify-between">
                    <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-8 rounded-lg 
              hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg">
                        {buttonText}
                    </button>

                    {handleDelete && (
                        <button
                            onClick={handleDelete}
                            className="bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-8 rounded-lg 
                hover:from-red-600 hover:to-red-800 transition-all duration-300 shadow-lg"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    );

};

export default CategoryForm;