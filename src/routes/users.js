import {
    Router
} from 'express';
var router = Router();
import {
    login
} from '../controller/userController';


/**
 * @swagger
 *  /users/login:
 * 	post:
 *  responses:
 *  200:
 *      description: 
 * 
 *
 */
router.post('/login', login);

export default router;