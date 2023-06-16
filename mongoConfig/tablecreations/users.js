db.createCollection("Users", {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            title: 'User',
            required: [
                'UID',
                'Email',
                'Username'
            ],
            properties: {
                UID: {
                    bsonType: 'string',
                    description: 'UID of the user (unique by index) from firebase authentication'
                },
                Email: {
                    bsonType: 'string',
                    description: 'Email of the user (unique by index)'
                },
                Username: {
                    bsonType: 'string',
                    description: 'Username of the user (unique by index)'
                },
                ProfileImage: {
                    bsonType: 'string',
                    description: 'Link to user profile image (not required)'
                },
                Bio: {
                    bsonType: 'string',
                    description: 'Bio of the user (not required)'
                },
                ExternalLink: {
                    bsonType: 'object',
                    description: 'External link for the users other social media (not required)',
                    properties: {
                        app: {
                            bsonType: 'string',
                            description: 'App name for the external link'
                        },
                        link: {
                            bsonType: 'string',
                            description: 'Link for the external link'
                        }
                    }
                },
                NumberOfFollowers: {
                    bsonType: 'int',
                    description: 'Number of followers (not auto calculated), may be replaced with $size (aggregation)'
                },
                NumberOfFollowing: {
                    bsonType: 'int',
                    description: 'Number of following (not auto calculated), may be replaced with $size (aggregation)'
                },
                NumberOfReactions: {
                    bsonType: 'int',
                    description: 'Number of reactions (not auto calculated), may be replaced with $size (aggregation)'
                },
                ListOfFollowers: {
                    bsonType: 'array',
                    description: 'List of _ids of followers',
                    items: {
                        bsonType: 'objectId',
                        description: '_id of the follower'
                    }
                },
                ListOfFollowing: {
                    bsonType: 'array',
                    description: 'List of _ids of following',
                    items: {
                        bsonType: 'objectId',
                        description: '_id of the user being followed'
                    }
                },
                ListOfReactions: {
                    bsonType: 'array',
                    description: 'List of _ids of reactions',
                    items: {
                        bsonType: 'objectId',
                        description: '_id of the reaction'
                    }
                },
                ListOfUploads: {
                    bsonType: 'array',
                    description: 'List of _ids of uploads',
                    items: {
                        bsonType: 'objectId',
                        description: '_id of the upload'
                    }
                }
            }
        }
    }
})

db.Users.createIndex( { "UID": 1 }, { unique: true, name: "UID_unique" } )
db.Users.createIndex( { "Email": 1 }, { unique: true, name: "Email_unique" } )
db.Users.createIndex( { "Username": 1 }, { unique: true, name: "Username_unique" } )