import express from 'express';

const router = express.Router();

// Ruta para listar todas las categorias
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


export default router;