import {
    json
} from 'body-parser';

export const swaggerDoc = {
    openapi: '3.0.0',
    info: {
        title: 'Image Thumbnail Generator',
        version: '1.0',
    },
    host: '',
    basePath: '/',
    schemes: ['https'],
    paths: {
        '/users/login': {
            post: {
                summary: 'Returns a JWT token to user',
                requestBody: {
                    description: 'Give the username and password of the user to be logged in',
                    required: 'true',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    username: {
                                        type: 'string',
                                        example: 'aashishp'
                                    },
                                    password: {
                                        type: 'string',
                                        example: '123456'
                                    }
                                }
                            },
                        },

                    },
                },

                produces: ['application/json'],
                'responses': {
                    '200': {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        token: {
                                            type: 'string',
                                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhc2hpc2hwIiwiaWF0IjoxNTkwNTA4OTUwLCJleHAiOjE1OTA1MTI1NTB9.RUvV-6pM-KoYhPWwMCAFKBE7E8MrzajhrTw-GEJUlUo'
                                        },
                                        user: {
                                            type: 'string',
                                            example: 'aashishp'
                                        },
                                        authorized: {
                                            type: 'boolean'
                                        },
                                    },

                                }
                            }
                        },
                    },
                },
            },
        },

        '/image/generate-thumbnail': {
            post: {
                summary: 'Returns the link to the resized image stored locally',
                requestBody: {
                    description: 'Give the url of the image to be downloaded along with the token generated in users/login request',
                    required: 'true',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    token: {
                                        type: 'string',
                                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhc2hpc2hwIiwiaWF0IjoxNTkwNTA4OTUwLCJleHAiOjE1OTA1MTI1NTB9.RUvV-6pM-KoYhPWwMCAFKBE7E8MrzajhrTw-GEJUlUo'
                                    },
                                    imageUrl: {
                                        type: 'string',
                                        example: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'
                                    }
                                }
                            },
                        },

                    },
                },
                produces: ['application/json'],
                'responses': {
                    '200': {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        converted: {
                                            type: 'boolean',
                                            example: true
                                        },
                                        imagePath: {
                                            type: 'string',
                                            example: 'http://localhost:3000/images/resized/323thumbnail.png'
                                        },
                                        authorized: {
                                            type: 'boolean',
                                            example: true
                                        },
                                    },

                                }
                            }
                        },
                    },
                },
            },
        },
    },
};