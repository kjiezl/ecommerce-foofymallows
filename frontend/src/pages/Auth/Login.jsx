import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useLoginMutation } from "../../redux/api/usersApiSlice"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const {userInfo} = useSelector((state) => state.auth);
    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()

        try{
            const res = await login({email, password}).unwrap();
            console.log(res);
            dispatch(setCredentials({ ...res }));
        } catch(err){
            toast.error(err?.data?.message || err.message);
        }
    }

    return <div>
        <section className="pl-[10rem] flex flex-wrap">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-3xl font-bold mb-4">Welcome!</h1>

                <form onSubmit={submitHandler} className="container w-[40rem]">
                    <div className="my-[2rem] mt-[4rem]">
                        <label htmlFor="email" className="block text-sm font-medium text-slate-900">
                            Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            required
                            // className="mt-1 p-2 border border-b-slate-400 rounded w-full shadow-xl sm:text-sm" 
                            className="mt-1 p-2 bg-white text-slate-800 border border-b-slate-400 rounded w-full sm:text-sm" 
                            placeholder="example@email.com"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-slate-900">
                            Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            required
                            placeholder="********" 
                            className="mt-1 p-2 border bg-white text-slate-800 border-b-slate-400 rounded w-full sm:text-sm" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button 
                        disabled={isLoading} 
                        type="submit"
                        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 cursor-pointer mt-[1rem] transition-transform transform hover:scale-105">
                        {isLoading ? 'Logging in...' : 'Log in'}
                    </button>

                    {isLoading && <Loader />}
                </form>

                <div className="mt-4">
                    <p>
                        Don't have an account? {" "}
                        <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}
                            className="text-pink-500 hover:underline">
                        Sign up</Link>
                    </p>
                </div>
            </div>

            <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                alt=""
                className="h-[97vh] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
            />
            
        </section>
    </div>
}

export default Login