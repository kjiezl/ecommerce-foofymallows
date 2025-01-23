import { useState } from "react";
import { NavLink } from "react-router";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    
  return (
    <>
        <button 
            className={`top-5 right-7 bg-white p-2 fixed rounded-lg`}
            onClick={toggleMenu}>
                {isMenuOpen ? 
                    (<FaTimes className="w-5 h-5 tex-pink-600"/>) 
                    : (<>
                        <div className="w-5 h-0.5 bg-pink-700 my-1"></div>
                        <div className="w-5 h-0.5 bg-pink-700 my-1"></div>
                        <div className="w-5 h-0.5 bg-pink-700 my-1"></div>
                    </>)}
        </button>
        {isMenuOpen && (
            <section
                className="bg-pink-600 p-2 fixed right-14 top-12">
                    <ul className="list-none mt-2">
                        <li>
                            <NavLink 
                                className="list-item py-2 px-3 mb-5 hover:bg-pink-500 rounded-sm"
                                to='/admin/dashboard'
                                style={({isActive}) => ({color: isActive ? "yellow" : "white"})}>
                                    Admin Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className="list-item py-2 px-3 mb-5 hover:bg-pink-500 rounded-sm"
                                to='/admin/categorylist'
                                style={({isActive}) => ({color: isActive ? "yellow" : "white"})}>
                                    Create Category
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className="list-item py-2 px-3 mb-5 hover:bg-pink-500 rounded-sm"
                                to='/admin/productlist'
                                style={({isActive}) => ({color: isActive ? "yellow" : "white"})}>
                                    Create Product
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className="list-item py-2 px-3 mb-5 hover:bg-pink-500 rounded-sm"
                                to='/admin/allproductslist'
                                style={({isActive}) => ({color: isActive ? "yellow" : "white"})}>
                                    All Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className="list-item py-2 px-3 mb-5 hover:bg-pink-500 rounded-sm"
                                to='/admin/userlist'
                                style={({isActive}) => ({color: isActive ? "yellow" : "white"})}>
                                    Manage Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className="list-item py-2 px-3 mb-5 hover:bg-pink-500 rounded-sm"
                                to='/admin/orderlist'
                                style={({isActive}) => ({color: isActive ? "yellow" : "white"})}>
                                    Manage Orders
                            </NavLink>
                        </li>
                    </ul>
                </section>
        )}
    </>
  )
}

export default AdminMenu