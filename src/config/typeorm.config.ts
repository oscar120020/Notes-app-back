import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../users/user.entity';
import { Note } from '../notes/note.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'nestuser',
  password: process.env.DB_PASSWORD || 'nestpass',
  database: process.env.DB_NAME || 'nestdb',
  entities: [User, Note],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
}); 