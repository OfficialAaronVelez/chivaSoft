// src/entities/Partido.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('partidos')
export class Partido {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  fecha!: Date;

  @Column()
  equipo_local!: string;

  @Column()
  equipo_visitante!: string;

  @Column({ nullable: true })
  resultado?: string;

  @Column()
  lugar!: string;

  @Column({ default: true })
  activo!: boolean;
}