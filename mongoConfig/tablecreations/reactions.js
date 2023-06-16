db.createCollection("reactions", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["UserReacting", "ReactingTo", "ReactionMetadata"],
            properties: {
                UserReacting: {
                    bsonType: "objectId",
                    description: "The _id from the user collection of the user reacting"
                },
                ReactingTo: {
                    bsonType: "objectId",
                    description: "The _id from the uploads collection of the upload being reacted to"
                },
                ReactionMetadata: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["joyLikelihood", "sorrowLikelihood", "angerLikelihood", "surpriseLikelihood", "timestamp"],
                        properties: {
                            joyLikelihood: {
                                bsonType: "int",
                                enum: [0, 1, 2, 3, 4, 5],
                                description: "Joy likelihood rating as a number"
                            },
                            sorrowLikelihood: {
                                bsonType: "int",
                                enum: [0, 1, 2, 3, 4, 5],
                                description: "Sorrow likelihood rating as a number"
                            },
                            angerLikelihood: {
                                bsonType: "int",
                                enum: [0, 1, 2, 3, 4, 5],
                                description: "Anger likelihood rating as a number"
                            },
                            surpriseLikelihood: {
                                bsonType: "int",
                                enum: [0, 1, 2, 3, 4, 5],
                                description: "Surprise likelihood rating as a number"
                            },
                            timestamp: {
                                bsonType: "string",
                                description: "Timestamp of the reaction"
                            }
                        }
                    }
                }
            }
        }
    }
});

db.reactions.createIndex({ UserReacting: 1, ReactingTo: 1 });
