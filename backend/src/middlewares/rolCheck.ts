import { Request, Response, NextFunction } from 'express';

export const requireRol = (rolesPermitidos: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const usuario = req.body.usuario || req.query.usuario;

    if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
      res.status(403).json({ error: 'Acceso denegado' });
      return; // ✅ make sure it ends the function
    }

    next(); // ✅ continue if role is allowed
  };
};
