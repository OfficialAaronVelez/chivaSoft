import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import jugadoresRouter from './routes/jugadores.route'
import equipamientoRouter from './routes/equipamiento.route'
import usuarioRouter from './routes/usuario.route'
import partidosRouter from './routes/partidos.route'
import dashboardRouter from './routes/dashboard.route'
console.log('ENV:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  pass: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
});
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/jugadores', jugadoresRouter);
app.use('/api/equipamiento', equipamientoRouter)
app.use('/api/usuarios', usuarioRouter);
app.use('/api/partidos', partidosRouter);
app.use('/api/dashboard', dashboardRouter);
AppDataSource.initialize()
  .then(() => {
    console.log('📦 DB connected');
    app.listen(3001, () => {
      console.log('🚀 Server running at http://localhost:3000');
    });
  })
  .catch((error) => console.error('❌ Error connecting to DB', error));
