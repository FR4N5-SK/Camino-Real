import express from 'express';
import HotelController from '../controllers/hotel.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Rutas agregar rutas turisticas
router.post('/add', authMiddleware(['admin']), upload.single('image'), HotelController.addHotel);


// Rutas agregar rutas turisticas
router.post('/add/review', authMiddleware(['admin', 'user']), HotelController.addReview);

// Ruta editar rutas turisticas
router.put('/edit/:id', authMiddleware(['admin']), upload.single('image'), HotelController.editHotel);

// Ruta para ver todas las rutas turisticas
router.get('/all', HotelController.allHotel);

// Ruta para eliminar rutas turisticas
router.delete('/delete/:id', authMiddleware(['admin']), HotelController.deleteHotel);

export default router;