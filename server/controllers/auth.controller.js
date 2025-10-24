const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register new user
const register = async (req, res) => {
  // --- NEW LOGGING ---
  console.log('--- Register Attempt ---');
  console.log('Received body:', req.body);
  // --- END LOGGING ---

  try {
    const { username, email, password } = req.body;

    // --- NEW LOGGING ---
    if (!username || !email || !password) {
      console.log('Validation FAILED: Missing fields');
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required.',
      });
    }
    console.log('Validation PASSED: All fields present');
    // --- END LOGGING ---

    // Check if user already exists
    console.log('Checking if email exists...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already registered');
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Create new user
    console.log('Creating new user in database...');
    const user = await User.create({ name: username, email, password });
    console.log('User created successfully:', user._id);
    // --- END LOGGING ---

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    // --- NEW LOGGING ---
    console.error('--- REGISTRATION ERROR ---');
    console.error(error);
    // --- END LOGGING ---
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get current user
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
};

