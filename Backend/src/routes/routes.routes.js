import express from 'express';
import RouteController from '../controllers/route.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Rutas agregar rutas turisticas
router.post('/add', authMiddleware(['admin']), upload.single('image'), RouteController.addRoute);

// Ruta editar rutas turisticas
router.put('/edit/:id', authMiddleware(['admin']), upload.single('image'), RouteController.editRoute);

// Ruta para ver todas las rutas turisticas
router.get('/all', RouteController.allRoute);

// Ruta para eliminar rutas turisticas
router.delete('/delete/:id', authMiddleware(['admin']), RouteController.deleteRoute);

export default router;