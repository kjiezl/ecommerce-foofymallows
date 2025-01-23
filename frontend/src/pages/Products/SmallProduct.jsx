import { Link } from "react-router";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({product}) => {
    return(
        <div className="w-[20rem] ml-[5rem] p-3 mt-2">
            <div className="relative">
                    <div className="p-54 hover:scale-105 transition-transform">
                        <Link to={`/product/${product._id}`}>
                            <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-auto rounded"/>
                        </Link>
                            <HeartIcon product={product} />
                        <Link to={`/product/${product._id}`}>
                            <h2 className="flex justify-between items-center hover:brightness-125 transition-all">
                                <div className="my-4 text-md font-semibold">{product.name}</div>
                                <span className="bg-pink-700 text-white text-md font-medium mr-2 px-2.5 py-0.5 rounded-full">
                                    $ {product.price}
                                </span>
                            </h2>
                        </Link>
                    </div>
            </div>
        </div>
    )
}

export default SmallProduct;