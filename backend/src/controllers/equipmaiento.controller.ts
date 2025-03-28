import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Equipamiento } from '../entities/Equipamiento';

const equipamientoRepo = AppDataSource.getRepository(Equipamiento);

export const getEquipamiento = async (_req: Request, res: Response): Promise<void> => {
  const items = await equipamientoRepo.find();
  res.json(items);
};

export const createEquipamiento = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tipo, estado, calidad, asignado_a, fecha_entrega } = req.body;

    const nuevo = equipamientoRepo.create({
      tipo,
      estado,
      calidad,
      asignado_a,
      fecha_entrega,
      activo: true,
    });

    await equipamientoRepo.save(nuevo);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear equipamiento:', error);
    res.status(500).json({ error: 'No se pudo crear el equipamiento' });
  }
};

export const updateEquipamiento = async (req: Request, res: Response): Promise<void> => {
  const item = await equipamientoRepo.findOneBy({ id: Number(req.params.id) });
  if (!item) {
    res.status(404).json({ error: 'Equipamiento no encontrado' });
    return;
  }

  equipamientoRepo.merge(item, req.body);
  const result = await equipamientoRepo.save(item);
  res.json(result);
};

export const deleteEquipamiento = async (req: Request, res: Response): Promise<void> => {
  const result = await equipamientoRepo.delete(req.params.id);
  if (result.affected === 0) {
    res.status(404).json({ error: 'Equipamiento no encontrado' });
    return;
  }

  res.json({ message: 'Equipamiento eliminado' });
};

export const reportarDanio = async (req: Request, res: Response): Promise<void> => {
  const item = await equipamientoRepo.findOneBy({ id: Number(req.params.id) });
  if (!item) {
    res.status(404).json({ error: 'Equipamiento no encontrado' });
    return;
  }

  item.estado = 'dañado';
  item.calidad = 'rechazado';

  const result = await equipamientoRepo.save(item);
  res.json(result);
};

export const revertirReporte = async (req: Request, res: Response): Promise<void> => {
  const item = await equipamientoRepo.findOneBy({ id: Number(req.params.id) });
  if (!item) {
    res.status(404).json({ error: 'Equipamiento no encontrado' });
    return;
  }

  item.estado = 'bueno';
  item.calidad = 'aprobado';

  const result = await equipamientoRepo.save(item);
  res.json(result);
};
