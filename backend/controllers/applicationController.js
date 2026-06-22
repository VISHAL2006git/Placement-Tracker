const Application = require('../models/Application');

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({user: req.user.userId});
    res.json(applications);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const createApplication = async (req, res) => {
  try {
    const application = await Application.create({...req.body,user: req.user.userId
});
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getApplicationById =  async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user.userId
    });
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateApplication  =  async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user.userId
    });
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
};

const deleteApplication =   async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
    getApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
};