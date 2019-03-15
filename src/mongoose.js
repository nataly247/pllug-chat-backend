const mongoose = require("mongoose");

// mongoDB URI format: https://docs.mongodb.com/manual/reference/connection-string/
mongoose.connect(
  "mongodb+srv://pllug-user:Install_new!@pllug-5s6vb.mongodb.net/test?retryWrites=true",
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
