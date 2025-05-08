import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ unique: true , nullable: false })
  email!: string;

  @Column()
  contrasena!: string;

  @Column({ default: 'operador' })
  rol!: string;
}
