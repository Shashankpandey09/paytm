const express = require("express");
const JWT = require("jsonwebtoken");
const { USER } = require("../db");
const { JWT_SECRET_KEY } = require("../config");
const authMiddleware = require("../middleware");
const UserRouter = express.Router();

const signUpSchema = Zod.object({
  username: string().email(),
  firstName: string(),
  lastName: string(),
  password: string(),
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

  const token = JWT.sign({ user_id: existingUser._id }, JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});
//sign In route
const SignInSchema = Zod.object({
  username: string().email(),
  password: string(),
});
UserRouter.post("/signIn", async (req, res) => {
  const body = req.body;
  const { success } = SignInSchema.safeParse(req.body);
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
const UpdatedBodySchema=Zod.object({
  password:Zod.string().optional(),
  firstName:Zod.string().optional(),
  lastName:Zod.string().optional()
})
UserRouter.put('/',authMiddleware,async(req,res)=>{
  const updatedBody=req.body;
  const {success}=UpdatedBodySchema.safeParse(updatedBody);
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

module.exports = UserRouter;
