const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;

const applicationRoutes = require("./routes/applicationRoutes");

app.use(express.json());

app.use(applicationRoutes);

mongoose.connect("mongodb://localhost:27017/placementDB")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
