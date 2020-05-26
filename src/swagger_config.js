export const swaggerDoc = {
    'swagger': '2.0',
    'info': {
        'title': 'Image Thumbnail Generator',
        'version': '1.0'
    },
    'host': '',
    'basePath': '/localhost:3000/',
    'schemes': ['https'],
    'paths': {
        '/users/login': {
            'post': {
                'summary': 'Returns a JWT token to user',
                'parameters': [{
                    'name': 'username',
                    'in': 'body',
                    'description': 'username of the user to be logged in',
                    'required': 'true',
                    'schema': {
                        'type': 'string',
                        'minimum': '3',
                        'maximum': '30'
                    }

                }, {
                    'name': 'password',
                    'in': 'body',
                    'description': 'password of the user to be logged in',
                    'required': 'true',
                    'schema': {
                        'type': 'string',
                    }
                }],
                'produces': [
                    'application/json'
                ],
                'responses': {
                    '200': {
                        'description': 'OK',
                        'content': 'application/json',
                        'schema': {
                            'type': 'object',
                            'properties': {
                                'token': {
                                    'type': 'string'
                                },
                                'user': {
                                    'type': 'string'
                                },
                                'authorized': {
                                    'type': 'boolean'
                                }
                            }
                        }

                    }
                }
            }
        },

        '/image/generate-thumbnail': {
            'post': {
                'summary': 'Returns the link to the resized image stored locally',
                'parameters': [{
                    'name': 'imageUrl',
                    'in': 'body',
                    'description': 'Url of the public image to be downloaded and resized',
                    'required': 'true',
                    'schema': {
                        'type': 'string',
                    }

                }, {
                    'name': 'token',
                    'in': 'body',
                    'description': 'token of the authenticated user',
                    'required': 'true',
                    'schema': {
                        'type': 'string',
                    }
                }],
                'produces': [
                    'application/json'
                ],
                'responses': {
                    '200': {
                        'description': 'OK',
                        'content': 'application/json',
                        'schema': {
                            'type': 'object',
                            'properties': {
                                'converted': {
                                    'type': 'string'
                                },
                                'imagePath': {
                                    'type': 'string'
                                },
                                'authorized': {
                                    'type': 'boolean'
                                }
                            }
                        }
                    }
                }
            }
        }
    }


};