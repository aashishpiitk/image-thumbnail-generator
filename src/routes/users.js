import {
    Router
} from 'express';
var router = Router();
import {
    login
} from '../controller/userController';

router.post('/login', login);

export default router;