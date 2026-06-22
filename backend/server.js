require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT ||5000;

const app = express();

const applicationRoutes = require("./routes/applicationRoutes");
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.use(applicationRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
