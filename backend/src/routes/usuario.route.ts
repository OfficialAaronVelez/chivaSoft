import { Router } from 'express'
import { login, getUsuarios, createUsuario } from '../controllers/usuario.controller'

const router = Router()

router.post('/login', login)
router.get('/', getUsuarios)
router.post('/', createUsuario) // Ruta para crear usuario (restringida a admin)

export default router