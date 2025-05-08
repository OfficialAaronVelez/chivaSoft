import { Router } from 'express';
import {
  getEquipamiento,
  createEquipamiento,
  updateEquipamiento,
  deleteEquipamiento,
  reportarDanio,
  revertirReporte,
} from '../controllers/equipmaiento.controller'
import { requireRol } from '../middlewares/rolCheck';

const router = Router();

router.patch('/:id/revertir', requireRol(['admin', 'entrenador']), revertirReporte);
router.patch('/:id/reportar', requireRol(['admin', 'entrenador']), reportarDanio)
router.get('/', getEquipamiento);
router.post('/', requireRol(['admin', 'entrenador']), createEquipamiento);
router.put('/:id', requireRol(['admin', 'entrenador']), updateEquipamiento);
router.delete('/:id', requireRol(['admin', 'entrenador']), deleteEquipamiento);

export default router;
