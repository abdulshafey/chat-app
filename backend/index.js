const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/connectToDb");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Hello from server",
  });
});

const PORT = process.env.PORT || 8080;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log("MongoDb connected..");
    console.log(`Server is running on ${PORT}`);
  });
});
