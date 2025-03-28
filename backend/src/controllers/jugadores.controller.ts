import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Jugador } from '../entities/Jugador';

const jugadorRepo = AppDataSource.getRepository(Jugador);

export const getJugadores = async (_req: Request, res: Response): Promise<void> => {
  const jugadores = await jugadorRepo.find();
  res.json(jugadores);
};

export const createJugador = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre_completo, fecha_nacimiento, categoria, posicion, fecha_inscripcion } = req.body;

    const nuevo = jugadorRepo.create({
      nombre_completo,
      fecha_nacimiento,
      categoria,
      posicion,
      fecha_inscripcion,
      activo: true,
    });

    await jugadorRepo.save(nuevo);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error creating jugador:', error);
    res.status(500).json({ error: 'Error creating jugador' });
  }
};

export const getJugadorById = async (req: Request, res: Response): Promise<void> => {
  const jugador = await jugadorRepo.findOneBy({ id: Number(req.params.id) });
  if (!jugador) {
    res.status(404).json({ error: 'Jugador no encontrado' });
    return;
  }
  res.json(jugador);
};

export const updateJugador = async (req: Request, res: Response): Promise<void> => {
  const jugador = await jugadorRepo.findOneBy({ id: Number(req.params.id) });
  if (!jugador) {
    res.status(404).json({ error: 'Jugador no encontrado' });
    return;
  }
  jugadorRepo.merge(jugador, req.body);
  const result = await jugadorRepo.save(jugador);
  res.json(result);
};

export const deleteJugador = async (req: Request, res: Response): Promise<void> => {
  const result = await jugadorRepo.delete(req.params.id);
  if (result.affected === 0) {
    res.status(404).json({ error: 'Jugador no encontrado' });
    return;
  }
  res.json({ message: 'Jugador eliminado' });
};
