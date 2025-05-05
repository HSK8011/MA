const mongoose = require('mongoose');

const permissionsSchema = new mongoose.Schema({
  manageSocialAccounts: { type: Boolean, default: false },
  manageUsers: { type: Boolean, default: false },
  managePosts: { type: Boolean, default: false },
  approvePosts: { type: Boolean, default: false },
  manageEngagements: { type: Boolean, default: false },
  viewAnalytics: { type: Boolean, default: false },
  manageTeam: { type: Boolean, default: false },
  manageBilling: { type: Boolean, default: false }
}, { _id: false });

const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['admin', 'member', 'moderator', 'analyst', 'content_creator'],
    required: true
  },
  permissions: {
    type: permissionsSchema,
    default: () => ({})
  },
  assignedAt: {
    type: Date,
    default: Date.now
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { _id: false });

const userRoleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  entityType: {
    type: String,
    enum: ['team', 'account', 'organization'],
    required: true
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'entityType'
  },
  roles: [roleSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

// Update the updatedAt timestamp before saving
userRoleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Compound index to ensure a user can't have multiple role entries for the same entity
userRoleSchema.index({ userId: 1, entityType: 1, entityId: 1 }, { unique: true });

const UserRole = mongoose.model('UserRole', userRoleSchema);

module.exports = UserRole; 