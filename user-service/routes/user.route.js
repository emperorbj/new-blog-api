import express from 'express';
import { healthCheck, login, signup } from '../controllers/users.controller.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login)
router.get('/health', healthCheck)

export default router;