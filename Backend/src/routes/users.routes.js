import express from 'express';
import UserController from '../controllers/users.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Rutas para registrar usuarios
router.post('/register', UserController.registerUser);

// Ruta para iniciar sesión
router.post('/login', UserController.loginUser);


router.get('/all', authMiddleware(['admin']), UserController.allUsers);

// Ruta para eliminar usuarios
router.delete('/delete/:id', authMiddleware(['admin']), UserController.deleteUser);

export default router;