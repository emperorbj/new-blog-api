import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      category: {
        type: String,
        enum:{
          values:['philosophical','historical','textual','scientific'],
          message:'{VALUE} is not supported'
        },
        required: true
      },
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
}

})

export const Blog = mongoose.model("Blog", blogSchema);
