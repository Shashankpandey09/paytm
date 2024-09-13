const express = require("express");
const app=express();
require('dotenv').config();
app.use(express.json());//for parsing body and putting the body in the req.body
const cors=require('cors');
const PORT=process.env.PORT; 
const rootRouter=require('./routes/index')



app.use(cors());


app.use("/api/v1", rootRouter);

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})