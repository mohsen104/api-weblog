
# API Weblog Service

This project is a backend service for a blogging platform. It includes authentication, user management, and post management functionalities.

## Features

- **Authentication**:
  - Send OTP for login
  - Verify OTP
  - Logout

- **Post Management**:
  - Create a post
  - Edit a post
  - Delete a post
  - View a single post
  - View all posts with filtering, pagination, and sorting options
  - Add comments to posts
  - Reply to comments

- **User Management**:
  - Get user details
  - Update user profile

## Technologies

- **Backend Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Validation**: [Joi](https://joi.dev/)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/)
- **Documentation**: [Swagger UI](https://swagger.io/tools/swagger-ui/)

## API Documentation

The API is documented using Swagger and can be accessed at `/api-docs` when the server is running.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mohsen104/API-Weblog-Service.git
    cd API-Weblog-Service
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file for environment variables. Example:

    ```env
    NODE_ENV
    PORT
    MONGODB_URI
    COOKIE_SECRET_KEY
    JWT_SECRET_KEY
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. For production:

    ```bash
    npm start
    ```

## Scripts

- `npm run dev`: Starts the server in development mode with Nodemon.
- `npm start`: Starts the server in production mode.
- `npm run format`: Formats the codebase using Prettier.

## Dependencies

- **Production**:
  - bcrypt
  - body-parser
  - cookie-parser
  - crypto
  - express
  - http-errors
  - joi
  - jsonwebtoken
  - mongoose
  - multer
  - slugify
  - swagger-jsdoc
  - swagger-ui-express

- **Development**:
  - dotenv
  - nodemon
  - prettier
