const express = require('express');
const { getAllBlogs, addBlog, updateBlog } = require('../controllers/blog.controller');
const blogRouter = express.Router();

blogRouter.get('/',getAllBlogs);
blogRouter.post('/add',addBlog);
blogRouter.put('/update/:id',updateBlog);



module.exports = blogRouter;