import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TuitsController } from './tuits/tuits.controller';
import { TuitsRepository } from './tuits/tuits.repository';
import { TuitsService } from './tuits/tuits.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestjs',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    TypeOrmModule.forFeature([TuitsRepository]),
  ],
  controllers: [TuitsController],
  providers: [AppService, TuitsService],
})
export class AppModule {}
