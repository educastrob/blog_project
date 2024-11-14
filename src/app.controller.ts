import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ConsumoService } from './app.service';
import { CreateConsumoDto } from './dto/create-consumo.dto';

@Controller('consumo')
export class AppController {
  constructor(private readonly consumoService: ConsumoService) {}

  @Post('registro')
  async registrarConsumo(@Body() consumoData: CreateConsumoDto) {
    return this.consumoService.registrar(consumoData);
  }

  @Get('historico')
  async obterHistorico(@Query('usuarioId') usuarioId: number, @Query('inicio') inicio: string, @Query('fim') fim: string) {
    return this.consumoService.obterHistorico(usuarioId, new Date(inicio), new Date(fim));
  }

  @Get('alerta')
  async alertaConsumo(@Query('usuarioId') usuarioId: number) {
    return this.consumoService.verificarAlerta(usuarioId);
  }
}