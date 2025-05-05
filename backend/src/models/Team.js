const mongoose = require('mongoose');

const teamSettingsSchema = new mongoose.Schema({
  defaultTimezone: {
    type: String,
    default: 'UTC',
    validate: {
      validator: function(v) {
        try {
          Intl.DateTimeFormat(undefined, { timeZone: v });
          return true;
        } catch (error) {
          return false;
        }
      },
      message: props => `${props.value} is not a valid timezone!`
    }
  },
  approvalRequired: {
    type: Boolean,
    default: false
  },
  autoScheduling: {
    type: Boolean,
    default: false
  }
}, { _id: false });

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Team name is required'],
    trim: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  settings: {
    type: teamSettingsSchema,
    default: () => ({})
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

// Update the updatedAt timestamp before saving
teamSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure team names are unique per owner
teamSchema.index({ ownerId: 1, name: 1 }, { unique: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team; 