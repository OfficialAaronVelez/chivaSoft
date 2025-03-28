import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import jugadoresRouter from './routes/jugadores.route'
import equipamientoRouter from './routes/equipamiento.route'
import usuarioRouter from './routes/usuario.route'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/jugadores', jugadoresRouter);
app.use('/api/equipamiento', equipamientoRouter)
app.use('/api/usuarios', usuarioRouter);

AppDataSource.initialize()
  .then(() => {
    console.log('📦 DB connected');
    app.listen(3000, () => {
      console.log('🚀 Server running at http://localhost:3000');
    });
  })
  .catch((error) => console.error('❌ Error connecting to DB', error));
