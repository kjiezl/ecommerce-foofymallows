import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify'
import Loader from "../../components/Loader"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { Link } from "react-router-dom"
import { useProfileMutation } from "../../redux/api/usersApiSlice"

const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const {userInfo} = useSelector(state => state.auth);

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

    useEffect(() => {
        setUsername(userInfo.username);
        setEmail(userInfo.email);
    }, [userInfo.email, userInfo.username])

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try{
            const res = await updateProfile({_id: userInfo._id,username, email, password}).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Profile updated successfully");
        } catch(err) {
            toast.error(err?.data?.message || err.message);
        }
    }

    return (
    <div className="container mx-auto p-4 mt-[10rem]">
        <div className="flex justify-center align-center md:flex md: space-x-4">
            <div className="md:w-1/3">
                <h2 className="text-3xl font-bold mb-10 text-center">
                    Update Profile
                </h2>

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block font-medium text-slate-800">Name</label>
                        <input 
                            type="text" 
                            placeholder="John Doe"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="bg-white text-slate-800 form-input mt-1 p-4 rounded-lg w-full shadow-xl" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-slate-800">Email</label>
                        <input 
                            type="email" 
                            placeholder="example@email.com"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="bg-white text-slate-800 form-input mt-1 p-4 rounded-lg w-full shadow-xl" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-slate-800">Password</label>
                        <input 
                            type="password" 
                            placeholder="********"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="bg-white text-slate-800 form-input mt-1 p-4 rounded-lg w-full shadow-xl" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-slate-800">Confirm Password</label>
                        <input 
                            type="password" 
                            placeholder="********"
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            className="bg-white text-slate-800 form-input mt-1 p-4 rounded-lg w-full shadow-xl" />
                    </div>

                    <div className="flex justify-between">
                        <button 
                            type="submit"
                            className="text-white bg-pink-700 px-4 py-2 rounded hover:brightness-125 cursor-pointer my-[1rem] transition-transform transform hover:scale-105">
                                Update
                        </button>

                        <Link 
                            to='/user-orders'
                            className="text-white bg-pink-700 px-4 py-2 rounded hover:brightness-125 cursor-pointer my-[1rem] transition-transform transform hover:scale-105">
                                My Orders
                        </Link>
                    </div>
                </form>
            </div>

            {loadingUpdateProfile && <Loader />}
        </div>
    </div>
    )
}

export default Profile