import { Client } from 'pg';
import { emitFriendUpdate } from './sockets/socket';
import { sequelize } from './config/database';

export const listenToDB = async () => {
  await sequelize.authenticate();
  console.log('Conexión de Sequelize establecida.');

  const client = new Client({
    connectionString: 'postgres://postgres:bansaiko@localhost:5432/Proyecto',
  });

  await client.connect();
  await client.query('LISTEN my_friends_update');

  client.on('notification', (msg) => {
    const payload = JSON.parse(msg.payload || '{}');
    console.log('Cambio en base de datos:', payload);
    emitFriendUpdate(payload);
  });

  console.log('Escuchando eventos de PostgreSQL');
};
