import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema({
    LinkToStorage: {
        type: String,
        unique: true,
        required: true,
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
        ref: 'User',
        required: true,
        description: 'Uploader (an _id from Users collection)'
    },
    DateWhenUploaded: {
        type: Date,
        required: true,
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
        description: 'Number of reactions (amount of _ids on the \'ListOfReactions\' attribute)'
    },
    ListOfReactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reaction',
        description: 'List of Reactions (list of _ids from reactions collection)'
    }]
});

const Upload = mongoose.model('Uploads', UploadSchema);

export default Upload;
