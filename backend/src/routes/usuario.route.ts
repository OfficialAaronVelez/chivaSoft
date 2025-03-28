import { Router } from 'express';
import { login, getUsuarios } from '../controllers/usuario.controller';

const router = Router();

router.post('/login', login);
router.get('/', getUsuarios);

export default router;
