import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB.js';
import authRouter from './routes/user.route.js'
import blogRouter from './routes/blog.route.js';
import videoRouter from './routes/video.route.js'
import jobs from  './lib/cron.js'


dotenv.config();
const port = 3000
const app = express();
// const router = require('./routes/user.route');
// const blogRouter = require('./routes/blog.route');

jobs.start()


// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth',authRouter);
app.use('/api/blogs',blogRouter);
app.use('/api/videos',videoRouter)

// CONNECTION WITH MONGODB

app.listen(port, () => {
    
    connectDB();
    console.log(`server running on port ${port}`);
    
    
})


