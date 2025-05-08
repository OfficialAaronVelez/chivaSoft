import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Jugador } from "../entities/Jugador"
import { Usuario } from "../entities/Usuarios"
import { Partido } from "../entities/Partido"
import { Equipamiento } from "../entities/Equipamiento"
import { MoreThan } from "typeorm" // Importa MoreThan para comparar fechas

export const getDashboardStats = async (_req: Request, res: Response) => {
  try {
    const jugadorRepo = AppDataSource.getRepository(Jugador)
    const usuarioRepo = AppDataSource.getRepository(Usuario)
    const partidoRepo = AppDataSource.getRepository(Partido)
    const equipamientoRepo = AppDataSource.getRepository(Equipamiento)

    // Contando elementos
    const jugadores = await jugadorRepo.count()
    const usuarios = await usuarioRepo.count()
    const partidos = await partidoRepo.count()
    const equipamiento = await equipamientoRepo.count()

    // Filtrando próximos partidos
    const hoy = new Date()

    const proximosPartidos = await partidoRepo.find({
      where: {
        fecha: MoreThan(hoy),
        activo: true,
      },
      order: {
        fecha: "ASC",
      },
      take: 3,
    })

    res.json({
      jugadores,
      usuarios,
      partidos,
      equipamiento,
      proximosPartidos,
    })
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error)
    res.status(500).json({ error: "Error al obtener estadísticas" })
  }
}