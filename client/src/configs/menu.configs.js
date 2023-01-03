import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined"
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined"
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined"

const main = [
   {
      diplay: "home",
      path: '/',
      icon: <HomeOutlinedIcon/>,
      state: "home"
   },
   {
      diplay: "movies",
      path: '/movie',
      icon: <SlideshowOutlinedIcon/>,
      state: "movie"
   },
   {
      diplay: "tv series",
      path: '/tv',
      icon: <LiveTvOutlinedIcon/>,
      state: "tv"
   },
   {
      diplay: "search",
      path: '/search',
      icon: <SearchOutlinedIcon/>,
      state: "search"
   }
]

const user = [
   {
      diplay: "favorites",
      path: '/favorites',
      icon: <FavoriteBorderOutlinedIcon/>,
      state: "favorite"
   },
   {
      diplay: "reviews",
      path: '/reviews',
      icon: <RateReviewOutlinedIcon/>,
      state: "review"
   },
   {
      diplay: "password update",
      path: '/password-update',
      icon: <LockResetOutlinedIcon/>,
      state: "password.update"
   }
]

const menuConfigs = { main, user };

export default menuConfigs;