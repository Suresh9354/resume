const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ status: "error", message: "Please provide all required fields" });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ status: "error", message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    if (user) {
      // Generate token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      res.status(201).json({
        status: "success",
        user: { _id: user._id, name: user.name, email: user.email },
        token
      });
    } else {
      res.status(400).json({ status: "error", message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      res.status(200).json({
        status: "success",
        user: { _id: user._id, name: user.name, email: user.email },
        token
      });
    } else {
      res.status(401).json({ status: "error", message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const firebaseLogin = async (req, res) => {
  try {
    let { name, email, uid } = req.body;

    if (!uid) {
      return res.status(400).json({ status: "error", message: "Firebase authentication missing UID" });
    }

    if (!email) {
      email = `${uid}@social.auth.com`;
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create user if not exists (social register)
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(uid + process.env.JWT_SECRET, salt);
      
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        password: hashedPassword
      });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(200).json({
      status: "success",
      user: { _id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = { registerUser, loginUser, getMe, firebaseLogin };
