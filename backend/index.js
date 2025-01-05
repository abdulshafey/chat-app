const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/connectToDb");
const router = require("./router/index");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { app, server } = require("./socket/index");

// const app = express();
const allowedOrigins = [
  'http://localhost:3000', // For local development
  'https://chat-app-coral-mu.vercel.app', // Your Vercel frontend
];

// CORS middleware with dynamic origin matching
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // Allows cookies and other credentials
  })
);

// Handle preflight requests explicitly
app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

app.options('*', cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const PORT = process.env.PORT || 8080;

connectToDB().then(() => {
  server.listen(PORT || 8080, () => {
    console.log("MongoDb connected..");
    console.log(`Server is running on ${PORT}`);
  });
});
