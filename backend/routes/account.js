const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware");
const {Account}=require('../db')
const mongoose=require('mongoose');


router.get('/',authMiddleware,async(req,res)=>{
    const account=await Account.findOne({userId:req.user.user_id});
    if(!account){
      return res.status(403).json({message:"account does not exist"});
    }
    res.json({balance:account.balance.toFixed(2)});
});
router.post('/transfer',authMiddleware,async(req,res)=>{
const session=await mongoose.startSession();

session.startTransaction();
const {to,amount}=req.body;
const account=await Account.findOne({userId:req.user.user_id}).session(session);
if(!account||account.balance<amount){
    await session.abortTransaction();
    return res.status(400).json({
        message:"insufficient balance"
    })
}
const toAccount=await Account.findOne({userId:to}).session(session);
if(!toAccount){
    await session.abortTransaction();
    return res.status(400).json({
        message:"invalid account"
    })
}
//performing the transfer
await Account.updateOne({userId:req.user.user_id},{$inc:{balance:-amount}}).session(session);
await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

await session.commitTransaction();
res.json({
    message:"transaction successful "
})
})
module.exports=router;