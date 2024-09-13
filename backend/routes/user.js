const express = require("express");
const JWT = require("jsonwebtoken");
const { USER, Account } = require("../db");
const authMiddleware = require("../middleware");
const { z } = require("zod");
require('dotenv').config();
const mongoose = require('mongoose');
const UserRouter = express.Router();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Sign-Up Schema
const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string().email(),
  password: z.string(),
});

// Sign-Up Route
UserRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const { success, error } = signUpSchema.safeParse(body);

  if (!success) {
    return res.status(400).json({ message: "Incorrect inputs", errors: error.errors });
  }

  try {
    const existingUser = await USER.findOne({ username: body.username });
    if (existingUser) {
      return res.status(400).json({ message: "Email already taken" });
    }

    const user = new USER(body);
    await user.save();

    const token = JWT.sign({ user_id: user._id }, JWT_SECRET_KEY);
    await Account.create({ userId: user._id, balance: 1 + Math.random() * 10000 });

    return res.status(201).json({ message: "User created successfully", token, username: user.username });
  } catch (err) {
    console.error("Error in /signup route:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Sign-In Schema
const signInSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

// Sign-In Route
UserRouter.post("/signIn", async (req, res) => {
  const body = req.body; // Corrected from destructuring data
  const { success, error } = signInSchema.safeParse(body);

  if (!success) {
    return res.status(400).json({ message: "Error while logging in", errors: error.errors });
  }

  try {
    const existingUser = await USER.findOne({ username: body.username, password: body.password });

    if (existingUser) {
      const token = JWT.sign({ user_id: existingUser._id }, JWT_SECRET_KEY);
      return res.status(200).json({ message: "Logged in successfully", token, username: existingUser.username });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    console.error("Error in /signIn route:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update User Schema
const updatedBodySchema = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

// Update User Route
UserRouter.put('/', authMiddleware, async (req, res) => {
  const updatedBody = req.body;
  const { success, error } = updatedBodySchema.safeParse(updatedBody);

  if (!success) {
    return res.status(400).json({ message: "Error while updating information", errors: error.errors });
  }

  try {
    await USER.updateOne({ _id: req.user.user_id }, updatedBody);
    return res.json({ message: "Updated successfully" });
  } catch (err) {
    console.error("Error in /update route:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

UserRouter.get('/bulk', authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  try {
    // Apply filtering only if filter is non-empty
    const query = filter
      ? {
          $or: [
            { firstName: { $regex: filter, $options: "i" } }, // Case-insensitive regex
            { lastName: { $regex: filter, $options: "i" } }
          ]
        }
      : {};

    const users = await USER.find(query);

    return res.json({
      users: users
        .filter((me) => req.user.user_id.toString() !== me._id.toString()) // Corrected toString()
        .map((user) => ({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id,
        }))
    });
  } catch (err) {
    console.error("Error in /bulk route:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

UserRouter.get('/users', authMiddleware, async (req, res) => {
  const { user_id } = req.user;

  try {
    // Ensure user_id is an ObjectId if your _id fields are of type ObjectId
    const users = await USER.aggregate([
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(user_id) } } }, // Exclude the logged-in user
      { $sample: { size: 10 } } // Fetch 10 random users
    ]);

    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

module.exports = UserRouter;
