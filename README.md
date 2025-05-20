# 📚 Book Review API

A RESTful API built with **Node.js** and **Express.js** for managing books and reviews. Includes JWT-based authentication, search functionality, and clean modular code.

## 🔧 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (via Mongoose)  
- **Authentication:** JWT (JSON Web Token)  
- **Environment Variables:** Managed using `.env`

## 🚀 Features

### ✅ Authentication
- `POST /signup` – Register a new user  
- `POST /login` – Authenticate and receive a JWT token

### 📚 Books
- `POST /books` – Add a new book (Auth required)
- `GET /books` – Get all books with pagination, optional filters by author & genre
- `GET /books/:id` – Get book details by ID (includes average rating & paginated reviews)

### ✍️ Reviews
- `POST /books/:id/reviews` – Submit a review (1 per user/book, Auth required)
- `PUT /reviews/:id` – Update your own review
- `DELETE /reviews/:id` – Delete your own review

### 🔍 Search
- `GET /search` – Search books by title or author (partial, case-insensitive)

## 📁 Project Structure

```
book-review-api/
├── config/          # DB config & JWT setup
├── controllers/     # Logic for books, users, reviews
├── middleware/      # JWT Auth middleware
├── models/          # Mongoose Schemas
├── routes/          # API route handlers
├── .env             # Environment variables
├── server.js        # App entry point
└── README.md        # This file
```

## 🛠️ Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/book-review-api.git
cd book-review-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookreview
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the Server
```bash
npm run dev
```

## 🧪 Example API Requests (cURL)

### Signup
```bash
curl -X POST http://localhost:5000/signup -H "Content-Type: application/json" -d '{"username": "john", "password": "123456"}'
```

### Login
```bash
curl -X POST http://localhost:5000/login -H "Content-Type: application/json" -d '{"username": "john", "password": "123456"}'
```

### Add Book (Auth Required)
```bash
curl -X POST http://localhost:5000/books -H "Authorization: Bearer <your_token>" -H "Content-Type: application/json" -d '{"title": "Atomic Habits", "author": "James Clear", "genre": "Self-help"}'
```

### Submit Review
```bash
curl -X POST http://localhost:5000/books/<book_id>/reviews -H "Authorization: Bearer <your_token>" -H "Content-Type: application/json" -d '{"rating": 5, "comment": "Amazing book!"}'
```

## 🗃️ Database Schema

### User
```js
{
  username: String (unique),
  password: String (hashed)
}
```

### Book
```js
{
  title: String,
  author: String,
  genre: String,
  reviews: [ObjectId → Review]
}
```

### Review
```js
{
  book: ObjectId → Book,
  user: ObjectId → User,
  rating: Number (1-5),
  comment: String
}
```

## 📌 Design Decisions & Assumptions

- Passwords are hashed using **bcrypt**
- Only authenticated users can add books or reviews
- Users can review a book **only once**
- Pagination defaults: `page=1`, `limit=10`
- Reviews nested under books but stored in a separate `reviews` collection for flexibility
