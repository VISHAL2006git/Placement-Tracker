const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Application = require("./models/Application");
const PORT = 5000;
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/placementDB")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/applications", async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.get("/applications/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (application) {
      res.json(application);
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/applications/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    if (!req.body.status) {
      return res.status(400).json({ message: "Status is required" });
    }
    application.status = req.body.status;
    await application.save();
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/applications/:id", async (req, res) => {
    try{
  const application = await Applications.find();
  if (!application) {
    res.status(404).json({ message: "Application not found" });
  }
  res.json(application);
    
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
});

app.delete("/applications/:id", async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
