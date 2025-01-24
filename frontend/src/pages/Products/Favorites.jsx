import { useSelector } from "react-redux"
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice"
import Product from "./Product"

const Favorites = () => {
    const favorites = useSelector(selectFavoriteProduct);

    
  return (
    <>
        <div className="mt-4 ml-[7rem]">
            <a href="/" className="text-3xl font-semibold text-pink-600 font-varela ">Foofy<span className="text-pink-400">mallows</span></a><br />
        </div>
        <div className="ml-[10rem]">
            <h1 className="text-4xl my-6 font-varela font-bold ml-[3rem] mt-[4rem]">
                Favorite Foofies
            </h1>

            <div className="flex flex-wrap">
                {favorites.map((product) => (
                    <Product key={product._id} product={product}/>
                ))}
            </div>
        </div>
    </>
  )
}

export default Favorites