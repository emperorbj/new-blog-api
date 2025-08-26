import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 8080;

app.use(cors());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Proxy routes
app.use(
    '/api/auth',
    createProxyMiddleware({
        target: process.env.USER_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: { '^/api/auth': '/api/auth' }
    })
);

app.use(
    '/api/blogs',
    createProxyMiddleware({
        target: process.env.BLOG_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: { '^/api/blogs': '/api/blogs' }
    })
);

app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});