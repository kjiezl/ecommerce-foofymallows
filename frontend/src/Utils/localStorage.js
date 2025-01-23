export const addFavoriteToLS = (product) => {
    const favorites = getFavoritesFromLS();

    if(!favorites.some((p) => p._id === product._id)) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}


export const removeFavoriteFromLS = (productId) => {
    const favorites = getFavoritesFromLS();

    const updateFavorites = favorites.filter((product) => product._id !== productId);

    localStorage.setItem('favorites', JSON.stringify(updateFavorites));
}

export const getFavoritesFromLS = () => {
    const favoritesJSON = localStorage.getItem('favorites');
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
}