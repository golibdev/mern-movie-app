const favoriteUtils = {
   check: ({ listFavorites, mediaId }) => listFavorites && listFavorites.find(e => Number(e.mediaId).toString() === Number(mediaId).toString()) !== undefined
}

export default favoriteUtils;