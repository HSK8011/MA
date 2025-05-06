const mongoose = require('mongoose');
const crypto = require('crypto');

const scheduleSlotSchema = new mongoose.Schema({
  dayOfWeek: {
    type: Number,
    required: true,
    min: 0,
    max: 6
  },
  timeOfDay: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      },
      message: props => `${props.value} is not a valid time format (HH:mm)!`
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { _id: false });

const metadataSchema = new mongoose.Schema({
  profilePicture: String,
  followerCount: {
    type: Number,
    default: 0
  },
  following: {
    type: Number,
    default: 0
  },
  totalPosts: {
    type: Number,
    default: 0
  },
  // Twitter-specific metadata
  verified: Boolean,
  description: String,
  location: String,
  url: String,
  protected: Boolean,
  createdAt: Date,
  lastTweetId: String
}, { _id: false });

const socialAccountSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  platform: {
    type: String,
    enum: ['twitter', 'facebook', 'instagram', 'linkedin', 'pinterest'],
    required: true
  },
  accountName: {
    type: String,
    required: true
  },
  accountId: {
    type: String,
    required: true
  },
  credentials: {
    accessToken: {
      type: String,
      required: true,
      set: function(token) {
        // Encrypt token before saving
        const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
        let encrypted = cipher.update(token, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
      },
      get: function(token) {
        if (!token) return token;
        // Decrypt token when accessing
        const decipher = crypto.createDecipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
        let decrypted = decipher.update(token, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
      }
    },
    refreshToken: {
      type: String,
      set: function(token) {
        if (!token) return token;
        const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
        let encrypted = cipher.update(token, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
      },
      get: function(token) {
        if (!token) return token;
        const decipher = crypto.createDecipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
        let decrypted = decipher.update(token, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
      }
    },
    tokenExpiresAt: Date
  },
  status: {
    type: String,
    enum: ['active', 'disconnected', 'needs_reauth'],
    default: 'active'
  },
  metadata: {
    type: metadataSchema,
    default: () => ({})
  },
  scheduleSlots: [scheduleSlotSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

// Update the updatedAt timestamp before saving
socialAccountSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure unique social accounts per team
socialAccountSchema.index({ teamId: 1, platform: 1, accountId: 1 }, { unique: true });

// Method to check if token needs refresh
socialAccountSchema.methods.needsTokenRefresh = function() {
  if (!this.credentials.tokenExpiresAt) return true;
  // Return true if token expires in less than 1 hour
  return this.credentials.tokenExpiresAt.getTime() - Date.now() < 3600000;
};

// Method to update metadata
socialAccountSchema.methods.updateMetadata = function(newMetadata) {
  this.metadata = { ...this.metadata.toObject(), ...newMetadata };
  return this.save();
};

const SocialAccount = mongoose.model('SocialAccount', socialAccountSchema);

module.exports = SocialAccount; 