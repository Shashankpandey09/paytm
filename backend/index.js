const express = require("express");

const app=express();
app.use(express.json());//for parsing body and putting the body in the req.body
const cors=require('cors');
const PORT=3000; 
const rootRouter=require('./routes/index')


app.use(cors());


app.use("/api/v1", rootRouter);

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})