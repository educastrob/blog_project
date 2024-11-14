import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConsumoService } from './app.service';
import { Consumo } from './app.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database',
      entities: [Consumo],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Consumo]),
  ],
  controllers: [AppController],
  providers: [ConsumoService],
})
export class AppModule {}