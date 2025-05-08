import { Sequelize } from 'sequelize-typescript';
import { MyFriend } from '../models/MyFriend';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'bansaiko',
  database: 'Proyecto',
  models: [MyFriend], 
});
