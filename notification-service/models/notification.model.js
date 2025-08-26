import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    question:{
        type:String,
        require:true
    },
    response:{
        type:String,
        require:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

export const Chat = mongoose.model("Chat",ChatSchema)