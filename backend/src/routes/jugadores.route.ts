import { Router } from 'express';
import {
  getJugadores,
  createJugador,
  getJugadorById,
  updateJugador,
  deleteJugador
} from '../controllers/jugadores.controller';
import { requireRol } from '../middlewares/rolCheck';


const router = Router();


router.get('/', requireRol(['admin', 'entrenador']), getJugadores);
router.post('/', requireRol(['admin', 'entrenador']), createJugador);
router.get('/:id', requireRol(['admin', 'entrenador']), getJugadorById);
router.put('/:id', requireRol(['admin']), updateJugador);
router.delete('/:id', requireRol(['admin']), deleteJugador);

export default router;
