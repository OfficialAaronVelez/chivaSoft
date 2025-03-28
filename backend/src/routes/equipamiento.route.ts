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

router.patch('/:id/revertir', requireRol(['admin,operdador']), revertirReporte);
router.patch('/:id/reportar', requireRol(['admin,operdador']), reportarDanio)
router.get('/', getEquipamiento);
router.post('/', requireRol(['admin,operdador']), createEquipamiento);
router.put('/:id', requireRol(['admin,operdador']), updateEquipamiento);
router.delete('/:id', requireRol(['admin,operdador']), deleteEquipamiento);

export default router;
