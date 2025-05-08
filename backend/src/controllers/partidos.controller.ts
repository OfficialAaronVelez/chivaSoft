// src/controllers/partidos.controller.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Partido } from '../entities/Partido';

const partidoRepo = AppDataSource.getRepository(Partido);

export const getPartidos = async (_req: Request, res: Response): Promise<void> => {
  const partidos = await partidoRepo.find();
  res.json(partidos);
};

export const createPartido = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fecha, equipo_local, equipo_visitante, resultado, lugar } = req.body;

    const nuevo = partidoRepo.create({
      fecha,
      equipo_local,
      equipo_visitante,
      resultado,
      lugar,
      activo: true,
    });

    await partidoRepo.save(nuevo);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear partido:', error);
    res.status(500).json({ error: 'No se pudo crear el partido' });
  }
};

export const getPartidoById = async (req: Request, res: Response): Promise<void> => {
  const partido = await partidoRepo.findOneBy({ id: Number(req.params.id) });
  if (!partido) {
    res.status(404).json({ error: 'Partido no encontrado' });
    return;
  }
  res.json(partido);
};

export const updatePartido = async (req: Request, res: Response): Promise<void> => {
  const partido = await partidoRepo.findOneBy({ id: Number(req.params.id) });
  if (!partido) {
    res.status(404).json({ error: 'Partido no encontrado' });
    return;
  }
  partidoRepo.merge(partido, req.body);
  const result = await partidoRepo.save(partido);
  res.json(result);
};

export const deletePartido = async (req: Request, res: Response): Promise<void> => {
  const result = await partidoRepo.delete(req.params.id);
  if (result.affected === 0) {
    res.status(404).json({ error: 'Partido no encontrado' });
    return;
  }
  res.json({ message: 'Partido eliminado' });
};