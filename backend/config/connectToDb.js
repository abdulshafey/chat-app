const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database connected ...");
    });
    connection.on("error", (error) => {
      console.log("Error while connecting MongoDb", error);
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToDB;
