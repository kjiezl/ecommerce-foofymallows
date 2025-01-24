import { useState } from 'react'
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart} from 'react-icons/ai'
import { FaRegHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Navigation.css'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../redux/api/usersApiSlice'
import { logout } from '../../redux/features/auth/authSlice'
import FavoritesCount from '../Products/FavoritesCount'

const Navigation = () => {
    const {userInfo} = useSelector(state => state.auth);
    const {cartItems} = useSelector(state => state.cart);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    const closeSidebar = () => {
        setShowSidebar(false);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ logoutApiCall ] = useLogoutMutation();

    const logoutHandler = async () => {
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    }

    return <div 
                style={{zIndex: 999}} 
                className={`${showSidebar ? 'hidden' : 'flex'} xl:flex lf:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-pink-950 w-[4%] hover:w-[15%] h-[100vh] fixed`}
                id='navigation-container'>

            <div className="flex flex-col justify-center space-y-4">
                <Link 
                    to='/' 
                    className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineHome className='mr-3 mt-[3rem]' size={26} />
                    <span className='hidden nav-item-name mt-[3rem]'>Home</span> {" "}
                </Link>
                <Link 
                    to='/shop' 
                    className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineShopping className='mr-2 mt-[3rem]' size={26} />
                    <span className='hidden nav-item-name mt-[3rem]'>Shop</span> {" "}
                </Link>
                <Link 
                    to='/cart' 
                    className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineShoppingCart className='mr-2 mt-[3rem]' size={26} />
                    <span className='hidden nav-item-name mt-[3rem]'>Cart</span> {" "}
                    <div className="absolute left-4 bottom-[-0.5rem]">
                        {cartItems.length > 0 && (
                            <span>
                                <span className="px-1.5 py-0 text-sm text-white bg-pink-600 rounded-full">
                                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                                </span>
                            </span>
                        )}
                    </div>
                </Link>
                <Link 
                    to='/favorite' 
                    className='flex items-center transition-transform transform hover:translate-x-2'>
                    <FaRegHeart className='mr-2 mt-[3rem]' size={26} />
                    <span className='hidden nav-item-name mt-[3rem]'>Favorites</span> {" "}
                    <FavoritesCount />
                </Link>
            </div>

        <div className="relative">
            <button onMouseEnter={toggleDropdown} className='flex items-center text-gray-8000 focus:outline-none'>
                {userInfo ? <span className='text-white'>{userInfo.username}</span> : (<></>)}
                {userInfo && (
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className={`h-4 w-4 ml-1 ${
                            dropdownOpen ? 'transform rotate-180' : ""
                        }`}
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='pink-700'>
                        <path 
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d={dropdownOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
                        />
                    </svg>
                )}
            </button>
            {dropdownOpen && userInfo && (
                <ul onMouseLeave={toggleDropdown} className={`absolute right-0 mt-2 mr-16 space-y-2 bg-pink-500 text-white 
                    ${!userInfo.isAdmin ? '-top-20' : '-top-80'}`}>
                    {userInfo.isAdmin && (
                        <>
                            <li>
                                <Link 
                                    onClick={toggleDropdown}
                                    to='/admin/dashboard' 
                                    className='block px-4 py-2 hover:bg-pink-400'>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    onClick={toggleDropdown}
                                    to='/admin/productlist' 
                                    className='block px-4 py-2 hover:bg-pink-400'>
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    onClick={toggleDropdown}
                                    to='/admin/categorylist' 
                                    className='block px-4 py-2 hover:bg-pink-400'>
                                    Category
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    onClick={toggleDropdown}
                                    to='/admin/orderlist' 
                                    className='block px-4 py-2 hover:bg-pink-400'>
                                    Orders
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    onClick={toggleDropdown}
                                    to='/admin/userlist' 
                                    className='block px-4 py-2 hover:bg-pink-400'>
                                    Users
                                </Link>
                            </li>
                        </>
                    )}

                    <li>
                        <Link 
                            to='/profile' 
                            onClick={toggleDropdown}
                            className='block px-4 py-2 hover:bg-pink-400'>
                            Profile
                        </Link>
                    </li>
                    <li>
                    <button
                        onClick={() => { logoutHandler(); toggleDropdown(); }}
                        className="block w-full px-4 py-2 text-left hover:bg-pink-400">
                        Logout
                    </button>
                    </li>
                </ul>
            )}
        </div>

        {!userInfo && (
            <ul>
                <li>
                    <Link 
                        to='/login' 
                        className='flex items-center transition-transform transform hover:translate-x-2'>
                        <AiOutlineLogin className='mr-2 mt-[3rem]' size={26} />
                        <span className='hidden nav-item-name mt-[3rem]'>Login</span> {" "}
                    </Link>
                </li>
                <li>
                    <Link 
                        to='/register' 
                        className='flex items-center transition-transform transform hover:translate-x-2'>
                        <AiOutlineUserAdd className='mr-2 mt-[3rem]' size={26} />
                        <span className='hidden nav-item-name mt-[3rem]'>Register</span> {" "}
                    </Link>
                </li>
            </ul>
        )}
    </div>;
}

export default Navigation