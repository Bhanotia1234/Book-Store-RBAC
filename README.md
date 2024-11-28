# Book Store Project: Backend with Authentication, Authorization, and Role-Based Access Control
## Overview
The Book Store project is a backend application designed to manage books, orders, and user roles within a bookstore environment. The system supports different types of users, each with specific privileges:

Admin: Can add, update, delete, and view all books.
Moderator: Can approve or reject orders placed by users.
User: Can view books and place orders.
The application uses JWT (JSON Web Tokens) for authentication, ensuring that users can securely log in and perform actions based on their roles. The system leverages MongoDB for data storage, with Mongoose handling the interaction with the database.

## Key Features

## User Authentication & Authorization:

Users can register and log in using their email and password.
A JWT token is generated upon successful login and used to authenticate requests to protected routes.
Roles are assigned to users (Admin, Moderator, User) to control access to different routes.

## Role-Based Access Control (RBAC):

Admin: Can manage the books (add, update, delete). Admins can also view all orders and users.
Moderator: Can approve or reject orders based on user requests.
User: Can only view books and place orders.

## Book Management:

Admins can perform CRUD operations (Create, Read, Update, Delete) on books.
Users and Moderators can view books, but cannot modify them.

## Order Management:

Users can place orders for books.
Moderators can approve or reject orders based on availability or other criteria.
The order status can be set to pending, approved, or rejected.
