import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB.js';
import authRouter from './routes/user.route.js'
// import jobs from  './lib/cron.js'
import cookieParser from 'cookie-parser';


dotenv.config();
const port = 3000
const app = express();


// jobs.start()


// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/auth',authRouter);





// // CONNECTION WITH REDIS
// (async () => {
//   try {
//     await client.set('test', 'Redis is working!');
//     const result = await client.get('test');
//     console.log('Redis test:', result);
//   } catch (err) {
//     console.error('Redis test failed:', err);
//   }
// })();



// CONNECTION WITH MONGODB
app.listen(port, () => {
    
    connectDB();
    console.log(`server running on port ${port}`);
    
    
})


