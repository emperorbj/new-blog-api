
import { Blog } from "../models/blog.model.js";


export const addBlog = async (request,response)=>{
    const {title,summary,content,image,category} = request.body
    try {
        if(!title || !summary || !content || !image || !category){
            return response.status(409).json({message:"All fields are required"})
        }

        const blog = new Blog({
            title,
            summary,
            content,
            image,
            category
        })

        await blog.save()
        return response.status(201).json({success:true ,blog:blog})
    } catch (error) {
        return response.status(500).json({message:"something went wrong",error:error.message})
    }
}


export const getAllBlogs = async (request,response)=>{
    const {search,title,category, page=1,limit=5} = request.query
    try{
        const queryObject = {}
        if(search){
            queryObject.$or = [
                {title:{ $regex:search , $options:'i' }},
                {category: {$regex: search, $options:'i'}}
            ]
        }

        if(title){
            queryObject.title = {$regex: title,$options:'i'}
        }

        if(category){
            queryObject.title = {$regex: category,$options:'i'}
        }

        const skip = (parseInt(page)-1)*parseInt(limit)

        const blogs = await Blog.find(queryObject)
        .skip(skip)
        .limit(parseInt(limit))
        .sort({createdAt: -1})

        if(blogs.length === 0 ) {
            return response.status(404).json({message:"No book was found"})
        }

        
        const totalBlogs = await Blog.countDocuments(queryObject)
        const totalPages = Math.ceil(totalBlogs/parseInt(limit))

        return response.status(200).json({
            success:true,
            totalPages,
            currentPage:parseInt(page),
            blogs
        })
    }catch(error){
        return response.status(500).json({message:"something went wrong",error:error.message})
    }
}



export const updateBlog = async (request,response)=> {
    const id = request.params.id
    try{
        const blog = await Blog.findByIdAndUpdate(id,{$set:request.body},{new:true})

        if(!blog){
            return response.status(404).json({message:"blog not found"})
        }

        return response.status(200).json({
            success:true,
            blog:blog
        })
    }catch(error){
        return response.status(500).json({message:"something went wrong",error:error.message})
    }
}

export const deleteBlog = async (request,response)=>{
    const id = request.params.id
    try{
        const blog = await Blog.findByIdAndDelete(id)

        if(!blog){
            return response.status(404).json({message:"blog not found to be deleted"})
        }

        return response.status(200).json({message:"blog deleted successfully"})
    }catch(error){
        return response.status(500).json({message:"something went wrong",error:error.message})
    }
}