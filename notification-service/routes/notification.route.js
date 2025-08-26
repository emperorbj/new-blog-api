import express from 'express'
import { getChatHistory, sendChat } from '../controllers/chat.controller.js';


const chatRouter = express.Router()

chatRouter.post('/',sendChat)
chatRouter.get('/history/:id',getChatHistory)

export default chatRouter;