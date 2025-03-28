import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Jugador } from './entities/Jugador'; // will be created next
import { Equipamiento } from './entities/Equipamiento';
import dotenv from 'dotenv';
import { Usuario } from './entities/Usuarios';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // auto-create tables on run
  logging: false,
  entities: [Jugador, Equipamiento, Usuario], // add more entities later
});
