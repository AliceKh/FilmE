import ReactionStatistics from "../../dbSchemas/views/reactionStatistics.js";

export async function getItemById(objectId) {
    try {
        const item = await ReactionStatistics.findById(objectId).exec();
        return item;
    } catch (error) {
        // Handle any errors that occur during the query
        console.error('Error fetching item:', error);
        throw error;
    }
}