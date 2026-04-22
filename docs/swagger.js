const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AWS REST API',
      version: '1.0.0',
      description:
        'A production-ready REST API wrapper for AWS services — S3, EBS, Glacier, EC2, and Lambda. Configure your credentials in `.env` and start managing AWS resources via HTTP.',
      license: { name: 'MIT' },
    },
    servers: [{ url: '/api', description: 'API base path' }],
    components: {
      schemas: {
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string' },
            data: { type: 'object' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            code: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
