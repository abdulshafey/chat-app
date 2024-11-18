const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/connectToDb");
const router = require("./router/index");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 8080;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log("MongoDb connected..");
    console.log(`Server is running on ${PORT}`);
  });
});
