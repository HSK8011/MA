const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phoneNumber: {
    type: String,
    default: null,
    validate: {
      validator: function(v) {
        // Return true if null (optional field) or if matches phone format
        return v === null || /^\+?[1-9]\d{1,14}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number! Please use international format.`
    },
    trim: true
  },
  timezone: {
    type: String,
    default: 'UTC',
    validate: {
      validator: function(v) {
        if (!v) return false;
        
        try {
          // This will throw an error if timezone is invalid
          Intl.DateTimeFormat(undefined, { timeZone: v });
          return true;
        } catch (error) {
          // Log the error for debugging purposes
          console.error(`Invalid timezone validation error for value "${v}":`, error);
          return false;
        }
      },
      message: props => `${props.value} is not a valid timezone! Please use IANA timezone format (e.g., 'America/New_York', 'Asia/Tokyo').`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Don't return password in queries by default
  },
  role: {
    type: String,
    enum: ['Solo Practitioner', 'Social Media Agency', 'Administrator', 'Content Scheduler', 'Social Media Manager', 'Guest'],
    default: 'Guest'
  },
  isEmailVerified: {
    type: Boolean,
    default: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  resetPasswordOTP: String,
  resetPasswordOTPExpires: Date,
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.updatedAt = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!candidatePassword) {
    throw new Error('Password is required for comparison');
  }

  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    // Log the error for debugging and throw a more user-friendly error
    console.error('Password comparison error:', error);
    throw new Error('Failed to verify password. Please try again.');
  }
};

// Method to get public profile (exclude sensitive data)
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.resetPasswordToken;
  delete userObject.resetPasswordExpires;
  return userObject;
};

// Helper method to format date/time according to user's timezone
userSchema.methods.formatDateTime = function(date) {
  if (!date) {
    throw new Error('Date is required for formatting');
  }

  try {
    return new Date(date).toLocaleString('en-US', {
      timeZone: this.timezone
    });
  } catch (error) {
    console.error('Date formatting error:', error);
    // Return UTC formatted date as fallback
    return new Date(date).toLocaleString('en-US', {
      timeZone: 'UTC'
    });
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User; 