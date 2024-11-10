# Node.js API Project

This is a Node.js application that serves as a backend API for managing users, posts, articles, activities, badges, albums, and projects. The API supports file uploads, integrates with MongoDB for data storage, and provides documentation via Swagger.

## Features

- **RESTful API**: Endpoints for managing users, authentication, posts, articles, activities, badges, albums, and projects.
- **File Uploads**: Supports file uploads for images, videos, and documents.
- **MongoDB Integration**: Data is stored and retrieved from a MongoDB database.
- **Swagger Documentation**: API documentation available via Swagger UI.
- **CORS & Cookie Parsing**: Handles cross-origin requests and cookie parsing for sessions.
- **Multer Error Handling**: Custom error handling for file uploads.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for building the API.
- **MongoDB & Mongoose**: Database and ODM for interacting with MongoDB.
- **Swagger UI**: API documentation.
- **Multer**: Middleware for handling file uploads.
- **dotenv**: Environment variable management.
- **CORS**: Cross-origin resource sharing middleware.

## Installation

### Prerequisites

Ensure you have Node.js and MongoDB installed on your system. You'll also need a `.env` file to configure your MongoDB connection.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
2. Install dependencies
   ```bash
   npm install
3. Set up your environment variables: Create a .env file in the root of the project and add the following:
   ```bash
   MONGO_URL=mongodb://your_mongo_db_connection_string
4. Start the server:
   ```bash
   npm start
   The server will start on port 8800.
   
## API Endpoints

This project exposes several API routes to handle various operations. Below are the key routes available:

### Authentication
- **POST** `/api/auth/login`: Log in a user.
- **POST** `/api/auth/register`: Register a new user.

### Users
- **GET** `/api/users`: Get a list of all users.
- **GET** `/api/users/:id`: Get a user by ID.
- **PUT** `/api/users/:id`: Update a user by ID.

### Posts
- **GET** `/api/posts`: Get a list of posts.
- **POST** `/api/posts`: Create a new post.

### Articles
- **GET** `/api/articles`: Get a list of articles.
- **POST** `/api/articles`: Create a new article.

### Activities
- **GET** `/api/activities`: Get a list of activities.
- **POST** `/api/activities`: Create a new activity.

### Badges
- **GET** `/api/badges`: Get a list of badges.
- **POST** `/api/badges`: Create a new badge.

### Albums
- **GET** `/api/album`: Get a list of albums.
- **POST** `/api/album`: Create a new album.

### Projects
- **GET** `/api/projects`: Get a list of projects.
- **POST** `/api/projects`: Create a new project.

## File Handling

This application supports file uploads for images, videos, and documents. The uploaded files are stored in different folders within the `storage` directory:

- **Images**: Uploaded images are stored in `storage/images`.
- **Videos**: Uploaded videos are stored in `storage/videos`.
- **Documents**: Uploaded documents are stored in `storage/documents`.

### Static File Access

You can access the uploaded files via the following URLs:

- **Images** can be accessed via `/storage/images/`.
- **Videos** can be accessed via `/storage/videos/`.
- **Documents** can be accessed via `/storage/documents/`.

---

## Swagger Documentation

The API documentation is available through **Swagger UI**. You can explore all available API routes and their details through the Swagger interface.

To access the Swagger UI, visit the following URL in your browser: http://localhost:8800/api-docs
