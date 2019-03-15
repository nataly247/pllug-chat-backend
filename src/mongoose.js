const mongoose = require("mongoose");

// mongoDB URI format: https://docs.mongodb.com/manual/reference/connection-string/
mongoose.connect(
  "mongodb://52.9.142.100:27018/pllug-backend?authSource=admin",
  { useNewUrlParser: true }
);

mongoose.connection
  .on("connecting", () => {
    console.log("Connecting to MongoDB...");
  })
  .on("connected", () => {
    console.log("MongoDB connected!");
  });

module.exports = mongoose;
