import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { 
    addToFavorites,
    removeFromFavorites,
    setFavorites 
} from '../../redux/features/favorites/favoriteSlice'
import { 
    addFavoriteToLS,
    getFavoritesFromLS,
    removeFavoriteFromLS 
} from '../../Utils/localStorage'
import { useEffect } from 'react'

const HeartIcon = ({product}) => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites || []);
    const isFavorite = favorites.some((p) => p._id === product._id);

    useEffect(() => {
        const favoritesFromLS = getFavoritesFromLS();
        dispatch(setFavorites(favoritesFromLS));
    }, [])

    const toggleFavorites = () => {
        if(isFavorite) {
            dispatch(removeFromFavorites(product));
            removeFavoriteFromLS(product._id);
        } else {
            dispatch(addToFavorites(product));
            addFavoriteToLS(product);
        }
    }
    
  return (
    <div onClick={toggleFavorites} className='absolute top-4 right-5 scale-125 cursor-pointer hover:scale-150 transition-transform'>
        {isFavorite ? (
            <FaHeart 
                className='text-pink-700' />
            ) : (
            <FaRegHeart 
                className='text-pink-700'/>
            )}
    </div>
  )
}

export default HeartIcon