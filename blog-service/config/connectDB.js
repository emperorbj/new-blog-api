import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.BLOG_SERVICE_MONGO_URI)
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(error.message);
        
    }
}