db.createView("reactionStatistics", "reactions", [
    {
        $unwind: "$ReactionMetadata",
    },
    {
        $group: {
            _id: {
                reactionTo: "$ReactingTo",
                timestamp: "$ReactionMetadata.timestamp",
            },
            totalReactions: {
                $sum: 1,
            },
            joyAvg: {
                $avg: "$ReactionMetadata.joyLikelihood",
            },
            sorrowAvg: {
                $avg: "$ReactionMetadata.sorrowLikelihood",
            },
            angerAvg: {
                $avg: "$ReactionMetadata.angerLikelihood",
            },
            surpriseAvg: {
                $avg: "$ReactionMetadata.surpriseLikelihood",
            },
        },
    },
    {
        $group: {
            _id: "$_id.reactionTo",
            reactions: {
                $push: {
                    timestamp: "$_id.timestamp",
                    totalReactions: "$totalReactions",
                    emotionAvg: {
                        joyAvg: "$joyAvg",
                        sorrowAvg: "$sorrowAvg",
                        angerAvg: "$angerAvg",
                        surpriseAvg: "$surpriseAvg",
                    },
                },
            },
        },
    },
    {
        $sort: {
            "reactions.timestamp": -1,
        },
    },
]);
