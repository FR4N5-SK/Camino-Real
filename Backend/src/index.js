import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './database/conecction.js';
dotenv.config();
import { upload } from './middleware/upload.js';
import users from './routes/users.routes.js';
import routes from './routes/routes.routes.js';
import hotel from './routes/hotel.routes.js';
import promos from './routes/promos.routes.js';
import reservas from './routes/reservations.routes.js';

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Definir __dirname en ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/api/users', users);
app.use('/api/routes', routes);
app.use('/api/hotel', hotel);
app.use('/api/promos', promos);
app.use('/api/reservas', reservas);

// Ruta para subir archivos
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.status(201).json({ file: req.file });
  } catch (error) {
    res.status(500).json({ error: 'Error al subir el archivo' });
  }
});

// Middleware para servir archivos estáticos (Imágenes)
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware para servir archivos estáticos (txt)
app.use('/api/exports', express.static(path.join(__dirname, 'exports')));

// Middleware para manejar rutas no definidas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocurrió un error en el servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});