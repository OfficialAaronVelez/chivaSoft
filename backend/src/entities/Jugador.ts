import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('jugadores')
export class Jugador {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre_completo!: string;

  @Column({ type: 'date' })
  fecha_nacimiento!: Date;

  @Column()
  categoria!: string;

  @Column({ nullable: true })
  posicion!: string;

  @Column({ type: 'date' })
  fecha_inscripcion!: Date;

  @Column({ default: true })
  activo!: boolean;
}
