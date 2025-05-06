const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  original: {
    type: String,
    required: true
  },
  shortened: String
}, { _id: false });

const locationSchema = new mongoose.Schema({
  name: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  }
}, { _id: false });

const contentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: 280  // Twitter character limit
  },
  mediaUrls: [String],
  hashtags: [String],
  mentions: [String],
  links: [linkSchema]
}, { _id: false });

const platformPostSchema = new mongoose.Schema({
  socialAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SocialAccount',
    required: true
  },
  platformPostId: String,
  status: {
    type: String,
    enum: ['pending', 'published', 'failed'],
    default: 'pending'
  },
  publishedAt: Date,
  failureReason: String,
  // Twitter-specific metrics
  metrics: {
    likes: { type: Number, default: 0 },
    retweets: { type: Number, default: 0 },
    replies: { type: Number, default: 0 },
    impressions: { type: Number, default: 0 },
    engagementRate: { type: Number, default: 0 }
  }
}, { _id: false });

const approvalSchema = new mongoose.Schema({
  required: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: Date,
  notes: String
}, { _id: false });

const postSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: contentSchema,
    required: true
  },
  location: locationSchema,
  scheduling: {
    status: {
      type: String,
      enum: ['draft', 'pending_approval', 'scheduled', 'published', 'failed'],
      default: 'draft'
    },
    publishAt: Date,
    timeSlotId: mongoose.Schema.Types.ObjectId
  },
  platforms: [platformPostSchema],
  approval: approvalSchema,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

// Update the updatedAt timestamp before saving
postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes for efficient querying
postSchema.index({ teamId: 1, 'scheduling.status': 1 });
postSchema.index({ 'scheduling.publishAt': 1 });
postSchema.index({ creatorId: 1 });

// Method to update metrics
postSchema.methods.updateMetrics = async function(platformId, newMetrics) {
  const platform = this.platforms.id(platformId);
  if (platform) {
    platform.metrics = { ...platform.metrics, ...newMetrics };
    return this.save();
  }
  throw new Error('Platform post not found');
};

// Method to check if post can be published
postSchema.methods.canPublish = function() {
  return this.scheduling.status === 'scheduled' && 
         (!this.approval.required || (this.approval.approvedBy && this.approval.approvedAt));
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post; 