const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema({
    UserReacting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        description: 'The _id from the user collection of the user reacting'
    },
    ReactingTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upload',
        required: true,
        description: 'The _id from the uploads collection of the upload being reacted to'
    },
    ReactionMetadata: {
        type: mongoose.Schema.Types.Mixed,
        description: 'The metadata related to the reaction'
    }
});

ReactionSchema.index({UserReacting: 1, ReactingTo: 1}, {
    unique: true,
    name: 'user_reacting_to_unique',
    collation: {locale: 'en', strength: 2}
});

const Reaction = mongoose.model('Reaction', ReactionSchema);

module.exports = Reaction;
