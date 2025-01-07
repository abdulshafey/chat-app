const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/connectToDb");
const router = require("./router/index");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { app, server } = require("./socket/index");
const path = require("path");

// const app = express();
const allowedOrigins = [
  process.env.FRONTEND_URL, // For local development
  
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

const dirname = path.resolve();
app.options('*', cors());
app.use(express.json());
app.use(cookieParser()); 
app.use("/api", router);

 app.use(express.static(path.join(dirname, "/frontend/build")));

app.get("*", (req, res) => {  
  res.sendFile(path.join(dirname, "frontend", "build", "index.html"));
});  


const PORT = process.env.PORT || 8080;

connectToDB().then(() => {
  server.listen(PORT, () => {
    console.log("MongoDb connected..");
    console.log(`Server is running on ${PORT}`);
  });
});
