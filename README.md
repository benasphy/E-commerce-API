# E-commerce-API

This repository contains a robust and scalable E-Commerce API built using Node.js and Express. The API includes full CRUD functionality, caching, headers and basic authentication. It is designed to handle product and user management efficiently while ensuring secure access control.

---

## Features

- **CRUD Operations:**
  - Create, Read, Update, and Delete operations for products and users.

- **Authentication:**
  - Protected endpoints with Basic Authentication (Username: `testuser`, Password: `testpassword`).

- **Middleware:**
  - Caching using Redis for efficient data retrieval.
  - Logging with Morgan.
  - Request parsing using Body-Parser.

- **Error Handling:**
  - Robust error handling for invalid tokens and other errors.

- **Database Integration:**
  - MongoDB Atlas is used for data storage and management.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm or yarn
- Redis (for caching)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/benasphy/E-commerce-API.git
   ```

2. Navigate to the project directory:
   ```bash
   cd E-commerce-API
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory with the following content:
   ```env
   API_URL=/api/v1
   CONNECTION_STRING=<Your MongoDB Connection String>
   PORT=3000
   BASIC_AUTH_USERNAME=testuser
   BASIC_AUTH_PASSWORD=testpassword
   ```

5. Start the Redis server locally.

6. Start the application:
   ```bash
   npm start
   ```

---

## API Endpoints

### Products

#### 1. **Get All Products**
- **URL:** `GET /api/v1/products`
- **Authentication:** Basic Auth required.
- **Headers:**
  - Authorization: Basic `<base64-encoded-credentials>`
- **Response:**
  ```json
  [
    {
      "_id": "productId",
      "name": "Product Name",
      "price": 100.0,
      "description": "Product Description"
    }
  ]
  ```

#### 2. **Get Product by ID**
- **URL:** `GET /api/v1/products/:id`

#### 3. **Create Product**
- **URL:** `POST /api/v1/products`
- **Body:**
  ```json
  {
    "name": "New Product",
    "price": 200.0,
    "description": "Detailed Description"
  }
  ```

#### 4. **Update Product**
- **URL:** `PUT /api/v1/products/:id`
- **Body:**
  ```json
  {
    "name": "Updated Product",
    "price": 250.0
  }
  ```

#### 5. **Delete Product**
- **URL:** `DELETE /api/v1/products/:id`

### Users

#### 1. **Register User**
- **URL:** `POST /api/v1/users/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "securepassword"
  }
  ```

#### 2. **Login User**
- **URL:** `POST /api/v1/users/login`
- **Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "securepassword"
  }
  ```

#### 3. **Get All Users**
- **URL:** `GET /api/v1/users`
- **Authentication:** Basic Auth required.

---

## Caching with Redis

- Implemented for the `GET /api/v1/products` endpoint.
- Reduces load on the database by storing the response in Redis for subsequent requests.

---

## Testing the API

### Using Postman

1. **Set up Basic Authentication:**
   - Go to the Authorization tab.
   - Choose "Basic Auth".
   - Enter Username: `testuser` and Password: `testpassword`.

2. **Send Requests:**
   - Use the endpoints mentioned above.

3. **Example Curl Command:**
   ```bash
   curl -X GET http://localhost:3000/api/v1/products \
   --user testuser:testpassword
   ```

---

## Dependencies

- Express
- Mongoose
- dotenv
- body-parser
- morgan
- Redis

---

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.


