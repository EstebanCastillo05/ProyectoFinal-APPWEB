import express from 'express';
import http from 'http';
import { initSocket } from './sockets/socket'; 
import { sequelize } from './config/database';
import { listenToDB } from './listenDB';
import friendsRoutes from './Routes/myfriends.routes'; 

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use('/api', friendsRoutes);

// Inicializa WebSocket
initSocket(server);

// Conexión a base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida');
    listenToDB();
  })
  .catch(err => console.error('Error de conexión a la base de datos:', err));

// Inicia el servidor
server.listen(3000, () => {
  console.log('Servidor backend escuchando en http://localhost:3000');
});
