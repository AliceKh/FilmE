import {Reaction} from "../dbSchemas/dbSchemas.js";

export async function createOrUpdateReaction(userReactingId, reactingToId, timestamp, reactionData) {
    try {
        const existingReaction = await Reaction.findOne({
            UserReacting: userReactingId,
            ReactingTo: reactingToId,
        });

        if (existingReaction) {
            existingReaction.ReactionMetadata.push(reactionData);
            await existingReaction.save();
            return existingReaction;
        }

        const newReaction = new Reaction({
            UserReacting: userReactingId,
            ReactingTo: reactingToId,
            ReactionMetadata: [reactionData],
        });

        await newReaction.save();
        return newReaction;
    } catch (error) {
        console.error('Error creating or updating reaction:', error);
        throw error;
    }
}
