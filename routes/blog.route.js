import express from 'express';
import { addBlog, deleteBlog, getAllBlogs, updateBlog,getSingleBlog } from '../controllers/blog.controller.js';

const blogRouter = express.Router();

blogRouter.get('/',getAllBlogs);
blogRouter.post('/',addBlog);
blogRouter.put('/:id',updateBlog);
blogRouter.delete('/:id',deleteBlog);
blogRouter.get('/:id',getSingleBlog);



export default blogRouter;
