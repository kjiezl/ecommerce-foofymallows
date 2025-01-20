const CategoryForm = ({
    value, 
    setValue, 
    handleSubmit, 
    buttonText = "Add Category",
    handleDelete,
}) => {
  return (
    <div className="p-3">
        <form onSubmit={handleSubmit} className="space-y-3">
            <input 
                type="text"
                className="py-3 px-4 border rounded-lg w-full bg-black text-white"
                placeholder="Enter category name (e.g.  shoes)"
                value={value}
                onChange={(e) => setValue(e.target.value)}/>

                <div className="flex justify-between">
                    <button className="mt-4 ml-2 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-transform hover:scale-105">
                        {buttonText}
                    </button>
                    {handleDelete && (
                        <button
                            onClick={handleDelete} 
                            className="mt-4 mr-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-transform hover:scale-105">
                            Delete
                        </button>
                    )}
                </div>
        </form>
    </div>
  )
}

export default CategoryForm