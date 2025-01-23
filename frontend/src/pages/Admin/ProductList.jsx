import { useState } from 'react';
import { useNavigate } from 'react-router'; 
import { 
    useCreateProductMutation, 
    useUploadProductImageMutation,  
} from '../../redux/api/productApiSlice';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice';
import { toast } from 'react-toastify';
import { set } from 'mongoose';
import AdminMenu from './AdminMenu';

const ProductList = () => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [brand, setBrand] = useState("");
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const { data: categories } = useFetchCategoriesQuery();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append("image", image);
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("quantity", quantity);
            productData.append("brand", brand);
            productData.append("countInStock", stock);
      
            const { data } = await createProduct(productData);
      
            if (data.error) {
                console.error(data.error);
                toast.error("Product creation failed");
            } else {
                toast.success(`${data.name} is created`);
                navigate("/");
            }
          } catch (error) {
                console.error(error);
                toast.error("Product creation failed");
          }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
    
        try {
          const res = await uploadProductImage(formData).unwrap();
          toast.success(res.message);
          setImage(res.image);
          setImageUrl(res.image);
        } catch (error) {
          toast.error(error?.data?.message || error.error);
        }
    };
    
  return (
    <div className='container xl:mx-[9rem] sm:mx-[0]'>
        <div className="flex flex-col md:flex-row">
            <AdminMenu />
            <div className="md:w-3/4 p-3">
                <div className="h-12 font-bold text-pink-800 text-2xl my-5">Create Product</div>
                {imageUrl && (
                    <div className="text-center mb-4">
                        <img 
                            src={imageUrl} 
                            alt='product' 
                            className='block mx-auto max-h-[200px]' />
                    </div>
                )}
                <div className="mb-3">
                    <label className='border-black shadow-xl text-pink-800 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11'>
                        {image ? image.name: "Upload Image: "}
                        <input
                            type='file'
                            name='image'
                            accept='image/'
                            onChange={uploadFileHandler}
                            className={!image ? 'text-pink-800 ml-5' : 'hidden'} />
                    </label>
                </div>

                <div className="p-3">
                    <div className="flex flex-wrap justify-between">
                        <div className="one">
                            <label htmlFor='name' className='mt-4'>Name</label> <br />
                            <input 
                                type='text' 
                                className='mt-4 p-4 mb-3 w-[30rem] border rounded-lg bg-white text-slate-800' 
                                value={name}
                                onChange={e => setName(e.target.value)}></input>
                        </div>
                        <div className="two ml-[5.3rem]">
                            <label htmlFor='name block' className='mt-4'>Price</label> <br />
                            <input 
                                type='number' 
                                className='mt-4 p-4 mb-3 w-[30rem] border rounded-lg bg-white text-slate-800' 
                                value={price}
                                onChange={e => setPrice(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        <div className="one">
                            <label htmlFor='name block' className='mt-4'>Quantity</label> <br />
                            <input 
                                type='number' 
                                className='mt-4 p-4 mb-3 w-[30rem] border rounded-lg bg-white text-slate-800' 
                                value={quantity}
                                onChange={e => setQuantity(e.target.value)}></input>
                        </div>
                        <div className="two ml-[5.3rem]">
                            <label htmlFor='name block' className='mt-4'>Brand</label> <br />
                            <input 
                                type='text' 
                                className='mt-4 p-4 mb-3 w-[30rem] border rounded-lg bg-white text-slate-800' 
                                value={brand}
                                onChange={e => setBrand(e.target.value)}></input>
                        </div>
                    </div>

                    <label className='my-5'>Description</label>
                    <textarea
                        type="text"
                        className='mt-4 p-2 mb-3 bg-white border rounded-lg w-full text-slate-800'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}>
                    </textarea>

                    <div className="flex justify-between">
                        <div>
                            <label htmlFor='name block'>Count in Stock</label> <br />
                            <input 
                                type='text'
                                className='mt-4 p-4 mb-3 w-[30rem] border rounded-lg bg-white text-slate-800'
                                value={stock}
                                onChange={e => setStock(e.target.value)}
                                >
                            </input>
                        </div>

                        <div>
                            <label htmlFor=''>Category</label> <br />
                            <select 
                                placeholder='Select Category'
                                className='mt-4 p-4 mb-3 w-[30rem] border rounded-lg bg-white text-slate-800'
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
                    <button 
                        onClick={handleSubmit}
                        className='py-4 px-10 mt-5 rounded-lg text-lg font-bold text-white bg-pink-600'>
                            Create
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductList