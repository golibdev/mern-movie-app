const mediaType = {
   movie: "movie",
   tv: "tv"
}

const mediaCategory = {
   popular: "popular",
   topRated: "top_rated" 
}

const backDropPath = (imgEndpoint) => `https://image.tmdb.org/t/p/original${imgEndpoint}`;

const posterPath = (imgEndpoint) => `https://image.tmdb.org/t/p/w500${imgEndpoint}`;

const youtubePath = (videoId) => `https://www.youtube.com/embed/${videoId}?controls=0`;

const tmdbConfigs = {
   mediaType,
   mediaCategory,
   backDropPath,
   posterPath,
   youtubePath
}

export default tmdbConfigs;