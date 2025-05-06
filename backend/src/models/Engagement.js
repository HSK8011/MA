const mongoose = require('mongoose');

const senderSchema = new mongoose.Schema({
  platformId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  profileUrl: String,
  profilePicture: String,
  // Twitter-specific fields
  verified: Boolean,
  followersCount: Number,
  following: Boolean
}, { _id: false });

const contentSchema = new mongoose.Schema({
  text: String,
  mediaUrls: [String],
  links: [String],
  // Twitter-specific fields
  quotedTweetId: String,
  replyToTweetId: String,
  isRetweet: Boolean,
  retweetedTweetId: String
}, { _id: false });

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#000000'
  }
}, { _id: false });

const responseSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  respondedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  respondedAt: {
    type: Date,
    default: Date.now
  },
  // Twitter-specific fields
  replyTweetId: String,
  replyStatus: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending'
  }
}, { _id: false });

const metadataSchema = new mongoose.Schema({
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative'],
    default: 'neutral'
  },
  language: String,
  priority: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  // Twitter-specific fields
  isVerifiedUser: Boolean,
  userInfluenceScore: Number,
  engagementType: {
    type: String,
    enum: ['reply', 'mention', 'quote', 'retweet', 'like']
  }
}, { _id: false });

const engagementSchema = new mongoose.Schema({
  socialAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SocialAccount',
    required: true
  },
  platformMessageId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['comment', 'private_message', 'mention', 'review', 'like', 'share'],
    required: true
  },
  sender: {
    type: senderSchema,
    required: true
  },
  content: contentSchema,
  status: {
    type: String,
    enum: ['pending', 'handled', 'archived', 'spam'],
    default: 'pending'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [tagSchema],
  response: responseSchema,
  metadata: {
    type: metadataSchema,
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
engagementSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes for efficient querying
engagementSchema.index({ socialAccountId: 1, status: 1 });
engagementSchema.index({ assignedTo: 1, status: 1 });
engagementSchema.index({ 'metadata.priority': -1, createdAt: -1 });
engagementSchema.index({ platformMessageId: 1 }, { unique: true });

// Method to update engagement status
engagementSchema.methods.updateStatus = async function(newStatus, userId) {
  this.status = newStatus;
  if (newStatus === 'handled' && !this.response) {
    throw new Error('Cannot mark as handled without a response');
  }
  return this.save();
};

// Method to assign engagement
engagementSchema.methods.assign = async function(userId) {
  this.assignedTo = userId;
  return this.save();
};

// Method to add response
engagementSchema.methods.addResponse = async function(content, userId) {
  this.response = {
    content,
    respondedBy: userId,
    respondedAt: Date.now()
  };
  this.status = 'handled';
  return this.save();
};

const Engagement = mongoose.model('Engagement', engagementSchema);

module.exports = Engagement; 