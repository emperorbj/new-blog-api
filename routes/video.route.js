import express from 'express';
import { addVideos, getAllVideos, updateVideos } from '../controllers/video.controller.js';

const router = express.Router();

router.get('/',getAllVideos);
router.post('/',addVideos);
router.put('/:id',updateVideos)

export default router;