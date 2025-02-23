import { deleteFile } from "../middleware/upload.js";
import Hoteles from "../models/hotel.models.js";
import Promos from "../models/promos.models.js";
import Reservation from "../models/reservations.models.js";

class HotelController {
  // Agregar Hotel
  async addHotel(req, res) {
    const {
      name,
      description,
      location,
      price,
      room_capacity,
      services,
      stars
    } = req.body;
    if (!name || !description || !location || !price || !room_capacity || !services || !stars) {
      return res
        .status(400)
        .json({ status: 400, message: "Todos los campos son obligatorios." });
    }

    const imagen = req.file ? req.file.filename : null; // Obtener el nombre del archivo si se cargó uno
    if (imagen === null) {
        return res.status(400).json({ status: 400, error: 'Falta una imagen.' });
    }
    let newService = JSON.parse(services)

    try {
        const newHotel = new Hoteles({
          name,
          description,
          location,
          price,
          room_capacity,
          services: newService,
          review: 0,
          stars,
          image: imagen
        });
        await newHotel.save();
        res.status(201).json({ status: 201, message: 'Hotel agregado exitosamente', result: newHotel });
    } catch (error) {
      res
        .status(500)
        .json({
          status: 500,
          message: "Error al crear el hotel: " + error.message,
        });
    }
  }

  // Listar todos los hoteles
  async allHotel(req, res) {
    try {
        const hoteles = await Hoteles.find();
        res.status(200).json({ status: 200, message: 'Hoteles Listados exitosamente', result: hoteles});
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error al mostrar los hoteles: " + error.message,
      });
    }
  }

  // Editar Hotel
  async editHotel(req, res) {
    const {
      name,
      description,
      location,
      price,
      room_capacity,
      services,
      stars,
    } = req.body;

    if (
      !name ||
      !description ||
      !location ||
      !price ||
      !room_capacity ||
      !services ||
      !stars
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios." });
    }

    try {
      const hotel = await Hoteles.findById(req.params.id);
      if (!hotel)
        return res
          .status(404)
          .json({ status: 404, message: "No existe el producto" });

      if (name) hotel.name = name;
      if (description) hotel.description = description;
      if (location) hotel.location = location;
      if (price) hotel.price = price;
      if (room_capacity) hotel.room_capacity = room_capacity;
      if (services) hotel.services = services;
      if (stars) hotel.stars = stars;

      // Manejar la actualización de la imagen
      if (req.file) {
        if (hotel.image) {
          deleteFile(hotel.image);
        }
        hotel.image = req.file.filename;
      }

      await hotel.save();
      res
        .status(201)
        .json({
          status: 201,
          message: "Hotel editado exitosamente",
          result: hotel,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          status: 500,
          message: "Error al editar el hotel: " + error.message,
        });
    }
  }

  // Eliminar Hotel
  async deleteHotel(req, res) {
    const { id } = req.params;

    try {
      const hotel = await Hoteles.findByIdAndDelete(id);
      if (hotel != null) {
        await Reservation.deleteMany({ id_hotel: id });
        await Promos.deleteMany({ id_hotel: id });

        return res
          .status(200)
          .json({
            status: 200,
            message: "Hotel eliminado exitosamente",
            result: hotel,
          });
      }
      res.status(400).json({ status: 400, message: "No existe el Hotel" });
    } catch (error) {
      res
        .status(500)
        .json({
          status: 500,
          message: "Error al eliminar el hotel: " + error.message,
        });
    }
  }
}

export default new HotelController();
