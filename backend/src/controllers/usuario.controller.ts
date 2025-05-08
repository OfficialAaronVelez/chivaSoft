import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Usuario } from '../entities/Usuarios'

const usuarioRepo = AppDataSource.getRepository(Usuario)

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, contrasena } = req.body

  const user = await usuarioRepo.findOneBy({ email })

  if (!user || user.contrasena !== contrasena) {
    res.status(401).json({ error: 'Credenciales incorrectas' })
    return
  }

  res.json({
    message: 'Login exitoso',
    usuario: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
    },
  })
}

export const getUsuarios = async (_req: Request, res: Response): Promise<void> => {
  const usuarios = await usuarioRepo.find({
    select: ['id', 'nombre', 'email', 'rol'],
  })
  res.json(usuarios)
}

// NUEVO: Crear usuario (solo admin)
export const createUsuario = async (req: Request, res: Response): Promise<void> => {
  const { nombre, email, contrasena, rol, usuario } = req.body

  if (!usuario || usuario.rol !== 'admin') {
    res.status(403).json({ error: 'Acceso denegado: Solo administradores pueden crear usuarios' })
    return
  }

  try {
    const existe = await usuarioRepo.findOneBy({ email })
    if (existe) {
      res.status(400).json({ error: 'Ya existe un usuario con ese email' })
      return
    }

    const nuevoUsuario = usuarioRepo.create({ nombre, email, contrasena, rol })
    await usuarioRepo.save(nuevoUsuario)

    res.status(201).json({ message: 'Usuario creado correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error del servidor al crear el usuario' })
  }
}