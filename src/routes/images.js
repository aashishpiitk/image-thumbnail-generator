import { Router } from 'express';
var router = Router();
import { returnThumbnail } from '../controller/imageController';

router.post('/generate-thumbnail', returnThumbnail);

export default router;
