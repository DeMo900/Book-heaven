// Core dependencies
const um = require("../models/user");
const tm = require("../models/token");
const bcrypt = require("bcrypt");
const validate = require("../validation/user");
const { body, validationResult } = require("express-validator");
const mail = require("nodemailer");
const crypto = require("crypto");
const emitter = require("../emiter.js");
const redis = require("../lib/redis/redis");
require("../emiter.js");

// Handle user registration
exports.Postsignup = async (req, res) => {
  // Validate request payload
  const { username, email, password } = req.body;
  const { error } = validate(req.body, "signup");
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // Check for existing user
  try {
    const user = await um.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }
    
    // Hash password and save new user
    const hashedpassword = await bcrypt.hash(password, 11);
    await um.create({ username, email, password: hashedpassword });
    
    return res.redirect("/signin");
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
// Handle user authentication
exports.Postsignin = async (req, res) => {
  // Ensure required fields are provided
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill in all the fields" });
  }
  
  try {
    // Verify user exists
    const user = await um.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: `Invalid email/password` });
    }
    
    // Validate password
    const IsPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!IsPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email/password" });
    }
    
    // Trigger login event
    emitter.emit("loggedIn", req.body.email, user.username);
    
    // Initialize user session
    req.session.user = { email: req.body.email, id: user._id };
    return res.status(200).json({ message: "logged in" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Initiate password reset process
exports.Postforgotpassword = async (req, res) => {
  // Validate input
  const { email } = req.body;
  try {
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res.status(400).json({ error: results.errors[0].msg });
    }
    let isFound = await um.findOne({ email });
    if (!isFound) {
      return res.status(400).json({ error: "email doesn't exist signup" });
    }
    
    // Generate secure reset token
    let code = crypto.randomBytes(16).toString("hex");
    
    // Clean up any existing tokens for this user
    await redis.del(`token:${email}`);
    
    // Store new token in Redis
    await redis.set(`token:${email}`, code);
    
    // Configure email transport
    let transport = mail.createTransport({
      service: "gmail",
      auth: {
        user: "proplayer524522@gmail.com",
        pass: process.env.APPCODE,
      },
    });
    
    // Send password reset email
    await transport.sendMail({
      to: req.body.email,
      subject: "Here is your url to reset your password",
      text: `${process.env.BASE_URL}/update-password?code=${code}`,
    });
    return res
      .status(200)
      .json({ message: "check your email to reset your password" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Validate password reset code
exports.Getupdate = async (req, res) => {
  const token = await redis.get(`token:${req.query.code}`);
  if (!token) {
    return res.status(400).json({ error: "invalid code" });
  }
  return res.status(200).json({ email: token });
};

// Update user password
exports.Putupdate = async (req, res) => {
  try {
    // Validate password constraints
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res.status(400).json({ error: results.errors[0].msg });
    }
    const {email ,password } = req.body;
    
    // Hash new password and update user record
    let hashedpassword = await bcrypt.hash(password, 11);
    await um.updateOne({ email }, { $set: { password: hashedpassword } });
    
    // Invalidate the reset token
    await redis.del(`token:${email}`);
    
    return res.status(200).json({ message: "password updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
