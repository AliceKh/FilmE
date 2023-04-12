const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    UID: {
        type: String,
        required: true,
        unique: true,
        description: 'UID of the user (unique by index) from firebase authentication'
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        description: 'Email of the user (unique by index)'
    },
    Username: {
        type: String,
        required: true,
        unique: true,
        description: 'Username of the user (unique by index)'
    },
    ProfileImage: {
        type: String,
        description: 'Link to user profile image (not required)'
    },
    Bio: {
        type: String,
        description: 'Bio of the user (not required)'
    },
    ExternalLink: {
        type: {
            app: {
                type: String,
                description: 'App name for the external link'
            },
            link: {
                type: String,
                description: 'Link for the external link'
            }
        },
        description: 'External link for the users other social media (not required)'
    },
    NumberOfFollowers: {
        type: Number,
        description: 'Number of followers (not auto calculated), may be replaced with $size (aggregation)'
    },
    NumberOfFollowing: {
        type: Number,
        description: 'Number of following (not auto calculated), may be replaced with $size (aggregation)'
    },
    NumberOfReactions: {
        type: Number,
        description: 'Number of reactions (not auto calculated), may be replaced with $size (aggregation)'
    },
    ListOfFollowers: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            description: '_id of the follower'
        }],
        description: 'List of _ids of followers'
    },
    ListOfFollowing: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            description: '_id of the user being followed'
        }],
        description: 'List of _ids of following'
    },
    ListOfReactions: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reaction',
            description: '_id of the reaction'
        }],
        description: 'List of _ids of reactions'
    },
    ListOfUploads: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Upload',
            description: '_id of the upload'
        }],
        description: 'List of _ids of uploads'
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;


