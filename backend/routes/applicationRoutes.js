const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

const { getApplications ,getApplicationById , createApplication , updateApplication , deleteApplication } = require("../controllers/applicationController");

router.get('/applications',authenticateToken,getApplications);
router.get('/applications/:id',authenticateToken,getApplicationById);
router.post('/applications',authenticateToken,createApplication);
router.put('/applications/:id',authenticateToken,updateApplication);
router.delete('/applications/:id',authenticateToken,deleteApplication);


module.exports = router;