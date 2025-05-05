const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const notificationTypesSchema = new mongoose.Schema({
  profileUpdates: { type: Boolean, default: true },
  newUserAdded: { type: Boolean, default: true },
  newSocialProfile: { type: Boolean, default: true },
  newPost: { type: Boolean, default: true },
  approvalRequests: { type: Boolean, default: true },
  requestApproved: { type: Boolean, default: true },
  requestRejected: { type: Boolean, default: true }
}, { _id: false });

const notificationPreferencesSchema = new mongoose.Schema({
  email: { type: Boolean, default: true },
  appNotifications: { type: Boolean, default: true },
  notificationTypes: { type: notificationTypesSchema, default: () => ({}) }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    index: true // As specified in schema.md
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
  passwordHash: {
    type: String,
    select: false
  },
  role: {
    type: String,
    enum: ['Solo Practitioner', 'Social Media Agency', 'Administrator', 'Content Scheduler', 'Social Media Manager', 'Guest'],
    default: 'Guest'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  notificationPreferences: {
    type: notificationPreferencesSchema,
    default: () => ({})
  },
  status: {
    type: String,
    enum: ['active', 'deleted', 'suspended'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  lastLogin: {
    type: Date
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  resetPasswordOTP: String,
  resetPasswordOTPExpires: Date
});

// Virtual field for password
userSchema.virtual('password')
  .set(function(password) {
    if (!password) {
      throw new Error('Password is required');
    }
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    this._password = password;
  })
  .get(function() {
    return this._password;
  });

// Hash password before saving
userSchema.pre('save', async function(next) {
  try {
    // Only hash the password if it's been modified (or is new)
    if (!this._password && !this.isModified('passwordHash')) {
      return next();
    }

    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // If we have a new password, hash it
    if (this._password) {
      this.passwordHash = await bcrypt.hash(this._password, salt);
      this._password = undefined;
    }

    this.updatedAt = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

// Validate required password on new document
userSchema.pre('validate', function(next) {
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!candidatePassword) {
    throw new Error('Password is required for comparison');
  }

  if (!this.passwordHash) {
    throw new Error('No password hash found for this user');
  }

  try {
    return await bcrypt.compare(candidatePassword, this.passwordHash);
  } catch (error) {
    // Log the error for debugging and throw a more user-friendly error
    console.error('Password comparison error:', error);
    throw new Error('Failed to verify password. Please try again.');
  }
};

// Method to get public profile (exclude sensitive data)
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject({ virtuals: true });
  delete userObject.passwordHash;
  delete userObject._password;
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