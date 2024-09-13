const express = require("express");
const app=express();
require('dotenv').config();
app.use(express.json());//for parsing body and putting the body in the req.body
const cors=require('cors');
const PORT=process.env.PORT; 
const rootRouter=require('./routes/index')



app.use(cors({
    origin: 'https://paytm-6iqj.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  }));

app.use("/api/v1", rootRouter);

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})