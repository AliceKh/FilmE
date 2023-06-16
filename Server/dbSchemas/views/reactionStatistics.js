import mongoose from 'mongoose';

const ReactionStatisticsSchema = new mongoose.Schema({
    reactionsByTimestamp: [
        {
            timestamp: String,
            totalReactions: Number,
            emotionSum: {
                joySum: Number,
                sorrowSum: Number,
                angerSum: Number,
                surpriseSum: Number
            }
        }
    ]
});

const ReactionStatistics = mongoose.model('ReactionStatistics', ReactionStatisticsSchema, 'reactionStatistics');

export default ReactionStatistics;