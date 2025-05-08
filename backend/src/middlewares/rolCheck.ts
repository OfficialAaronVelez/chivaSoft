import { Request, Response, NextFunction } from 'express';

export const requireRol = (rolesPermitidos: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    let usuario = req.body.usuario;

    // Si usuario está en query, parsearlo si es una cadena JSON
    if (!usuario && req.query.usuario) {
      try {
        usuario = typeof req.query.usuario === 'string' ? JSON.parse(req.query.usuario) : req.query.usuario;
      } catch (error) {
        res.status(400).json({ error: 'Formato de usuario inválido en query' });
        return;
      }
    }

    console.log('req.body:', req.body);
    console.log('req.query:', req.query);
    console.log('Usuario:', usuario);

    if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
      res.status(403).json({ error: 'Acceso denegado' });
      return;
    }

    next();
  };
};