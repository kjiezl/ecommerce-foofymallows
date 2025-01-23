import { useEffect, useState } from "react"
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa"
import Loader from "../../components/Loader"
import { toast } from "react-toastify"
import { useGetUsersQuery,
        useDeleteUserMutation,
        useUpdateUserMutation,} from "../../redux/api/usersApiSlice"
import Message from "../../components/Message"
import AdminMenu from "./AdminMenu"

const UserList = () => {
    const {data: users, refetch, isLoading, error} = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [updateUser] = useUpdateUserMutation();

    const [editableUserId, setEditableUserId] = useState(null);
    const [editableName, setEditableName] = useState('');
    const [editableEmail, setEditableEmail] = useState('');

    useEffect(() => {
        refetch();
    }, [refetch]);

    const deleteHandler = async (id) => {
        if(window.confirm('Are you sure?')) {
            try {
                await deleteUser(id);
                refetch();
                toast.success('User deleted successfully');
            } catch (error) {
                toast.error(error?.data.message || error.message);
            }
        }
    }

    const toggleEdit = (id, name, email) => {
        setEditableUserId(id);
        setEditableName(name);
        setEditableEmail(email);
    }

    const updateHandler = async (id) => {
        try {
            await updateUser({
                id,
                username: editableName, 
                email: editableEmail
            });
            refetch();
            toast.success('User updated successfully');
            setEditableUserId(null);
        } catch (error) {
            toast.error(error?.data.message || error.message);
        }
    }

  return <div className="p-4">
    <h1 className="text-3xl font-bold ml-[10rem] my-[2rem]">Manage Users</h1>
    {isLoading ? (<Loader />) 
    : error ? ( <Message variant='danger'>{error?.data.message || error.message}</Message>)
    : (
        <div className="flex flex-col md:flex-row mt-10">
            <AdminMenu />
            <table className="w-full md:w-4/5 mx-auto">
                <thead>
                    <tr>
                        <th className="bg-gray-300 px-4 p-2 text-left">ID</th>
                        <th className="bg-gray-300 px-4 p-2 text-left">NAME</th>
                        <th className="bg-gray-300 px-4 p-2 text-left">EMAIL</th>
                        <th className="bg-gray-300 px-4 p-2 text-left">ADMIN</th>
                        <th className="bg-gray-300 px-4 p-2 text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="px-4 py-2">{user._id}</td>
                            <td className="px-4 py-2">
                                {editableUserId === user._id ? (
                                    <div className="flex items-center">
                                        <input 
                                            type="text"
                                            value={editableName}
                                            onChange={(e) => setEditableName(e.target.value)}
                                            className="w-full p-2 border rounded-lg bg-white text-slate-800"/>
                                            <button onClick={() => updateHandler(user._id)}
                                                className="ml-2 bg-blue-500 py-2 px-4 rounded-lg text-white hover:scale-105 transition-transform">
                                                <FaCheck />
                                            </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        {user.username} {" "}
                                        <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                            <FaEdit className="ml-[1rem]"/>
                                        </button>
                                    </div>
                                )}
                            </td>
                            <td className="px-4 py-2">
                                {editableUserId === user._id ? (
                                    <div className="flex items-center">
                                        <input 
                                            type="text"
                                            value={editableEmail}
                                            onChange={(e) => setEditableEmail(e.target.value)}
                                            className="w-full p-2 border rounded-lg bg-white text-slate-800"/>
                                            <button onClick={() => updateHandler(user._id)}
                                                className="ml-2 bg-blue-500 py-2 px-4 rounded-lg text-white hover:scale-105 transition-transform">
                                                <FaCheck />
                                            </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <p>{user.email}</p>
                                        <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                            <FaEdit className="ml-[1rem]"/>
                                        </button>
                                    </div>
                                )}
                            </td>
                            <td className="px-4 py-2">
                                {user.isAdmin ? (
                                    <FaCheck className="text-green-500"/>
                                ) : (
                                    <FaTimes className="text-red-500"/>
                                )}
                            </td>
                            <td className="px-4 py-2">
                                {!user.isAdmin && (
                                    // <button onClick={() => deleteHandler(user._id)}>
                                    //     <FaTrash className="text-red-500 hover:text-red-700 transition-transform hover:scale-110"/>
                                    // </button>
                                    <button onClick={() => deleteHandler(user._id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-2 rounded transition-transform hover:scale-110">
                                        <FaTrash />
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )}
  </div>
}

export default UserList