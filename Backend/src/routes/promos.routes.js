import express from 'express';
import PromosController from '../controllers/promos.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Rutas agregar rutas turisticas
router.post('/add', authMiddleware(['admin']), PromosController.addPromo);

// Ruta editar rutas turisticas
router.put('/edit/:id', authMiddleware(['admin']), PromosController.editPromo);

// Ruta para ver todas las rutas turisticas
router.get('/all', PromosController.allPromos);

// Ruta para eliminar rutas turisticas
router.delete('/delete/:id', authMiddleware(['admin']), PromosController.deletePromo);

export default router;