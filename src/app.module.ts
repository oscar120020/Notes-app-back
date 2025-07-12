import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'nestuser',
      password: process.env.DB_PASSWORD || 'nestpass',
      database: process.env.DB_NAME || 'nestdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // Deshabilitado para usar migraciones
      logging: process.env.NODE_ENV !== 'production',
    }),
    UsersModule,
    NotesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
