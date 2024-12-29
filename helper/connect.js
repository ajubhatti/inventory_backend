const mongoose = require("mongoose");

var Url =
  "mongodb+srv://ajubhatti:gj11nn5099@cluster0.rbuwj.mongodb.net/practice?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose
      .connect(Url)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection failed", { err });
      });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDB;
