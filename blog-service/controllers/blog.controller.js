
import { Blog } from "../models/blog.model.js";
// import client from "../lib/redis.js";



// async function invalidateUserCaches(userId) {
//   try {
//     const listKeys = await client.keys(`blogs:${userId}:*`);
//     if (listKeys.length > 0) {
//       await client.del(listKeys);
//       console.log('Invalidated list caches:', listKeys);
//     }
//   } catch (err) {
//     console.error('Cache invalidation error:', err);
//   }
// }

export const healthCheck = async (request, response) => {
  return response.status(200).json({ message: "Blog service is healthy" });
}

export const addBlog = async (request,response)=>{
    const {title,content,category} = request.body
   


    try {
        if(!title || !content || !category){
            return response.status(409).json({message:"All fields are required"})
        }

        const blog = new Blog({
            title,
            content,
            category,
            user:request.user
        })

        await blog.save()
        // await invalidateUserCaches(request.user);
        return response.status(201).json({success:true ,blog})
    } catch (error) {
        return response.status(500).json({message:"something went wrong",error:error.message})
    }
}


export const getAllBlogs = async (request,response)=>{
    const {search,title,category, page=1,limit=5} = request.query
      const userId = request.user;

//     // Normalize query params for cache key
//   const normalizedSearch = search || '';
//   const normalizedTitle = title || '';
//   const normalizedCategory = category || '';
//   const queryParams = [normalizedSearch, normalizedTitle, normalizedCategory].sort().join(':');
//   const cacheKey = `blogs:${userId}:${page}:${limit}:${queryParams}`;
    try{


    //     const cachedData = await client.get(cacheKey);
    // if (cachedData) {
    //   console.log('Serving from cache:', cacheKey);
    //   return response.status(200).json(JSON.parse(cachedData));
    // }

        const queryObject = {user:request.user}
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
            queryObject.category = {$regex: category,$options:'i'}
        }

        const skip = (parseInt(page)-1)*parseInt(limit)

        const blogs = await Blog.find(queryObject)
        .skip(skip)
        .limit(parseInt(limit))
        .sort({createdAt: -1})
        .populate('user','name email')

        if(blogs.length === 0 ) {
            return response.status(404).json({message:"No book was found"})
        }

        
        const totalBlogs = await Blog.countDocuments(queryObject)
        const totalPages = Math.ceil(totalBlogs/parseInt(limit))

        const data = {
      success: true,
      totalPages,
      currentPage: parseInt(page),
      blogs,
    };

    // Cache the data (5-minute TTL)
    // await client.set(cacheKey, JSON.stringify(data), { EX: 300 });
    // console.log('Cached data for:', cacheKey);

    return response.status(200).json(data);

        // return response.status(200).json({
        //     success:true,
        //     totalPages,
        //     currentPage:parseInt(page),
        //     blogs
        // })
    }catch(error){
        return response.status(500).json({message:"something went wrong",error:error.message})
    }
}



export const updateBlog = async (request,response)=> {
    const id = request.params.id
    try{
        const blog = await Blog.findByIdAndUpdate({_id:id,user:request.user},{$set:request.body},{new:true})
        .populate('user','name email')

        if(!blog){
            return response.status(404).json({message:"blog not found"})
        }

        // await invalidateUserCaches(request.user);

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
        const blog = await Blog.findByIdAndDelete({_id:id,user:request.user})

        if(!blog){
            return response.status(404).json({message:"blog not found to be deleted"})
        }

        // await invalidateUserCaches(request.user);
        return response.status(200).json({message:"blog deleted successfully"})
    }catch(error){
        return response.status(500).json({message:"something went wrong",error:error.message})
    }
}

export const getSingleBlog = async (request,response)=>{
    const id = request.params.id
    try{
        const blog = await Blog.findById({_id:id,user:request.user}).populate('user','name email')

        if(!blog){
            return response.status(404).json({message:"blog not found"})
        }

        return response.status(200).json({message:"success",blog:blog})
    }catch(error){
        return response.status(500).json({message:"something went wrong",error:error.message})
    }
}
