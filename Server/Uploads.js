const mongoose = require('mongoose');

const Uploads = new mongoose.Schema({
    LinkToStorage: {
      type: String,
      required: true,
      unique: true,
      description: 'Link to storage (unique by index) from firebase storage'
    },
    LinkToPreviewImage: {
      type: String,
      description: 'Link to preview image from firebase storage'
    },
    Title: {
      type: String,
      description: 'Title'
    },
    Uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
      description: 'Uploader (an _id from Users collection)'
    },
    DateWhenUploaded: {
      type: Date,
      required: true,
      default: Date.now,
      description: 'Date when uploaded'
    },
    Type: {
      type: String,
      enum: ['video', 'audio'],
      required: true,
      description: 'Type: (video/audio)'
    },
    Tags: {
      type: [String],
      description: 'Tags'
    },
    NumberOfReactions: {
      type: Number,
      min: 0,
      default: 0,
      description: 'Number of reactions (amount of _ids on the \'ListOfReactions\' attribute)'
    },
    ListOfReactions: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reactions' }],
      description: 'List of Reactions (list of _ids from reactions collection)'
    }
  });

const Upload = mongoose.model('Uploads', Uploads);

module.exports = Upload;