import express from 'express';
import ReservationsController from '../controllers/reservations.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Rutas agregar rutas turisticas
router.post('/add', authMiddleware(['admin', 'user']), ReservationsController.addReserva);

// Rutas agregar rutas turisticas
router.post('/compra', authMiddleware(['admin', 'user']), ReservationsController.compra);

// Ruta para ver todas las rutas turisticas
router.get('/all', ReservationsController.allReservas);

// Ruta para eliminar rutas turisticas
router.delete('/delete/:id', authMiddleware(['admin']), ReservationsController.deleteReserva);

export default router;