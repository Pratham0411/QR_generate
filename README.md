QR Code Generation and Machine Registration API

This project provides an API for registering machines and generating QR codes for them. Each machine has a unique ID, and a QR code is generated and saved to the server. The project consists of a backend built with Node.js and a frontend built with ReactJS.
Project Structure

QR_generate/
├── backend/  
│   ├── qr/                     # Generated QR code images
│   ├── config.js               # DB connection configuration
│   ├── db.js                   # Database and QR code logic
│   ├── server.js               # Main API routes and server setup
│   ├── package.json            # Backend dependencies
├── frontend/                   # ReactJS frontend for displaying QR codes
└── package-lock.json           # Lock file for fixed dependencies

Getting Started
Prerequisites

    Node.js (v14 or higher)
    MariaDB or MySQL database
    VSCode or any text editor

Installation

    Clone the repository:

git clone https://github.com/Pratham0411/QR_generate.git
cd QR_generate/backend

Install dependencies:

npm install  

Set up the database:

Create a MariaDB database (machines_db) and table (machines):

CREATE DATABASE machines_db;
CREATE TABLE machines (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  name VARCHAR(50),
  qr_code VARCHAR(255)
);

Set environment variables in .env file:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=machines_db
    PORT=5000

API Endpoints
POST /api/register-machine

Registers a new machine, generates a unique QR code, and saves it.

Request:

{
  "id": "FC:B6:67:62:97:53"
}

Response:

    Success:

{
  "message": "New machine added with ID: FC:B6:67:62:97:53"
}

Error (ID exists):

    {
      "message": "ID exists in the database."
    }

Frontend (ReactJS)

The frontend is built with ReactJS and allows users to view the generated QR codes for each registered machine.

    The frontend fetches data from the backend API and displays machine information along with the QR code.
    Run the frontend with npm start after setting up.

Running the Project

    Start the backend server:

node server.js

The backend will run on port 5000.

Run the frontend:

In the frontend folder, run:

    npm start

    The frontend will run on http://localhost:3000.

Contributing

Feel free to fork the repo, make changes, and submit a pull request!
License

This project is available under the MIT License.
