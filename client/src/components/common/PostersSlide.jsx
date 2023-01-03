import { Box } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import tmdbConfigs from '../../api/configs/tmdb.configs';
import AutoSwiper from './AutoSwiper';

const PostersSlide = ({ posters }) => {
   return (
      <AutoSwiper>
         {posters.map((item, index) => (
            <SwiperSlide key={index}>
               <Box sx={{
                  paddingTop: "160%",
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundImage: `url(${tmdbConfigs.posterPath(item.file_path)})`
               }}/>
            </SwiperSlide>
         ))}
      </AutoSwiper>
   )
}

export default PostersSlide