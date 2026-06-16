const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Application = require('./models/Application');
const PORT = 5000;
app.use(express.json());

let applications =[];

let nextApplicationId = 1;

mongoose.connect('mongodb://localhost:27017/placementDB')
.then(()=>{
    console.log("MongoDB connected successfully");
})
.catch((err)=>{
    console.log(err);
});

app.post("/applications", async (req,res)=>{
    try{
    const application = await Application.create(req.body);
    res.status(201).json(application);
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
});

app.get('/applications', async (req,res) =>{
    try{
        const applications = await Application.find();
        res.json(applications);
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
    
});

app.put('/applications/:id',(req,res) => {
    const application = applications.find(app => app.applicationID === parseInt(req.params.id));
    if(!application){
        res.status(404).json({message:"Application not found"});
        return;   
    }
    application.status = req.body.status;
    res.json(application);
});

app.get('/applications/:id',(req,res) =>{
    const application = applications.find(app => app.applicationID === parseInt(req.params.id));
    if(application){
        res.json(application);
    }
    else{
        res.status(404).json({message:"Application not found"});
    }
});

app.delete('/applications/:id',(req,res)=>{
    const id = parseInt(req.params.id);

    const application = applications.find(app => app.applicationID === parseInt(req.params.id));
    if(!application){
        res.status(404).json({message:"Application not found"});
        return;   
    }
    else{
        applications = applications.filter(app => app.applicationID !== id);
        res.json({message:"Application deleted successfully"});
    }
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});