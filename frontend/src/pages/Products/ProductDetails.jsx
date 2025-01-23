import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { 
    useGetProductDetailsQuery,
    useCreateReviewMutation 
} from "../../redux/api/productApiSlice"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { 
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore
} from 'react-icons/fa'
import moment from "moment"
import HeartIcon from "./HeartIcon"
import Ratings from "./Ratings"
import ProductTabs from "./ProductTabs"

const ProductDetails = () => {
    const {id: productId} = useParams();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

    const {userInfo} = useSelector(state => state.auth);

    const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        try{
            await createReview ({
                productId, rating, comment
            }).unwrap();

            refetch();
            toast.success('Review created successfully')
            setComment('');
            setRating(0);
        } catch(err) {
            toast.error(err?.data || err.message)
        }
    }
    
  return (
    <>
    <div className="mt-4 ml-[7rem]">
        <a href="/" className="text-3xl font-semibold text-pink-600 font-varela ">Foofy<span className="text-pink-400">mallows</span></a><br />
    </div>
    <div className="my-5 ml-[20rem]">
        <Link 
            to='/'
            className="text-[#494949] font-semibold hover:underline hover:text-pink-600">
                &lt; Go back
        </Link>
    </div>

    {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.message}</Message>) : (
        <>
            <div className="flex flex-wrap relative items-between mt-[2rem] ml-[20rem]">
                <div>
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-[35rem] object-cover xl:w-[40rem] lg:w-[35rem] md:w-[20rem] sm:w-[10rem] mr-[3rem]" />
                    <HeartIcon product={product}/>
                </div>
                <div className="flex flex-col justify-between">
                    <h2 className="text-3xl font-bold font-varela">{product.name}</h2>
                    <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#494949]">
                        {product.description}
                    </p>

                    <p className="text-5xl my-4 font-extrabold">$ {product.price}</p>

                    <div className="flex items-center justify-between w-[20rem]">
                        <div className="one">
                            <h1 className="flex items-center mb-6 w-[20rem]">
                                <FaStore className="mr-2 text-pink-700"/> Brand: {" "}
                                {product.brand}
                            </h1>
                            <h1 className="flex items-center mb-6 w-[20rem]">
                                <FaClock className="mr-2 text-pink-700"/> Added: {" "}
                                {moment(product.createdAt).fromNow()}
                            </h1>
                            <h1 className="flex items-center mb-6 w-[20rem]">
                                <FaStar className="mr-2 text-pink-700"/> Reviews: {" "}
                                {product.numReviews}
                            </h1>
                        </div>

                        <div className="two">
                            <h1 className="flex items-center mb-6 w-[20rem]">
                                <FaStar className="mr-2 text-pink-700"/> Ratings: {" "}
                                {product.rating}
                            </h1>
                            <h1 className="flex items-center mb-6 w-[20rem]">
                                <FaShoppingCart className="mr-2 text-pink-700"/> Quantity: {" "}
                                {product.quantity}
                            </h1>
                            <h1 className="flex items-center mb-6 w-[20rem]">
                                <FaBox className="mr-2 text-pink-700"/> In Stock: {" "}
                                {product.countInStock}
                            </h1>
                        </div>
                    </div>
                    <div className="flex justify-between flex-wrap">
                        <Ratings 
                            value={product.rating} 
                            text={`${product.numReviews} ${product.numReviews === 1 ? 'review' : 'reviews'}`}/>
                        {product.countInStock > 0 && (
                            <div>
                                <select 
                                    value={qty} 
                                    onChange={e => setQty(e.target.value)}
                                    className="p-2 w-[6rem] rounded-lg text-black bg-white">
                                        {[ ...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                            </div>
                        )}
                    </div>
                    <div className="btn-container">
                        <button 
                            // onClick={addToCartHandler} 
                            disabled={product.countInStock === 0} 
                            className="bg-pink-600 text-white py-2 px-4 text-lg rounded-lg mt-4 md:mt-0 hover:scale-110 hover:bg-pink-800 transition-transform">
                                Add to Cart
                        </button>
                    </div>
                </div>
                <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
                    <ProductTabs 
                        loadingProductReview={loadingProductReview}
                        userInfo={userInfo}
                        submitHandler={submitHandler}
                        rating={rating}
                        setRating={setRating}
                        comment={comment}
                        setComment={setComment}
                        product={product}/>
                </div>
            </div>
        </>
    )}
    </>
  )
}

export default ProductDetails