import { Router } from 'express';
import {signin, signup, deleteUser} from '../controllers/user.controller'; 
import {verifyToken} from '../controllers/verifyToken';

const router = Router();

router.get('/', verifyToken, signin);
router.post('/', signup);
router.delete('/:id', deleteUser)

export default router;