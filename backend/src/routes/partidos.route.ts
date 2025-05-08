// src/routes/partidos.route.ts
import { Router } from 'express';
import {
  getPartidos,
  createPartido,
  getPartidoById,
  updatePartido,
  deletePartido,
} from '../controllers/partidos.controller';
import { requireRol } from '../middlewares/rolCheck';

const router = Router();

router.get('/', requireRol(['admin', 'entrenador']), getPartidos);
router.post('/', requireRol(['admin']), createPartido);
router.get('/:id', requireRol(['admin', 'entrenador']), getPartidoById);
router.put('/:id', requireRol(['admin']), updatePartido);
router.delete('/:id', requireRol(['admin']), deletePartido);

export default router;