import { useSelector } from "react-redux"


const FavoritesCount = () => {
    const favorites = useSelector(state => state.favorites);
    const favoriteCount = favorites.length;
    
  return (
    <div className="absolute left-4 bottom-[-0.5rem]">
        {favoriteCount > 0 && (
            <span className="px-1.5 py-0 text-sm text-white bg-pink-600 rounded-full">
                {favoriteCount}
            </span>
        )}
    </div>
  )
}

export default FavoritesCount