const express = require('express');
const { getAllBlogs, addBlog, updateBlog, getBlogById, deleteBlogById, getBlogByUserId } = require('../controllers/blog.controller');
const blogRouter = express.Router();

blogRouter.get('/',getAllBlogs);
blogRouter.post('/add',addBlog);
blogRouter.put('/update/:id',updateBlog);
blogRouter.get('/:id',getBlogById);
blogRouter.delete('/:id',deleteBlogById);
blogRouter.get('/user/:id',getBlogByUserId)


module.exports = blogRouter;