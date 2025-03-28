import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('equipamiento')
export class Equipamiento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tipo!: string;

  @Column()
  estado!: string;

  @Column()
  calidad!: string;

  @Column({ nullable: true })
  asignado_a?: string;

  @Column({ type: 'date' })
  fecha_entrega!: Date;

  @Column({ default: true })
  activo!: boolean;
}
