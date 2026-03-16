const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("movieDB"); 
    console.log("Connected to MongoDB Atlas!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

// Import routes and pass the db
connectDB().then(() => {
  const moviesRouter = require("./routes/movie")(db);
  app.use("/movies", moviesRouter);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});