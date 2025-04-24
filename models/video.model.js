import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    youtubeUrl: {
      type: String,
      required: true
    },
    latest:{
        type:String,
        enum:["new","old"]
        
    },
    description: String, // Optional extended content
    thumbnailUrl: String, // For mobile preview
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  export const Video = mongoose.model("Video", VideoSchema);