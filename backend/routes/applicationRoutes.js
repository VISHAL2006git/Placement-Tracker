const express = require("express");
const router = express.Router();

const { getApplications ,getApplicationById , createApplication , updateApplication , deleteApplication } = require("../controllers/applicationController");

router.get('/applications',getApplications);
router.get('/applications/:id',getApplicationById);
router.post('/applications',createApplication);
router.put('/applications/:id',updateApplication);
router.delete('/applications/:id',deleteApplication);


module.exports = router;