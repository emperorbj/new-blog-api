import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB.js';
import authRouter from './routes/user.route.js'
import blogRouter from './routes/blog.route.js';
import videoRouter from './routes/video.route.js'
import jobs from  './lib/cron.js'
import chatRouter from './routes/chat.route.js';


dotenv.config();
const port = 3000
const app = express();


jobs.start()


// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth',authRouter);
app.use('/api/blogs',blogRouter);
app.use('/api/videos',videoRouter)
app.use('/api/chat',chatRouter);

// CONNECTION WITH MONGODB

app.listen(port, () => {
    
    connectDB();
    console.log(`server running on port ${port}`);
    
    
})


