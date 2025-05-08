import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Jugador } from './entities/Jugador'; // will be created next
import { Equipamiento } from './entities/Equipamiento';
import { Partido } from './entities/Partido'; // will be created next
import dotenv from 'dotenv';
import { Usuario } from './entities/Usuarios';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [Jugador, Equipamiento, Usuario, Partido],
  extra: {
    socketPath: '/tmp/mysql.sock',
  },
});
