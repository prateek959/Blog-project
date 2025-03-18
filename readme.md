# Blog Project

This is a full-stack blog application that allows users to create, edit, delete, and view blogs. Users can also comment on and like blogs. The application includes both a frontend and a backend.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [License](#license)

## Features

- User authentication (register, login, forgot password, reset password)
- Create, edit, delete, and view blogs
- Comment on and like blogs
- Admin functionalities to manage all blogs
- Scheduled blog publishing
- Image upload using Cloudinary

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Argon2 for password hashing
- Nodemailer for sending emails
- Cloudinary for image upload
- Node-cron for scheduling tasks

### Frontend

- HTML, CSS, JavaScript

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/prateek959/Blog-project.git
    cd blog-project
    ```

2. Install backend dependencies:

    ```sh
    cd backend
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:

    ```env
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET_KEY=your_jwt_secret_key
    EMAIL=your_email
    PASS=your_email_password
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUD_KEY=your_cloudinary_api_key
    CLOUD_SECRET=your_cloudinary_api_secret
    PORT=your_port
    ```

4. Start the backend server:

    ```sh
    npm run dev
    ```

5. Open the `frontend` directory and open the HTML files in your browser.

## Usage

1. Register a new user.
2. Login with the registered user credentials.
3. Create, edit, delete, and view blogs.
4. Comment on and like blogs.
5. Admin can manage all blogs.

## API Endpoints

### User

- `POST /user/register` - Register a new user
- `POST /user/login` - Login a user
- `POST /user/forgot_password` - Send forgot password email
- `POST /user/reset_password/:token` - Reset password

### Blog

- `POST /blog/create` - Create a new blog
- `GET /blog/get` - Get personal blogs
- `PUT /blog/update/:id` - Update a blog
- `DELETE /blog/delete/:id` - Delete a blog
- `GET /blog/draft/:blogId` - Get a draft blog

### Admin

- `GET /admin/get` - Get all blogs
- `PUT /admin/update/:blogId` - Update a blog as admin
- `DELETE /admin/delete/:blogId` - Delete a blog as admin

### Comment

- `POST /comment/create/:blogId` - Create a comment
- `PUT /comment/update/:commentId` - Update a comment
- `DELETE /comment/delete/:commentId` - Delete a comment

### Like

- `POST /like/add/:blogId` - Add or remove a like

### Reader

- `GET /read/get` - Get all published blogs
- `GET /read/get_blog/:blogId` - Get a blog by ID

## Folder Structure

```
backend/
    .env
    .gitignore
    package.json
    server.js
    config/
        db.js
    controller/
        admin.controller.js
        blog.controller.js
        comment.controller.js
        like.controller.js
        reader.controller.js
        test.controller.js
        user.controller.js
    middlewear/
        auth.middlewear.js
        nodemailer.middlewear.js
        views.middlewear.js
    models/
        blog.schema.js
        comment.schema.js
        like.schema.js
        user.schema.js
    nodemailer/
        nodemailer.js
    routes/
        admin.routes.js
        blog.routes.js
        comment.routes.js
        like.routes.js
        reader.routes.js
        test.routes.js
        user.routes.js
frontend/
    about.html
    create.html
    edit.html
    fullblog.html
    index.html
    login.html
    myblogs.html
    signup.html
```

## License

This project is licensed under the MIT License.