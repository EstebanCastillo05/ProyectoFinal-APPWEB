// src/Routes/myfriends.routes.ts
import { Router } from 'express';
import { getAllFriends } from '../services/friendService';  // Ruta correcta

const router = Router();

router.get('/friends', async (req, res) => {
  try {
    const friends = await getAllFriends();  // Llamada a la función que recupera los amigos
    res.json(friends);  // Devuelve los amigos como respuesta
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los amigos' });
  }
});

export default router;
