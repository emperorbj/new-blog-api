Christian Apologetics Mobile App Backend
Overview
This project is the backend for a Christian Apologetics mobile application, built using Node.js, Express.js, MongoDB, and integrated with Google Gemini AI for generating biblically grounded responses to theological questions. The backend provides APIs for user authentication, blog management, video management, and a chat feature powered by Gemini AI for answering apologetics-related questions.
Features

User Authentication: Secure signup and login with JWT-based authentication and password hashing using bcryptjs.
Blog Management: Create, read, update, and delete (CRUD) blog posts with search and pagination functionality.
Video Management: Add, retrieve, and update video content (e.g., YouTube links) with search and pagination support.
AI-Powered Chat: Users can ask theological questions, and the backend uses Google Gemini AI to provide clear, respectful, and biblically grounded answers in Markdown format.
Chat History: Stores and retrieves user-specific chat history for theological queries.

Tech Stack

Node.js: JavaScript runtime for server-side development.
Express.js: Web framework for building RESTful APIs.
MongoDB: NoSQL database for storing user, blog, video, and chat data.
Mongoose: ODM for MongoDB to manage data models and schemas.
Google Gemini AI: AI model (gemini-1.5-flash) for generating apologetics responses.
bcryptjs: Library for hashing passwords.
JWT: JSON Web Tokens for secure user authentication.

Installation

Clone the Repository:
git clone https://github.com/emperorbj/socialapi.git
cd socialapi


Install Dependencies:
npm install


Set Up Environment Variables:Create a .env file in the root directory and add the following:
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
JWT_SECRET=your_jwt_secret_key


Run the Application:
npm start

The server will run on http://localhost:3000 (or your specified port).


API Endpoints
Authentication

POST /signup: Register a new user.
Request Body: { name, email, phone, password }
Response: { success, token, user }


POST /login: Authenticate a user.
Request Body: { email, password }
Response: { success, token, user }



Blogs

POST /blogs: Create a new blog post.
Request Body: { title, summary, content, image, category }
Response: { success, blog }


GET /blogs: Retrieve all blogs with optional search, title, category filters, and pagination.
Query Params: search, title, category, page, limit
Response: { success, totalPages, currentPage, blogs }


PUT /blogs/:id: Update a blog post by ID.
Request Body: Fields to update
Response: { success, blog }


DELETE /blogs/:id: Delete a blog post by ID.
Response: { message }


GET /blogs/:id: Retrieve a single blog post by ID.
Response: { message, blog }



Videos

POST /videos: Add a new video.
Request Body: { title, youtubeUrl, latest, description, thumbnailUrl }
Response: { message }


GET /videos: Retrieve all videos with optional search, title, latest filters, and pagination.
Query Params: search, title, latest, page, limit
Response: { success, totalPage, videos }


PUT /videos/:id: Update a video by ID.
Request Body: Fields to update
Response: { success, video }



Chat

POST /chat: Send a theological question to Gemini AI.
Request Body: { userId, question }
Response: { answer }


GET /chat/:userId: Retrieve chat history for a specific user.
Response: Array of chat objects



Database Models

User: Stores user information (name, email, phone, password, profileImage, createdAt).
Blog: Stores blog post details (title, summary, content, image, category, createdAt).
Video: Stores video details (title, youtubeUrl, latest, description, thumbnailUrl, createdAt).
Chat: Stores chat interactions (userId, question, response, timestamp).

Error Handling

400 Bad Request: Invalid input or missing fields.
401 Unauthorized: Missing or invalid credentials.
404 Not Found: Resource (blog, video, user) not found.
409 Conflict: Resource already exists or required fields missing.
429 Too Many Requests: API quota exceeded (for Gemini AI).
500 Internal Server Error: General server errors.

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact
For questions or feedback, reach out to stillemperorbj.
