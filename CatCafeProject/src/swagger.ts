import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cat Café API',
      version: '1.0.0',
      description: 'API for managing cats, adopters and the staff at a cat café',
    },
    components: {
      schemas: {
        Cat: {
          type: 'object',
          required: ['name', 'age', 'breed', 'dateJoined', 'vaccinated', 'temperament', 'staffInCharge', 'isAdopted'],
          properties: {
            id: {
              type: 'integer',
              description: 'The cat ID',
              example: 1
            },
            name: {
              type: 'string',
              description: 'The cat name',
              example: 'Whiskers'
            },
            age: {
              type: 'integer',
              description: 'The cat age in years',
              example: 3
            },
            breed: {
              type: 'string',
              description: 'The cat breed',
              example: 'Persian'
            },
            dateJoined: {
              type: 'string',
              format: 'date-time',
              description: 'The date the cat joined the café'
            },
            vaccinated: {
              type: 'boolean',
              description: 'Whether the cat is vaccinated'
            },
            temperament: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['Calm', 'Curious', 'Playful', 'Affectionate', 'Independent', 'Shy', 'Dominant', 'Easygoing', 'Aggressive', 'Nervous', 'Social']
              },
              description: 'The cat temperament traits'
            },
            staffInCharge: {
              type: 'string',
              format: 'uuid',
              description: 'The UID of the staff member in charge of the cat',
              example: '00000000-0000-0000-0000-000000000000'
            },
            isAdopted: {
              type: 'boolean',
              description: 'Whether the cat was adopted or not'
            },
            adopterId: {
              type: 'integer',
              description: 'The ID of the adopter of the cat',
              example: 11111111
            }
          }
        },
        CatWithoutID: {
          type: 'object',
          required: ['name', 'age', 'breed', 'dateJoined', 'vaccinated', 'temperament', 'staffInCharge', 'isAdopted'],
          properties: {
            name: {
              type: 'string',
              description: 'The cat name',
              example: 'Whiskers'
            },
            age: {
              type: 'integer',
              description: 'The cat age in years',
              example: 3
            },
            breed: {
              type: 'string',
              description: 'The cat breed',
              example: 'Persian'
            },
            dateJoined: {
              type: 'string',
              format: 'date-time',
              description: 'The date the cat joined the café'
            },
            vaccinated: {
              type: 'boolean',
              description: 'Whether the cat is vaccinated'
            },
            temperament: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['Calm', 'Curious', 'Playful', 'Affectionate', 'Independent', 'Shy', 'Dominant', 'Easygoing', 'Aggressive', 'Nervous', 'Social']
              },
              description: 'The cat temperament traits'
            },
            staffInCharge: {
              type: 'string',
              format: 'uuid',
              description: 'The UID of the staff member in charge of the cat',
              example: '00000000-0000-0000-0000-000000000000'
            },
            isAdopted: {
              type: 'boolean',
              description: 'Whether the cat was adopted or not'
            },
            adopterId: {
              type: 'integer',
              description: 'The ID of the adopter of the cat',
              example: 11111111
            }
          }
        },
        Staff: {
          type: 'object',
          required: ['name', 'lastName', 'age', 'dateJoined', 'role'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'The staff member ID'
            },
            name: {
              type: 'string',
              description: 'First name'
            },
            lastName: {
              type: 'string',
              description: 'Last name'
            },
            age: {
              type: 'integer',
              description: 'Age in years'
            },
            dateJoined: {
              type: 'string',
              format: 'date-time',
              description: 'The date the staff member joined'
            },
            role: {
              type: 'string',
              description: 'The staff member role'
            }
          }
        },
        Adopter: {
          type: 'object',
          required: ['id', 'name', 'lastName', 'dateOfBirth', 'phone', 'address'],
          properties: {
            id: {
              type: 'integer',
              description: 'The adopter ID, without dots and hyphen',
              example: 11111111
            },
            name: {
              type: 'string',
              description: 'First name'
            },
            lastName: {
              type: 'string',
              description: 'Last name'
            },
            dateOfBirth: {
              type: 'string',
              format: 'date-time',
              description: 'The date of birth of the adopter'
            },
            role: {
              type: 'integer',
              description: 'The adopter phone number'
            },
            address: {
              type: 'string',
              description: 'The adopter address'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string'
            }
          }
        }
      },
      securitySchemes: {
        basicAuth: {
          type: 'http',
          scheme: 'basic'
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

export const specs = swaggerJsdoc(options);