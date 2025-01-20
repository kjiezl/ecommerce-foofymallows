import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { 
    useCreateCategoryMutation,
    useFetchCategoriesQuery,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation
} from '../../redux/api/categoryApiSlice'
import CategoryForm from '../../components/CategoryForm';
import Modal from '../../components/Modal';

const CategoryList = () => {
    const {data: categories, refetch} = useFetchCategoriesQuery();
    const [name, setName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updatingName, setUpdatingName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleCreateCategory = async(e) => {
        e.preventDefault();

        if(!name){
            toast.error("Category name is required.");
            return;
        }

        try{
            const res = await createCategory({name}).unwrap();
            if(res.error){
                toast.error(res.error)
            } else{
                setName("");
                refetch();
                toast.success(`${res.name} is created successfully.`)
            }
        } catch(err){
            console.error(err);
            toast.error("Failed to create category.")
        }
    }

    const handleUpdateCategory = async(e) => {
        e.preventDefault();

        if(!updatingName){
            toast.error("Category name is required.");
            return;
        }

        try{
            const res = await updateCategory({categoryId: selectedCategory._id, updatedCategory: {name: updatingName}}).unwrap();
            
            if(res.error){
                toast.error(res.error);
            } else {
                toast.success('Category updated.');
                setSelectedCategory(null);
                setUpdatingName('');
                setModalVisible(false);
                refetch();
            }
        } catch(err){
            console.error(err.message);
        }
    }

    const handleDeleteCategory = async () => {
        try{
            const res = await deleteCategory(selectedCategory._id).unwrap();

            if(res.error){
                toast.error(res.error)
            } else {
                toast.success( `${res.name} is removed.`);
                setSelectedCategory(null);
                setModalVisible(false);
                refetch();
            }
        } catch(e){
            console.error(e);
            toast.error("Category deletion failed.")
        }
    }

    return (
        <div className='ml-[10rem] flex flex-col md:flex-row'>
            <div className="md:w-3/4 p-3">
                <div className="h-12 mt-5 font-bold text-3xl mb-4">Manage Categories</div>
                <CategoryForm 
                    value={name}
                    setValue={setName}
                    handleSubmit={handleCreateCategory} />
                    <br />
                    <hr />

                    <div className="flex flex-wrap mt-2">
                        {categories?.map((category) => (
                            <div key={category._id}>
                                <button 
                                    onClick={()=> {
                                        setModalVisible(true);
                                        setSelectedCategory(category)
                                        setUpdatingName(category.name)
                                    }}
                                    className='bg-black border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50'>
                                        {category.name}
                                    </button>
                            </div>
                        ))}
                    </div>
                    <Modal
                        isOpen={modalVisible}
                        onClose={() => setModalVisible(false)}>
                            <CategoryForm 
                                value={updatingName}
                                setValue={value => setUpdatingName(value)}
                                handleSubmit={handleUpdateCategory}
                                buttonText='Update'
                                handleDelete={handleDeleteCategory} 
                                />
                        </Modal>
            </div>
        </div>
    )
}

export default CategoryList