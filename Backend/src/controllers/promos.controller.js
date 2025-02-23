import Hoteles from "../models/hotel.models.js";
import Promos from "../models/promos.models.js";

class PromoController {
  // Agregar Promoción
  async addPromo(req, res) {
    const {
        name,
        id_hotel,
        description,
        discount,
        active = "activa",
        requirement,
    } = req.body;
    if (!name || !id_hotel || !discount || !active || !description || !requirement) {
      return res
        .status(400)
        .json({ status: 400, message: "Todos los campos son obligatorios." });
    }

    try {
        const hotel = await Hoteles.findById(id_hotel);
        if (hotel === null) {
          return res.status(400).json({ status: 400, message: "No existe el Hotel que quieres crearle la promoción" });
        }
        const newPromo = new Promos({
            name,
            id_hotel,
            description,
            discount,
            active,
            requirement
        });
        await newPromo.save();
        res.status(201).json({ status: 201, message: 'Promoción agregado exitosamente', result: newPromo });
    } catch (error) {
      res
        .status(500)
        .json({
          status: 500,
          message: "Error al crear la Promoción: " + error.message,
        });
    }
  }

  // Listar todas las promos
  async allPromos(req, res) {
    try {
        const promos = await Promos.find();
        res.status(200).json({ status: 200, message: 'Promos Listadas exitosamente', result: promos});
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error al mostrar las promos: " + error.message,
      });
    }
  }

  // Editar Promoción
  async editPromo(req, res) {
    const {
        name,
        description,
        discount,
        active,
        requirement,
    } = req.body;
    if (!name || !discount || !active || !description || !requirement) {
      return res
        .status(400)
        .json({ status: 400, message: "Todos los campos son obligatorios." });
    }

    try {
      const promo = await Promos.findById(req.params.id);
      if (!promo) {
        return res
          .status(404)
          .json({ status: 404, message: "No existe la promoción" });
      }
        

      if (name) promo.name = name;
      if (discount) promo.discount = discount;
      if (description) promo.description = description;
      if (requirement) promo.requirement = requirement;
      if (active) promo.active = active;

      await promo.save();
      res
        .status(201)
        .json({
          status: 201,
          message: "Promoción editada exitosamente",
          result: promo,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          status: 500,
          message: "Error al editar la promoción: " + error.message,
        });
    }
  }

  // Eliminar Promoción
  async deletePromo(req, res) {
    const { id } = req.params;

    try {
      const promo = await Promos.findByIdAndDelete(id);
      if (promo != null) {
        return res
          .status(200)
          .json({
            status: 200,
            message: "Promoción eliminada exitosamente",
            result: promo,
          });
      }
      res.status(400).json({ status: 400, message: "No existe la promoción" });
    } catch (error) {
      res
        .status(500)
        .json({
          status: 500,
          message: "Error al eliminar la promoción: " + error.message,
        });
    }
  }
}

export default new PromoController();