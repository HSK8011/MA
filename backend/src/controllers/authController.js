const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// Commented out for development
// const emailService = require('../services/emailService');

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Register new user
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Validate required fields
    if (!fullName || !email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide name, email and password'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already registered'
      });
    }

    // Create new user
    const user = await User.create({
      name: fullName,
      email,
      password,
      role: role || 'Guest' // Default to Guest if not provided
    });

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: user.getPublicProfile()
      },
      message: 'Registration successful.'
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: messages.join('. ')
      });
    }

    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password'
      });
    }

    // Find user and include passwordHash field
    const user = await User.findOne({ email }).select('+passwordHash');
    
    // Check if user exists and password is correct
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect email or password'
      });
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: user.getPublicProfile()
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Request password reset (forgot password)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'No user found with that email address'
      });
    }

    // Generate OTP (6 digits)
    const otp = '000000'; // Hardcoded for development
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Save OTP to user
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpires = otpExpires;
    await user.save({ validateBeforeSave: false });

    // For development, return OTP in response
    res.status(200).json({
      status: 'success',
      message: 'OTP sent successfully',
      data: {
        otp // Only for development
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordOTPExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid or expired OTP'
      });
    }

    // Generate temporary token for password reset
    const resetToken = generateToken(user._id);

    res.status(200).json({
      status: 'success',
      message: 'OTP verified successfully',
      resetToken
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    // Verify reset token
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid or expired reset token'
      });
    }

    // Update password using virtual field
    user.password = newPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpires = undefined;
    await user.save();

    // Generate new auth token
    const token = generateToken(user._id);

    res.status(200).json({
      status: 'success',
      message: 'Password reset successful',
      token
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};