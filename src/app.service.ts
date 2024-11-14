import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Consumo } from './app.entity';
import { CreateConsumoDto } from './dto/create-consumo.dto';

@Injectable()
export class ConsumoService {
  constructor(
    @InjectRepository(Consumo)
    private readonly consumoRepository: Repository<Consumo>,
  ) {}

  async registrar(consumoData: CreateConsumoDto): Promise<Consumo> {
    const novoConsumo = this.consumoRepository.create(consumoData);
    return this.consumoRepository.save(novoConsumo);
  }

  async obterHistorico(usuarioId: number, inicio: Date, fim: Date): Promise<Consumo[]> {
    return this.consumoRepository.find({
      where: {
        usuarioId,
        dataLeitura: Between(inicio, fim),
      },
    });
  }

  async verificarAlerta(usuarioId: number): Promise<{ alerta: boolean; mensagem: string }> {
    const consumos = await this.consumoRepository.find({
      where: { usuarioId },
      order: { dataLeitura: 'DESC' },
      take: 2,
    });

    if (consumos.length < 2) {
      return {
        alerta: false,
        mensagem: 'É necessário ter pelo menos dois registros para gerar um alerta.',
      };
    }

    const [ultimoMes, penultimoMes] = consumos;
    const consumoAumentou = ultimoMes.consumo > penultimoMes.consumo;

    return {
      alerta: consumoAumentou,
      mensagem: consumoAumentou
        ? 'Consumo elevado! O consumo deste mês é maior do que o mês anterior.'
        : 'Consumo estável. Não houve aumento em relação ao mês anterior.',
    };
  }
}