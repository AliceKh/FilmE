import Reaction from "../dbSchemas/reaction.js";

export async function createOrUpdateReaction(userReactingId, reactingToId, reactionData) {
    try {
        const existingReaction = await Reaction.findOne({
            UserReacting: userReactingId, ReactingTo: reactingToId,
        });

        if (!!existingReaction) {
            existingReaction.ReactionMetadata.push(reactionData);
            await existingReaction.save(function (err, result) {
                if (err) {
                    throw error;
                } else {
                    console.log(result)
                }
            });
            return existingReaction;
        }

        const newReaction = new Reaction({
            UserReacting: userReactingId, ReactingTo: reactingToId, ReactionMetadata: [reactionData],
        });

        await newReaction.save(function (err, result) {
            if (err) {
                throw error;
            } else {
                console.log(result)
            }
        });
        return newReaction;
    } catch (error) {
        console.error('Error creating or updating reaction:', error);
        throw error;
    }
}
