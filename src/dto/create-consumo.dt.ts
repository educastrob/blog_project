import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CreateConsumoDto {
  @IsNotEmpty()
  @IsNumber()
  usuarioId: number;

  @IsNotEmpty()
  @IsDate()
  data: Date;

  @IsNotEmpty()
  @IsNumber()
  quantidade: number;
}