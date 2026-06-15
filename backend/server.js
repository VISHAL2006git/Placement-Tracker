const express = require('express');
const app = express();
const PORT = 5000;
app.use(express.json());

let applications =[];

let nextApplicationId = 1;

app.post("/applications",(req,res)=>{
    const application = {
        applicationID:nextApplicationId++,
        ...req.body
    };
    applications.push(application);

    res.json({
        message:"Application created successfully",
        application:application
    });
});

app.get('/applications',(req,res) =>{
    res.json(applications);
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