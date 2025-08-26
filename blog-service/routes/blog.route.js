import express from 'express';
import { addBlog, deleteBlog, getAllBlogs, updateBlog,getSingleBlog, healthCheck } from '../controllers/blog.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const blogRouter = express.Router();
blogRouter.use(isAuthenticated)

blogRouter.get('/',getAllBlogs);
blogRouter.post('/',addBlog);
blogRouter.put('/:id',updateBlog);
blogRouter.delete('/:id',deleteBlog);
blogRouter.get('/:id',getSingleBlog);
blogRouter.get('/health', healthCheck);



export default blogRouter;
