const Blogs = require('../models/blog.model');



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
    const blog = new Blogs({
        title,
        content,
        author,
        image,
        date
    })
    try{
        await blog.save();
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
    return res.status(200).json({blog})
}



module.exports = {
    getAllBlogs,
    addBlog
}