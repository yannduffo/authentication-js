# authentication-js

Log-in, registration and authentication web app.

## Description

This project propose an example of how to build a **complete authentication system** with separate frontend and backend components. It features a **user-friendly interface for registration and login**, combined with secure **JWT-based authentication** to ensure the integrity and security of user sessions.

- Frontend (Client): Built with React, the frontend provides a simple and clean interface for users to register, log in, and access protected home page.
- Backend (Server): Powered by Node.js and Express, the backend handles user authentication, manages the database, and issues JWT tokens for session management.
- Database: A PostgreSQL database stores user information, including hashed passwords.

Everything is build using development servers.

## Client (front-end)

### Technology Used

- **React**
- **Fetch API**: Used to make HTTP requests to the backend.
- **Routing**: Managed using React Router to handle navigation between pages.

### How It Works

The frontend is a Multi Page Application running on `http://localhost:3000`.

- _Registration Page_: A form where users input their name, email, and password to create an account. Upon submission, the form sends a POST request to the backend’s `/register` endpoint.
- _Login Page_: A form for email and password input. On successful login, the backend returns a JWT token that is stored on the client local storage for further use of services.
- _Home Page_: A protected page accessible only to authenticated users. The frontend ask for JWT token validation before granting access to home page.

## Server (back-end)

### Technology Used

- **Node.js**: Runtime environment for executing JavaScript on the server side.
- **Express**: Flexible framework for building web applications and APIs.
- **pg**: PostgreSQL client for Node.js, used to connect to and interact with the database.
- **bcrypt.js**: Library for securely hashing and verifying passwords.
- **jsonwebtoken (JWT)**: Used to generate and validate tokens for authentication.
- **dotenv**: Manages environment variables for secure configurations.

### How It Works

The backend runs on `http://localhost:8000` and handles all requests from the frontend.

- **Registration Endpoint (`/api/register`)**: Accepts user details from the frontend. Hashes the user’s password using bcrypt.js. Stores the user’s details (name, email, hashed password) in the database.
- **Login Endpoint (`/api/login`)**: Verifies the user’s email/password. If valid, generates a JWT token using jsonwebtoken and sends it to the client.
- **Protected Resources (`/api/home`)**: Uses middleware to validate the client’s JWT token before granting access to home page.
- **Middleware**: Middleware ensures that only authenticated users can access protected endpoints.

## Database

The database is a **postgreSQL** database. For this project the database is as simple as possible with only one table : the table _users_. The backend uses the `pg` Javascript librairy to interact with the postgres server.

Here is the _users_ table description :

```
authenticationdb=# \d users
                                        Table "public.users"
   Column   |            Type             | Collation | Nullable |              Default
------------+-----------------------------+-----------+----------+-----------------------------------
 id         | integer                     |           | not null | nextval('users_id_seq'::regclass)
 name       | character varying(100)      |           | not null |
 email      | character varying(150)      |           | not null |
 password   | text                        |           | not null |
 created_at | timestamp without time zone |           |          | CURRENT_TIMESTAMP
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)
```

We didn't care about security concern as this project is only for development propose.

## Getting started

Follow these instructions to dowload and setup the whole environment before using the webapp.

### Installation

#### Clone repository

`git clone git@github.com:yannduffo/authentication-js.git`

#### Install client and server dependencies

```
cd client
npm install
cd ../server
npm install
```

#### Configure `.env` file

By following `.env.example` configure your own `.env` file using your infos :

```
PORT=8000
JWT_SECRET=your_jwt_secret
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=authdb
DB_HOST=localhost
DB_PORT=5432
```

### Starting project

Start the client (front-end) :

```
cd client
npm start
```

Start the server (back-end) :

```
cd server
npm start
```

Strat the postgres database with a instacied DB following the above example.

Connect on `localhost:3000` and enjoy the app !

<br>
<br>
<br>
Created by Yann Duffo
