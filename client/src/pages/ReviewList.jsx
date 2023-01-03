import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import Container from '../components/common/Container';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import uiConfigs from '../configs/ui.configs';
import tmdbConfigs from '../api/configs/tmdb.configs';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import reviewApi from '../api/modules/review.api';
import { routesGen } from '../routes/routes';

const ReviewItem = ({ review, onRemoved }) => {
   const [onRequest, setOnRequest] = useState(false);

   const onRemove = async () => {
      if (onRequest) return
      setOnRequest(true)
      const { response, err } = await reviewApi.remove({ reviewId: review.id });
      setOnRequest(false)

      if (err) toast.error(err.message);
      if (response) {
         toast.success("Remove review success")
         onRemoved(review.id);
      }
   };

   return (
      <Box sx={{
         position: "relative",
         display: "flex",
         flexDirection: { xs: "column", md: "row" },
         padding: 1,
         opacity: onRequest ? 0.6 : 1,
         "&:hover": { backgroundColor: "backgroud.paper" }
      }}>
         <Box sx={{ width: { xs: 0, md: "10%" } }}>
            <Link
               to={routesGen.mediaDetail(review.mediaType, review.mediaId)}
               style={{ color: "unset", textDecoration: "none" }}
            >
               <Box sx={{
                  paddingTop: "160%",
                  ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(review.mediaPoster))
               }}/>
            </Link>
         </Box>

         <Box sx={{
            width: { xs: "100%", md: "80%" },
            padding: { xs: 0, md: "0 2rem" }
         }}>
            <Stack spacing={1}>
               <Link
                  to={routesGen.mediaDetail(review.mediaType, review.mediaId)}
                  style={{ color: "unset", textDecoration: "none" }}
               >
                  <Typography
                     variant='h6'
                     sx={{ ...uiConfigs.style.typoLines(1, "left") }}
                  >
                     {review.mediaTitle}
                  </Typography>
               </Link>
               <Typography variant='caption'>
                  {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
               </Typography>
               <Typography>{review.content}</Typography>
            </Stack>
         </Box>
         <LoadingButton
            variant='contained'
            sx={{
               position: { xs: "relative", md: "absolute" },
               right: { xs: 0, md: "10px" },
               marginTop: { xs: 2, md: 0 },
               width: "max-content"
            }}
            startIcon={<DeleteIcon/>}
            loadingPosition="start"
            loading={onRequest}
            onClick={onRemove}
         >
            remove
         </LoadingButton>
      </Box>
   )
}

const ReviewList = () => {
   const [reviews, setReviews] = useState([]);
   const [filtredReviews, setFiltredReviews] = useState([]);
   const [page, setPage] = useState(1);
   const [count, setCount] = useState(0)

   const dispatch = useDispatch();

   const skip = 8;

   useEffect(() => {
      const getReviews = async () => {
         dispatch(setGlobalLoading(true));
         const { response, err } = await reviewApi.getList();
         dispatch(setGlobalLoading(false));

         if (err) toast.error(err.message);
         if (response) {
            setCount(response.length)
            setReviews([...response])
            setFiltredReviews([...response].splice(0, skip));
         }
      }

      getReviews()
   }, [dispatch])

   const onLoadMore = () => {
      setFiltredReviews([...filtredReviews, ...[...reviews].splice((page * skip), skip)]);
      setPage(page + 1);
   }

   const onRemoved = (id) => {
      const newReviews = [...reviews].filter(e => e.id !== id);
      setReviews(newReviews);
      setFiltredReviews([...newReviews].splice(0, page * skip));
      setCount(count - 1);
   }
   return (
      <Box sx={{...uiConfigs.style.mainContent}}>
         <Container header={`your review (${count})`}>
            <Stack spacing={2}>
               {filtredReviews.map(item => (
                  <Box key={item.id}>
                     <ReviewItem review={item} onRemoved={onRemoved}/>
                     <Divider sx={{
                        display: { xs: "block", md: "none" }
                     }}/>
                  </Box>
               ))}
               {filtredReviews.length < reviews.length && (
                  <Button onClick={onLoadMore}>load more</Button>
               )}
            </Stack>
         </Container>
      </Box>
   )
}

export default ReviewList