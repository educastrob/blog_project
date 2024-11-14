import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Consumo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @Column()
  dataLeitura: Date;

  @Column()
  consumo: number;
}
