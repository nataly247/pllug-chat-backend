const mongoose = require("mongoose");

// mongoDB URI format: https://docs.mongodb.com/manual/reference/connection-string/
mongoose.connect("mongodb://localhost:27017/pllug-backend", { useNewUrlParser: true });

mongoose.connection
  .on("connecting", () => {
    console.log("Connecting to MongoDB...");
  })
  .on("connected", () => {
    console.log("MongoDB connected!");
  });

module.exports = mongoose;
