import { Router } from "express"
import { getDashboardStats } from "../controllers/dashboard.controller"

const router = Router()

router.get("/estadisticas", getDashboardStats)

export default router