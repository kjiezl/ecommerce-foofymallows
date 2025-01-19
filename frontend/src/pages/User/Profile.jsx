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
                <h2 className="text-2xl font-semibold mb-8">
                    Update Profile
                </h2>

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block font-medium text-black">Name</label>
                        <input 
                            type="text" 
                            placeholder="John Doe"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="form-input mt-1 p-4 border border-b-slate-400 rounded-small w-full shadow-xl" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-black">Email</label>
                        <input 
                            type="email" 
                            placeholder="example@email.com"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="form-input mt-1 p-4 border border-b-slate-400 rounded-small w-full shadow-xl" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-black">Password</label>
                        <input 
                            type="password" 
                            placeholder="********"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="form-input mt-1 p-4 border border-b-slate-400 rounded-small w-full shadow-xl" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium text-black">Confirm Password</label>
                        <input 
                            type="password" 
                            placeholder="********"
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            className="form-input mt-1 p-4 border border-b-slate-400 rounded-small w-full shadow-xl" />
                    </div>

                    <div className="flex justify-between">
                        <button 
                            type="submit"
                            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 cursor-pointer my-[1rem] transition-transform transform hover:scale-105">
                                Update
                        </button>

                        <Link 
                            to='/user-orders'
                            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 cursor-pointer my-[1rem] transition-transform transform hover:scale-105">
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