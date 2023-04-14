const mongoose = require('mongoose');

const Users = new mongoose.Schema({
  UID: {
    type: String,
    required: true,
    unique: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Username: {
    type: String,
    required: true,
    unique: true
  },
  ProfileImage: {
    type: String
  },
  Bio: {
    type: String
  },
  ExternalLink: {
    app: {
      type: String
    },
    link: {
      type: String
    }
  },
  NumberOfFollowers: {
    type: Number,
    default: 0
  },
  NumberOfFollowing: {
    type: Number,
    default: 0
  },
  NumberOfReactions: {
    type: Number,
    default: 0
  },
  ListOfFollowers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    }
  ],
  ListOfFollowing: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    }
  ],
  ListOfReactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reactions'
    }
  ],
  ListOfUploads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Uploads'
    }
  ]
});

const User = mongoose.model('Users', Users);

module.exports = User;