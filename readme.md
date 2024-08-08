# Social Media API

This project implements a basic social media platform backend using Node.js, Express.js, and MongoDB. Users can register, log in, send and accept friend requests, create posts, comment on posts, and view a feed of posts from friends.

## Features

- **User Registration & Login**: Allows users to register and log in to the platform.
- **Friend Request Management**: Users can send and respond to friend requests.
- **Post Creation & Comments**: Users can create text-only posts and comment on posts.
- **User Feed**: Users can view a feed of posts from their friends.
- **Explore Posts**: Users can view posts where their friends have commented.

## Project Structure

- `models/`: Contains Mongoose models for `User` and `Post`.
- `routes/`: Contains route handlers for authentication (`auth`), friend management (`friends`), and posts (`posts`).
- `middleware/`: Contains custom middleware for authentication and input validation.
- `config/`: Contains database connection setup.

## Prerequisites

- Node.js (v14+)
- MongoDB
- Postman for API testing

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-repository/social-media-api.git
    cd social-media-api
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Setup environment variables**:
   Create a `.env` file in the root directory with the following content:
    ```
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    PORT=5000
    ```

4. **Start the server**:
    ```bash
    npm start
    ```

   The server will run on `http://localhost:5000`.

## API Usage

### Authorization

Most of the endpoints require a Bearer Token for authentication. Obtain the token by logging in and then set the `Authorization` header in your requests:


### API Endpoints

- **User Registration**
  - **Endpoint**: `/api/auth/register`
  - **Method**: `POST`
  - **Body**:
    ```json
    {
      "username": "testuser",
      "email": "testuser@example.com",
      "password": "password123"
    }
    ```

- **User Login**
  - **Endpoint**: `/api/auth/login`
  - **Method**: `POST`
  - **Body**:
    ```json
    {
      "email": "testuser@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "token": "<your-jwt-token>"
    }
    ```

- **Send Friend Request**
  - **Endpoint**: `/api/friends/send`
  - **Method**: `POST`
  - **Headers**:
    - `Authorization: Bearer <your-token-here>`
  - **Body**:
    ```json
    {
      "recipientId": "<recipient-user-id>"
    }
    ```

- **Respond to Friend Request**
  - **Endpoint**: `/api/friends/respond`
  - **Method**: `POST`
  - **Headers**:
    - `Authorization: Bearer <your-token-here>`
  - **Body**:
    ```json
    {
      "requestId": "<friend-request-id>",
      "action": "accept"
    }
    ```

- **Create Post**
  - **Endpoint**: `/api/posts/create`
  - **Method**: `POST`
  - **Headers**:
    - `Authorization: Bearer <your-token-here>`
  - **Body**:
    ```json
    {
      "content": "This is a test post."
    }
    ```

- **Comment on Post**
  - **Endpoint**: `/api/posts/comment`
  - **Method**: `POST`
  - **Headers**:
    - `Authorization: Bearer <your-token-here>`
  - **Body**:
    ```json
    {
      "postId": "<post-id>",
      "text": "This is a test comment."
    }
    ```

- **Get User Feed**
  - **Endpoint**: `/api/posts/feed`
  - **Method**: `GET`
  - **Headers**:
    - `Authorization: Bearer <your-token-here>`

- **Explore Posts**
  - **Endpoint**: `/api/posts/explore`
  - **Method**: `GET`
  - **Headers**:
    - `Authorization: Bearer <your-token-here>`

## Importing the Postman Collection

1. **Download the JSON file**: Save the `social_media_api.postman_collection.json` file from this repository.

2. **Import into Postman**:
   - Open Postman and go to `File > Import`.
   - Choose `Upload Files` and select the downloaded `.json` file.
   - The collection will be imported, and you can now start testing the API.

3. **Set the JWT Token**:
   - After logging in, copy the token from the response and set it in the `jwtToken` variable under the collection’s variables.
   - This token will automatically be used in all requests that require authentication.

## Contribution

Feel free to fork the repository and make contributions. Please make sure to open a pull request with a description of your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
