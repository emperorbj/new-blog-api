const express = require('express');
const { getAllBlogs, addBlog } = require('../controllers/blog.controller');
const blogRouter = express.Router();

blogRouter.get('/',getAllBlogs);
blogRouter.post('/add',addBlog);



module.exports = blogRouter;