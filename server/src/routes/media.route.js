import express from 'express';
import mediaController from '../controllers/media.controller.js';

const router = express.Router();

router.get("/:mediaType/search", mediaController.search);

router.get("/:mediaType/genres", mediaController.getGenres);

router.get("/:mediaType/detail/:mediaId", mediaController.getDetail);

router.get("/:mediaType/:mediaCategory", mediaController.getList);

export default router;