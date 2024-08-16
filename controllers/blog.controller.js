const Blogs = require('../models/blog.model');
const User = require('../models/users.model');
const mongoose = require('mongoose');



const getAllBlogs = async (req,res,next) => {
    try{
        const blogs = await Blogs.find({});
        if(!blogs){
            return res.status(404).json({message: "No blogs found"})
        }
        res.status(200).json({blogs})
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }

}



const addBlog = async (req,res,next) => {
    const {title, content, author, image, date} = req.body;

    try{
        const existingUser = await User.findById(author);
        if(!existingUser){
            return res.status(404).json({message: "User not found"})
        }
        const blog = new Blogs({
            title,
            content,
            author,
            image,
            date
        }) 

        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session})
        await session.commitTransaction();
        return res.status(200).json({blog})
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }

    // try{
        
    // }
    // catch(error){
    //     res.status(500).json({ message: error.message })
    // }
    // return res.status(200).json({blog})
}




const updateBlog = async (req,res,next) => {
    const {title, content} = req.body;
    const blogId = req.params.id;
    try{
        const blog = await Blogs.findByIdAndUpdate(blogId,{
            title,
            content
        })

        if(!blog){
            return res.status(404).json({message: "Blog not found"})
        }
        return res.status(200).json({blog})
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
}



const getBlogById = async (req,res,next) => {
    const blogId = req.params.id;
    try{
        const blog = await Blogs.findById(blogId);
        if(!blog){
            return res.status(404).json({message: "Blog not found"})
        }
        return res.status(200).json({blog})
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
}



const deleteBlogById = async (req,res,next) => {
    const blogId = req.params.id;
    try{
        const blog = await Blogs.findByIdAndDelete(blogId).populate('author');
        await blog.author.blogs.pull(blog);
        await blog.author.save(); 
        if(!blog){
            return res.status(404).json({message: "Blog not found"})
        }
        return res.status(200).json({message: "successfully deleted blog"})
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
}

const getBlogByUserId = async (req,res,next) => {
    const userId = req.params.id;
    try{
        const userBlogs = await User.findById(userId).populate('blogs');
        if(!userBlogs){
            return res.status(404).json({message: "Blog by user not found"})
        }
        return res.status(200).json({blogs: userBlogs})

    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
}


module.exports = {
    getAllBlogs,
    addBlog,
    updateBlog,
    getBlogById,
    deleteBlogById,
    getBlogByUserId
}