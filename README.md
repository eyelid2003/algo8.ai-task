## Task Manager Full-Stack Application

This is a complete task management system featuring a secure backend API and a responsive React frontend. The application allows users to securely register, log in, and manage their personal tasks.

-----

### Key Features

  * **User Authentication:** Secure user registration with password hashing via **bcrypt.js**, and authenticated access using **JWT (JSON Web Tokens)**.
  * **Task Management:** Users can **create**, **view**, **edit**, and **delete** their tasks.
  * **Task Status:** Tasks can be organized by their status: **`pending`**, **`inprogress`**, and **`completed`**. The backend uses a strict validation enum to enforce these values.
  * **Protected Endpoints:** All task-related APIs are protected and require a valid JWT token for access, ensuring data security.
  * **Error Handling:** The system provides clear error responses and proper validation on both the frontend and backend, improving reliability. For instance, a validation error occurs if the frontend sends a status of `done` instead of the expected `completed`.
  * **Organized Structure:** The project is modular, with a clear separation of concerns. The backend follows a controller-service-route pattern, while the frontend is organized into `pages`, `components`, and `api` directories.

-----

### Technology Stack

  * **Server:** Node.js, Express
  * **Frontend:** React
  * **Databases:** **MySQL** for user data and **MongoDB** for task management.
  * **Authentication & Security:** `jsonwebtoken` for JWT handling, `bcrypt.js` for password hashing.
  * **Utilities & Libraries:** `dotenv` for environment variables, `mongoose` for MongoDB modeling, `mysql2` driver for MySQL.

-----

### Setup and Running the Application

Follow these steps to get the project up and running locally.

#### Requirements

Make sure you have the following installed:

  * Node.js (v18 or later)
  * npm
  * MySQL Server
  * MongoDB Server

#### Steps to Run

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/[your-username]/[your-repo-name].git
    ```

2.  **Navigate to the project folder:**

    ```bash
    cd [your-repo-name]
    ```

3.  **Install backend dependencies:**

    ```bash
    npm install
    ```

4.  **Create a `.env` file:**
    In the root directory, create a `.env` file and configure it with your database and JWT secret keys.

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

5.  **Start the backend server:**

    ```bash
    npm start
    ```

    The API will now be available at `http://localhost:3000`.

-----

### API Routes

A Postman collection (`task-manager.postman_collection.json`) is included for testing all endpoints.

#### Authentication

  * **`POST /api/auth/register`**: Create a new user account.
      * **Body:** `{ "name": "...", "email": "...", "password": "..." }`
  * **`POST /api/auth/login`**: Log in an existing user and receive a JWT token.
      * **Body:** `{ "email": "...", "password": "..." }`

#### Task Management (JWT Required)

All task endpoints require an `Authorization` header with a valid JWT token: `Authorization: Bearer <JWT_TOKEN>`.

  * **`GET /api/tasks`**: Fetch all tasks for the logged-in user.
      * **Query Params:** `page`, `limit`, `status` (e.g., `?status=completed`)
  * **`GET /api/tasks/:id`**: Fetch a specific task by ID.
  * **`POST /api/tasks`**: Add a new task.
      * **Body:** `{ "title": "...", "description": "...", "status": "pending" }`
  * **`PUT /api/tasks/:id`**: Update an existing task.
      * **Body:** `{ "title": "...", "status": "in_progress" }`
  * **`DELETE /api/tasks/:id`**: Remove a task by its ID.

-----

### Front-End Setup and Corrections

The React frontend has been updated to handle common issues and provide a smooth user experience.

#### Key Frontend Changes:

  * **Folder Structure:** The folder structure is well-organized (`pages`, `components`, `api`).
  * **Incorrect File Paths:** The import paths for `TaskList.jsx` and `TaskItem.jsx` were corrected to ensure components render properly.
  * **Validation Error Fix:** The status dropdown in `TaskForm.jsx` was updated to send the correct values (`'pending'`, `'inprogress'`, `'completed'`) that match the backend's validation enum.
  * **Infinite Loop Fix:** The `DashboardPage.jsx` component was refactored to check for the authentication token at the top level, preventing an infinite re-render loop that would cause a blank screen.
  * **`fetchTasks` Scope:** The `fetchTasks` function was moved out of the `useEffect` hook to be accessible by other functions like `handleCreateTask` and `handleUpdateTask`.
  * **CSS Styling:** The CSS was updated to center the authentication forms on the page and to change the text color of the dashboard headings for better visibility.