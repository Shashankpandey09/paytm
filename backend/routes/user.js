const express = require("express");
const JWT = require("jsonwebtoken");
const { USER, Account } = require("../db");
const { JWT_SECRET_KEY } = require("../config");
const authMiddleware = require("../middleware");
const {z}=require("zod");
const UserRouter = express.Router();

const signUpSchema = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

UserRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signUpSchema.safeParse(body);
  if (!success) {
    return res.json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const existingUser = await USER.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken ",
    });
  }
  const user = new USER(body);
  await user.save();

  const token = JWT.sign({ user_id: user._id }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  res.status(200).json({
    message: "User created successfully",
    token: token,
  });
  await Account.create({userId:user._id,balance:1+Math.random()*10000});
  
});
//sign In route
const signInSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});
UserRouter.post("/signIn", async (req, res) => {
  const body = req.body;
  const { success } = signInSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "error while logging in",
    });
  }
  const existingUser = await USER.findOne({ username: body.username });
  if (existingUser) {
    const token = JWT.sign({ user_id: existingUser._id }, JWT_SECRET_KEY, {
      expiresIn: "2h",
    });
    return res
      .status(200)
      .json({ message: "user created Successfully", token: token });
  }
  return res.status(411).json({
    message: "Error while logging in",
  });
});
const updatedBodySchema = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});
UserRouter.put('/',authMiddleware,async(req,res)=>{
  const updatedBody=req.body;
  const {success}=updatedBodySchema.safeParse(updatedBody);
  if(!success){
   return res.status(411).json({
      message: "Error while updating information"
  })
  }
  await USER.updateOne({_id:req.user.user_id},req.body);
  res.json({
    message: "Updated successfully"
})
})
UserRouter.get('/bulk',authMiddleware,async(req,res)=>{
  const filter=req.query.filter||"";
  const users=await USER.find({
    $or:[
      {
        firstName:{
          "$regex":filter
        }
      },
      {
        lastName:{
          "$regex":filter
        }
      }
    ]
  })
  return res.json({
    users:users.map(user=>({
      username:user.username,
      firstName:user.firstName,
      lastName:user.lastName,
      _id:user._id
    }))
  })
})

module.exports = UserRouter;
