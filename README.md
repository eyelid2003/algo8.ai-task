//Palak Dixit
Task Manager Backend API

This is a secure backend system built to handle user authentication and task management. It uses Node.js with Express for the server, MySQL for storing user information, and MongoDB to manage tasks efficiently.

-----

Key Features

User Authentication

  - Register users securely with password hashing using bcrypt.js.
  - Generate and verify JWT tokens for login authentication.

Task Operations

  - Users can create, view, edit, and delete tasks.
  - Tasks can be filtered based on their status: todo, in\_progress, done.
  - Supports pagination to fetch tasks page by page rather than all at once.

Protected Endpoints

  - Task-related APIs require a valid JWT token for access.

Error Handling & Validation

  - Routes include input validation and proper error responses for better reliability.

Organized Structure

  - Clear separation using controllers, services, and routes for maintainable code.

-----

Technology Stack

Server: Node.js, Express

Databases:

  - MySQL for user data
  - MongoDB for task management

Authentication & Security:

  - jsonwebtoken for JWT creation and verification
  - bcrypt.js for password hashing

Utilities & Libraries:

  - dotenv for environment variables
  - mongoose for MongoDB modeling
  - mysql2 driver for MySQL

-----

Setup Instructions

Follow these steps to get the project running locally:

Requirements
Make sure you have these installed:

  - Node.js (v18 or later)
  - npm
  - MySQL Server
  - MongoDB Server

Steps to Run

1.  Clone the repository:

<!-- end list -->

```bash
git clone https://github.com/[your-username]/[your-repo-name].git
```

2.  Navigate to the project folder:

<!-- end list -->

```bash
cd [your-repo-name]
```

3.  Install the dependencies:

<!-- end list -->

```bash
npm install
```

4.  Create a .env file in the root directory and configure it like this:

<!-- end list -->

```
PORT=3000
JWT_SECRET=your_super_secret_jwt_key

# MySQL Configuration
MYSQL_HOST=localhost
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=task_manager_db

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/task_manager_db
```

5.  Start the server:

<!-- end list -->

```bash
npm start
```

The API will now be available at http://localhost:3000.

-----

API Routes

A Postman collection (task-manager.postman\_collection.json) is provided for testing all endpoints.

Authentication
POST /api/auth/register

  - Create a new user account.
  - Body: { "name": "...", "email": "...", "password": "..." }

POST /api/auth/login

  - Log in an existing user and get a JWT token.
  - Body: { "email": "...", "password": "..." }

Task Management (JWT required)
Include the header: Authorization: Bearer \<JWT\_TOKEN\>

GET /api/tasks

  - Fetch all tasks for the logged-in user.
  - Query params:
  - page – page number (?page=1)
  - limit – tasks per page (\&limit=10)
  - status – filter by task status (\&status=done)

GET /api/tasks/:id

  - Fetch a specific task by ID.

POST /api/tasks

  - Add a new task for the authenticated user.
  - Body: { "title": "...", "description": "...", "status": "todo" }

PUT /api/tasks/:id

  - Update an existing task.
  - Body can include fields like { "title": "...", "status": "in\_progress" }

DELETE /api/tasks/:id

  - Remove a task by its ID.

