import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
    UserReacting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        description: 'The _id from the user collection of the user reacting',
    },
    ReactingTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upload',
        required: true,
        description: 'The _id from the uploads collection of the upload being reacted to',
    },
    ReactionMetadata: {
        type: [
            {
                joyLikelihood: {
                    type: Number,
                    enum: [0, 1, 2, 3, 4, 5],
                    description: 'Joy likelihood rating as a number',
                    required: true,
                },
                sorrowLikelihood: {
                    type: Number,
                    enum: [0, 1, 2, 3, 4, 5],
                    description: 'Sorrow likelihood rating as a number',
                    required: true,
                },
                angerLikelihood: {
                    type: Number,
                    enum: [0, 1, 2, 3, 4, 5],
                    description: 'Anger likelihood rating as a number',
                    required: true,
                },
                surpriseLikelihood: {
                    type: Number,
                    enum: [0, 1, 2, 3, 4, 5],
                    description: 'Surprise likelihood rating as a number',
                    required: true,
                },
                timestamp: {
                    type: String,
                    description: 'Timestamp of the reaction',
                    required: true,
                },
            },
        ],
    },
});

const Reaction = mongoose.model('Reaction', reactionSchema);

export default Reaction;
