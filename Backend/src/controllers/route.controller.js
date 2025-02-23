import Route from "../models/route.models.js";


class RouteController {
  // Agregar Rutas Turisticas
  async addRoute(req, res) {
    const {
        name,
        description,
        location,
        price,
        services,
        requirement
    } = req.body;
    if (!name || !description || !location || !price || !services || !requirement) {
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
        const newRoute = new Route({
          name,
          description,
          location,
          price,
          services: newService,
          requirement,
          image: imagen
        });
        await newRoute.save();
        res.status(201).json({ status: 201, message: 'Ruta Turística agregado exitosamente', result: newRoute });
    } catch (error) {
      res
        .status(500)
        .json({
          status: 500,
          message: "Error al crear la Ruta Turística: " + error.message,
        });
    }
  }

  // Listar todas las Rutas Turisticas
  async allRoute(req, res) {
    try {
        const routes = await Route.find();
        res.status(200).json({ status: 200, message: 'Rutas Turísticas Listadas exitosamente', result: routes});
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error al mostrar las Rutas Turísticas: " + error.message,
      });
    }
  }

  // Editar Rutas Turisticas
  async editRoute(req, res) {
    const {
        name,
        description,
        location,
        price,
        services,
        requirement,
    } = req.body;
    console.log(req.body)
    if (!name || !description || !location || !price || !services || !requirement) {
        return res
          .status(400)
          .json({ status: 400, message: "Todos los campos son obligatorios." });
    }
    let newService = JSON.parse(services)

    try {
      const route = await Route.findById(req.params.id);
      if (!route) {
        return res
          .status(404)
          .json({ status: 404, message: "No existe la Ruta Turística" });
      }
        

      if (name) route.name = name;
      if (location) route.location = location;
      if (description) route.description = description;
      if (requirement) route.requirement = requirement;
      if (price) route.price = price;
      if (services) route.services = newService

      // Manejar la actualización de la imagen
      if (req.file) {
        if (route.image) {
          deleteFile(promo.image);
        }
        route.image = req.file.filename;
      }

      await route.save();
      res
        .status(201)
        .json({
          status: 201,
          message: "Ruta Turística editada exitosamente",
          result: route,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          status: 500,
          message: "Error al editar la Ruta Turística: " + error.message,
        });
    }
  }

  // Eliminar Rutas Turisticas
  async deleteRoute(req, res) {
    const { id } = req.params;

    try {
      const route = await Route.findByIdAndDelete(id);
      if (route != null) {
        return res
          .status(200)
          .json({
            status: 200,
            message: "Rutas Turísticas eliminada exitosamente",
            result: route,
          });
      }
      res.status(400).json({ status: 400, message: "No existe la Rutas Turísticas" });
    } catch (error) {
      res
        .status(500)
        .json({
          status: 500,
          message: "Error al eliminar la Rutas Turísticas: " + error.message,
        });
    }
  }
}

export default new RouteController();