import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      summary: String,
      content: {
        type: String,
        required: true
      },
      image: String, // Thumbnail or banner image
      category: {
        type: String,
        enum:{
          values:['philosophical','historical','textual','scientific'],
          message:'{VALUE} is not supported'
        },
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
}

})

export const Blog = mongoose.model("Blog", blogSchema);
