const express = require("express");
const rootRouter=require('./routes/index')
const app=express();
const cors=require('cors');
const PORT=3000; 


app.use(cors());
app.use(express.json());//for parsing body and putting the body in the req.body

app.use("/api/v1", rootRouter);

app.listen(PORT,(req,res)=>{
    console.log(`listening on port ${PORT}`);
})