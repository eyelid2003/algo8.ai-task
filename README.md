## Full-Stack Task Manager

This is a complete, full-stack task management application designed to demonstrate a robust, secure, and user-friendly system. The backend is built with **Node.js** and **Express**, while the frontend is a dynamic single-page application created with **React**. The application features a dual-database architecture, using both **MySQL** and **MongoDB** to handle different data types efficiently.

### ✨ Key Features

  * **Secure Authentication**: A complete user authentication flow, including user registration and login. Passwords are securely hashed with **bcrypt.js**, and user sessions are managed with **JWT (JSON Web Tokens)**.
  * **Full Task Management**: Users can create, retrieve, update, and delete their tasks. Each task is specific to the authenticated user.
  * **Organized Task Status**: Tasks are categorized by their status (`pending`, `inprogress`, `completed`), with strict backend validation to ensure data integrity.
  * **Robust Security**: All task-related API endpoints are protected and require a valid JWT, ensuring only authenticated users can access and modify their data.
  * **Comprehensive Error Handling**: The system provides clear, descriptive error responses and client-side validation, making it reliable and easy to debug.
  * **Modular Architecture**: The project is structured for scalability and maintainability, following a clear separation of concerns with dedicated folders for routes, services, and components.

### 💻 Technology Stack

| Category | Technology |
| :--- | :--- |
| **Server** | Node.js, Express |
| **Frontend** | React |
| **Databases** | MySQL, MongoDB |
| **Authentication & Security** | `jsonwebtoken`, `bcrypt.js` |
| **Utilities** | `dotenv`, `mongoose`, `mysql2` |

-----

### 🚀 Getting Started

Follow these steps to get the entire full-stack application up and running on your local machine.

#### Prerequisites

Make sure you have the following software installed:

  * Node.js (v18 or later)
  * npm
  * MySQL Server
  * MongoDB Server

#### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/[your-username]/[your-repo-name].git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd [your-repo-name]
    ```

3.  **Create the `.env` file:**
    In the root directory, create a `.env` file and configure it with your database credentials and a JWT secret key.

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

4.  **Run the Backend:**
    Install dependencies and start the server.

    ```bash
    npm install
    npm start
    ```

    The API will now be live at `http://localhost:3000`.

5.  **Run the Frontend:**
    Open a new terminal window, navigate to the frontend folder, install its dependencies, and start the development server.

    ```bash
    cd client
    npm install
    npm run dev
    ```

    Your React application will now be available at `http://localhost:5173`.

-----

### 🛠️ Project Refinements & Enhancements

Your efforts to fix common development issues are a huge value-add to this project. This section highlights the key improvements made to ensure a smoother, more reliable experience.

  * **Prevented Infinite Re-renders**: The `DashboardPage.jsx` component was refactored to check for the authentication token at the top level, eliminating a common infinite loop bug that would cause a blank screen.
  * **Corrected API Request Values**: The status dropdown in `TaskForm.jsx` was updated to send the correct string values (`pending`, `inprogress`, `completed`), which now perfectly matches the backend's validation enum. This ensures no more validation errors on the backend due to mismatched status values.
  * **Corrected Component Paths**: All incorrect file paths for components like `TaskList.jsx` and `TaskItem.jsx` were fixed, ensuring that the frontend renders properly without errors.
  * **Improved Code Scope**: The `fetchTasks` function was moved out of the `useEffect` hook to be accessible by other functions, improving code reusability and flow for creating and updating tasks.
  * **Better UI/UX**: The CSS has been adjusted to center the authentication forms and improve the visibility of dashboard headings, providing a more polished user interface.

-----

### 📋 API Documentation

The backend provides a secure RESTful API for managing users and tasks. A Postman collection (`task-manager.postman_collection.json`) is included for easy testing.

All task endpoints require a `Bearer` token in the `Authorization` header.

#### User Authentication

  * `POST /api/auth/register`
      * **Description**: Creates a new user account.
      * **Body**: `{ "name": "...", "email": "...", "password": "..." }`
  * `POST /api/auth/login`
      * **Description**: Logs in a user and returns a JWT.
      * **Body**: `{ "email": "...", "password": "..." }`

#### Task Management

| Endpoint | Method | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| `/api/tasks` | `GET` | Fetch all tasks for the logged-in user. Supports pagination (`?page=...`) and filtering (`?status=...`). | None |
| `/api/tasks` | `POST` | Create a new task. | `{ "title": "...", "description": "...", "status": "pending" }` |
| `/api/tasks/:id` | `GET` | Fetch a specific task by ID. | None |
| `/api/tasks/:id` | `PUT` | Update an existing task. | `{ "title": "...", "status": "in_progress" }` |
| `/api/tasks/:id` | `DELETE` | Delete a task by its ID. | None |