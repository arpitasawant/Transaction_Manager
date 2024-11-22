# MERN-Stack Application Setup

This project consists of two parts: **Frontend** and **Backend**. Follow the steps below to set up and run each part.

---

## Frontend

### Prerequisites
- Node.js installed on your machine
- A valid backend URL for the application

### Setup and Run
1. Navigate to the frontend folder:
   
   cd frontend
   
2. Install dependencies:

   npm install
   
3. Create an environment file `.env` in the `frontend` directory and add the following:
   
   REACT_APP_BACKEND_URL=<your-backend-url>
   
   Replace `<your-backend-url>` with the URL of your backend API.

4. Start the development server:
   
   npm start
   

### Notes
- The frontend will run on `http://localhost:3000` by default.

---

## Backend

### Prerequisites
- Node.js installed on your machine
- A MongoDB instance running (local or cloud)
- A valid port for the server to run on

### Setup and Run
1. Navigate to the backend folder:
   
   cd backend
   
2. Install dependencies:
   
   npm install
   
3. Create an environment file `.env` in the `backend` directory and add the following:
   
   MONGO_URI=<your-mongodb-uri>
   PORT=<port-number>
   
   Replace `<your-mongodb-uri>` with your MongoDB connection string and `<port-number>` with the port number you want the server to listen on.

4. Start the backend server:
  
   npm start
   

### Notes
- The backend will run on `http://localhost:<PORT>` by default, where `<PORT>` is the value defined in your `.env` file.

---

## Troubleshooting

- **Frontend:**
  - Ensure the backend API URL in `REACT_APP_BACKEND_URL` is reachable and correct.
  - Check for errors in the browser console.

- **Backend:**
  - Ensure MongoDB is running and accessible using the provided `MONGO_URI`.
  - Check for errors in the server logs.

---
