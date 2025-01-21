import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUploadProductImageMutation 
} from '../../redux/api/productApiSlice'
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'
import AdminMenu from './AdminMenu'

const ProductUpdate = () => {
    const params = useParams();

    const {data: productData} = useGetProductByIdQuery(params._id);

    const [image, setImage] = useState(productData?.image || '');
    const [name, setName] = useState(productData?.name || '');
    const [description, setDescription] = useState(productData?.description || '');
    const [price, setPrice] = useState(productData?.price || '');
    const [category, setCategory] = useState(productData?.category || '');
    const [brand, setBrand] = useState(productData?.brand || '');
    const [stock, setStock] = useState(productData?.countInStock || '');
    const [quantity, setQuantity] = useState(productData?.quantity || '');

    const navigate = useNavigate();

    const {data: categories = []} = useFetchCategoriesQuery();
    const [uploadProductImage] = useUploadProductImageMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        if(productData && productData._id){
            setName(productData.name);
            setDescription(productData.description);
            setPrice(productData.price);
            setCategory(productData.category);
            setBrand(productData.brand);
            setStock(productData.countInStock);
            setImage(productData.image);
            setQuantity(productData.quantity);
        }
    }, [productData])

    const uploadFileHandler = async (e) => {
        const formData = new FormData();

        formData.append('image', e.target.files[0]);
        try{
            const res = await uploadProductImage(formData).unwrap();
            toast.success('Image uploaded successfully');
            setImage(res.image);
        } catch(e){
            toast.error(e?.data?.message || e.error);
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("quantity", quantity);
            formData.append("brand", brand);
            formData.append("countInStock", stock);
      
            const { data } = await updateProduct({productId: params._id, formData});
      
            if (data.error) {
                console.error(data.error);
                toast.error(data.error);
            } else {
                toast.success('Product updated successfully');
                navigate("/admin/allproductslist", { state: { refresh: true }});
            }
          } catch (error) {
                console.error(error);
                toast.error("Product update failed");
          }
    };

    const handleDelete = async () => {
        try {
            let answer = window.confirm("Are you sure you want to delete this product?");

            if(!answer) return;

            const {data} = await deleteProduct(params._id);
            toast.success(`${data.name} is deleted successfully`);
            navigate("/admin/allproductslist", { state: { refresh: true }});
        } catch(e) {
            console.log(e);
            toast.error(e?.data?.message || e.error);
        }
    }
    
  return (
    <div className='container xl:mx-[9rem] sm:mx-[0]'>
        <div className="flex flex-col md:flex-row">
            <AdminMenu />
            <div className="md:w-3/4 p-3">
                <div className="h-12 font-bold *:text-white text-3xl my-5">Update Product</div>
                {image && (
                    <div className="text-center mb-4">
                        <img 
                            src={image} 
                            alt='product' 
                            className='block mx-auto  max-h-[200px]' />
                    </div>
                )}
                <div className="mb-3">
                    <label className='border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11'>
                        {image ? image.name: "Upload Image: "}
                        <input
                            type='file'
                            name='image'
                            accept='image/'
                            onChange={uploadFileHandler}
                            className={!image ? 'text-white ml-5' : 'hidden'} />
                    </label>
                </div>

                <div className="p-3">
                    <div className="flex flex-wrap justify-between">
                        <div className="one">
                            <label htmlFor='name' className='mt-4'>Name</label> <br />
                            <input 
                                type='text' 
                                className='mt-4 p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white' 
                                value={name}
                                onChange={e => setName(e.target.value)}></input>
                        </div>
                        <div className="two ml-[5.3rem]">
                            <label htmlFor='name block' className='mt-4'>Price</label> <br />
                            <input 
                                type='number' 
                                className='mt-4 p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white' 
                                value={price}
                                onChange={e => setPrice(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        <div className="one">
                            <label htmlFor='name block' className='mt-4'>Quantity</label> <br />
                            <input 
                                type='number' 
                                className='mt-4 p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white' 
                                value={quantity}
                                onChange={e => setQuantity(e.target.value)}></input>
                        </div>
                        <div className="two ml-[5.3rem]">
                            <label htmlFor='name block' className='mt-4'>Brand</label> <br />
                            <input 
                                type='text' 
                                className='mt-4 p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white' 
                                value={brand}
                                onChange={e => setBrand(e.target.value)}></input>
                        </div>
                    </div>

                    <label className='my-5'>Description</label>
                    <textarea
                        type="text"
                        className='mt-4 p-2 mb-3 bg-[#101011] border rounded-lg w-full text-white'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}>
                    </textarea>

                    <div className="flex justify-between">
                        <div>
                            <label htmlFor='name block'>Count in Stock</label> <br />
                            <input 
                                type='text'
                                className='mt-4 p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white'
                                value={stock}
                                onChange={e => setStock(e.target.value)}
                                >
                            </input>
                        </div>

                        <div>
                            <label htmlFor=''>Category</label> <br />
                            <select 
                                placeholder='Select Category'
                                className='mt-4 p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white'
                                onChange={e => setCategory(e.target.value)}>
                                    {categories?.map((category) => (
                                        <option 
                                            key={category._id} 
                                            value={category._id}>
                                                {category.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <button 
                            onClick={handleSubmit}
                            className='py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 mr-6'>
                                Update
                        </button>
                        <button 
                            onClick={handleDelete}
                            className='py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-red-600'>
                                Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductUpdate