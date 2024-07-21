const express = require('express');

const app=express();

// routes 
app.get('/api/tours',(req,res,next)=>{
    res.status(200).send("api response");
})


// server
const port=3000
app.listen(port,()=>{
    console.log('====================================');
    console.log(`App running on PORT: ${port}...`);
    console.log('====================================');
})
