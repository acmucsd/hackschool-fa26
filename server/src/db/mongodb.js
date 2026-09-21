const mongoose = require("mongoose");
const User = require("../models/userModel")

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  await mongoose.connect(process.env.MONGODB_URI, { dbName: "wordle-clone" })
  console.log("Connected to MongoDB");

  await User.createCollection();

  return mongoose.connection;
}

module.exports = { connectToDatabase };