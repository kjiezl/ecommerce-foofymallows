import { Link } from "react-router"
import HeartIcon from "./HeartIcon"

const Product = ({product}) => {
  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative hover:scale-105 transition-transform mb-2">
        <div className="relative">
            <Link to={`/product/${product._id}`}>
            <img src={product.image} alt={product.name} className="w-[30rem] rounded" />
            </Link>
            <HeartIcon product={product} />

        </div>
        <div className="p-6">
            <Link to={`/product/${product._id}`}>
                <h2 className="flex justify-between items-center hover:brightness-125 transition-all">
                    <div className="text-lg font-semibold">{product.name}</div>
                    <span 
                        className="bg-pink-700 text-white text-md font-medium mr-2 px-2.5 py-0.5 rounded-full">
                            $ {product.price}
                    </span>
                </h2>
            </Link>
        </div>
    </div>
  )
}

export default Product