db.createCollection("Reactions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["UserReacting", "ReactingTo", "ReactionMetadata"],
      properties: {
        UserReacting: {
          bsonType: "objectId",
          description: "The _id from the user collection of the user reacting",
        },
        ReactingTo: {
          bsonType: "objectId",
          description: "The _id from the uploads collection of the upload being reacted to",
        },
        ReactionMetadata: {
          bsonType: "object",
          description: "The metadata related to the reaction",
        }
      }
    }
  }
});

db.Reactions.createIndex(
  { UserReacting: 1, ReactingTo: 1 },
  {
    name: "user_reacting_to_unique",
    unique: true,
    collation: { locale: "en", strength: 2 }
  }
);

