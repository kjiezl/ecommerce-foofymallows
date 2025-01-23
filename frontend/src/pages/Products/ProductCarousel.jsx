import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import moment from "moment";
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore
} from 'react-icons/fa';

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    
    return (
    <div className="mb-4 xl:block lg:block md:block">
            {isLoading ? null : error ? (
            <Message variant='danger'>
                    {error?.data?.message || error.message}
            </Message>
            ) : <Slider {...settings} className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block rounded-lg p-3">
                {
                    products.map(({ image, _id, name, price, description, brand, createdAt, numReviews, rating, quantity, countInStock }) => (
                        <div key={_id}>
                            <img src={image} alt={name} className="w-full rounded-lg object-cover h-[40rem]" />
                            <div className="flex justify-between w-[15rem]">
                                <div className="one">
                                    <h2 className="mt-[2rem] text-xl font-varela font-bold">{name}</h2>
                                    <p className="text-xl font-bold">$ {price}</p> <br /> <br />
                                    <p className="w-[25rem]">{description.substring(0, 170)}...</p>
                                </div>
                                <div className="flex justify-between w-[20rem]">
                                    <div className="one mt-[2rem] ml-2">
                                        <h1 className="flex items-center mb-6 w-[15rem]">
                                            <FaStore className="mr-2 text-pink-600"/> Brand: {brand}
                                        </h1>
                                        <h1 className="flex items-center mb-6 w-[15rem]">
                                            <FaClock className="mr-2 text-pink-600"/> Added: {moment(createdAt).fromNow()}
                                        </h1>
                                        <h1 className="flex items-center mb-6 w-[15rem]">
                                            <FaStar className="mr-2 text-pink-600"/> Reviews: {numReviews}
                                        </h1>
                                    </div>
                                    <div className="two mt-[2rem] ml-2">
                                        <h1 className="flex items-center mb-6 w-[10rem]">
                                            <FaStar className="mr-2 text-pink-600"/> Ratings: {" "}
                                            {Math.round(rating)}
                                        </h1>
                                        <h1 className="flex items-center mb-6 w-[10rem]">
                                            <FaShoppingCart className="mr-2 text-pink-600"/> Quantity: {" "}
                                            {quantity}
                                        </h1>
                                        <h1 className="flex items-center mb-6 w-[10rem]">
                                            <FaBox className="mr-2 text-pink-600"/> In Stock: {" "}
                                            {countInStock}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Slider>}
        </div>
    );
};

export default ProductCarousel;
