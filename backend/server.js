const express = require('express');
const app = express();
const PORT = 5000;

app.get('/',(req,res) =>{
    res.end("placement tracker API Running");
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});