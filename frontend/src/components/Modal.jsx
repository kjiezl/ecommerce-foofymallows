const Modal = ({isOpen, onClose, children}) => {
  return (
    <>
        {isOpen && (
            <div className="fixed inset-0 items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="absolute top-[40%] right-[50%] bg-white p-4 rounded-lg z-10 text-right">
                    <button
                        onClick={onClose} 
                        className="text-pink-500 text-lg font-bold hover:text-pink-900 transition-transform hover:scale-105 mr-2">
                        x
                    </button>
                    {children}
                </div>
            </div>
        )}
    </>
  )
}

export default Modal