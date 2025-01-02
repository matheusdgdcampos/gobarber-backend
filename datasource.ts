import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from "typeorm";
import { User } from './src/modules/users/entities/user.entity';
import { Appointment } from './src/modules/appointments/entities/appointment.entity';

const dbName = process.env.DATABASE_DBNAME;
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATAABSE_PASSWORD;
const host = 'localhost';
const postgresUrlConnection = `postgresql://${username}:${password}@${host}:5432/${dbName}`

export const typeormDatasource = new DataSource({
  type: 'postgres',
  url: postgresUrlConnection,
  migrations: ['src/config/database/migrations/*.ts'],
  entities: [User, Appointment]
})
