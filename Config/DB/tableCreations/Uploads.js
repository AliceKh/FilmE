db.createCollection("Uploads", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'LinkToStorage',
        'Uploader',
        'DateWhenUploaded',
        'Type'
      ],
      properties: {
        LinkToStorage: {
          bsonType: 'string',
          description: 'Link to storage (unique by index) from firebase storage'
        },
        LinkToPreviewImage: {
          bsonType: 'string',
          description: 'Link to preview image from firebase storage'
        },
        Title: {
          bsonType: 'string',
          description: 'Title'
        },
        Uploader: {
          bsonType: 'objectId',
          description: 'Uploader (an _id from Users collection)'
        },
        DateWhenUploaded: {
          bsonType: 'date',
          description: 'Date when uploaded'
        },
        Type: {
          bsonType: 'string',
          'enum': [
            'video',
            'audio'
          ],
          description: 'Type: (video/audio)'
        },
        Tags: {
          bsonType: 'array',
          items: {
            bsonType: 'string'
          },
          description: 'Tags'
        },
        NumberOfReactions: {
          bsonType: 'int',
          minimum: 0,
          description: 'Number of reactions (amount of _ids on the \'ListOfReactions\' attribute)'
        },
        ListOfReactions: {
          bsonType: 'array',
          items: {
            bsonType: 'objectId'
          },
          description: 'List of Reactions (list of _ids from reactions collection)'
        }
      }
    }
  }
});

db.Uploads.createIndex( { "LinkToStorage": 1 }, { unique: true, name: "LinkToStorage_unique" } )
