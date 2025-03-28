import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Usuario } from '../entities/Usuarios'

const usuarioRepo = AppDataSource.getRepository(Usuario);

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, contrasena } = req.body;

  const user = await usuarioRepo.findOneBy({ email });

  if (!user || user.contrasena !== contrasena) {
    res.status(401).json({ error: 'Credenciales incorrectas' });
    return;
  }

  res.json({
    message: 'Login exitoso',
    usuario: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
    },
  });
};

export const getUsuarios = async (_req: Request, res: Response): Promise<void> => {
  const usuarios = await usuarioRepo.find({
    select: ['id', 'nombre', 'email', 'rol'],
  });
  res.json(usuarios);
};
