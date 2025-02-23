import Hoteles from "../models/hotel.models.js";
import Promos from "../models/promos.models.js";
import Reservation from "../models/reservations.models.js";
import jwt from 'jsonwebtoken';
import User from "../models/users.models.js";
import transporter from "../middleware/nodemailer.js";

class ReservationController {
  // Agregar Reservación
  async addReserva(req, res) {
    const {
        id_hotel,
        date_start,
        date_end,
        people,
        promo,
        cash,
        payment,
        code,
    } = req.body;
    if (!id_hotel || !date_start || !date_end || !people || !promo || !cash || !payment || !code) {
      return res
        .status(400)
        .json({ status: 400, message: "Todos los campos son obligatorios." });
    }

    if (date_start >= date_end) {
        return res.status(400).json({ status: 400, message: "La fecha de inicio de ser menor que la de salida" }); 
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {
        const hotel = await Hoteles.findById(id_hotel);
        if (hotel === null) {
          return res.status(400).json({ status: 400, message: "No existe el Hotel que quieres reservar" });
        }
        if (hotel.room_capacity < people) {
          return res.status(400).json({ status: 400, message: "No existe se puede reservar en este hotel porque no tiene la capacidada para esa cantidad de personas" });
        }
        const reservas = await Reservation.find({id_hotel: id_hotel})
        let mal = false
        reservas.forEach(item => {
            if (date_start >= item.date_start && date_start <= item.date_end || (date_end >= item.date_start && date_end <= item.date_end)) {
                mal = true
            }
        });
        if (mal) {
          return res.status(400).json({ status: 400, message: "Ya esta reservado el hotel para ese rango de fecha" }); 
        }

        const user = await User.findById(decoded.id);
        if (user === null) {
            return res.status(400).json({ status: 400, message: "No existe el usuario" });
        }

        const newReserva = new Reservation({
          id_hotel,
          date_start,
          date_end,
          people,
          promo,
          cash,
          payment,
          code,
          email_user: user.email,
          name_user: user.name + " " + user.lastname 
        });
        await newReserva.save();
        const info = await transporter.sendMail({
          from: '"CaminoReal" <huzanggelo0904@gmail.com>', // sender address
          to: user.email, // list of receivers
          subject: "Reservación Realizada en CaminoReal", // Subject line
          html: "<b>Espero se encuentre bien estimada/o " + user.name + " " + user.lastname + ". Usted realizo una reservación en nuestra cadena de hoteles en la siguiente Fecha de Inicio: " + date_start + " y la Fecha de salida es " +date_end+ ". Teniendo un costo de $"+cash+" por el hospedaje de "+people+" personas.</b>", // html body
        });
        res.status(201).json({ status: 201, message: 'Reserva creada exitosamente', result: newReserva });
    } catch (error) {
      res
        .status(500)
        .json({
          status: 500,
          message: "Error al crear la Reserva: " + error.message,
        });
    }
  }

    // Comprar Ruta de Viaje
    async compra(req, res) {
      const { name, people, cash, code, payment } = req.body;
      if (!name || !people || !cash || !payment || !code) {
        return res
          .status(400)
          .json({ status: 400, message: "Todos los campos son obligatorios." });
      }
  
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      try {
        const user = await User.findById(decoded.id);
        if (user === null) {
          return res
            .status(400)
            .json({ status: 400, message: "No existe el usuario" });
        }

        const info = await transporter.sendMail({
          from: '"CaminoReal" <huzanggelo0904@gmail.com>', // sender address
          to: user.email, // list of receivers
          subject: "Ruta de Viaje Comprada en CaminoReal", // Subject line
          html:
            "<b>Espero se encuentre bien estimada/o " +
            user.name +
            " " +
            user.lastname +
            ". Usted realizo una compra de una ruta de Viaje en Camino Real que tiene un costo de: " +
            cash +
            " por el viaje de " +
            people +
            " personas. En el cual tiene por nombre: "+ name +"</b>", // html body
        });
        res
          .status(201)
          .json({
            status: 201,
            message: "Reserva creada exitosamente",
            result: newReserva,
          });
      } catch (error) {
        res.status(500).json({
          status: 500,
          message: "Error al crear la Reserva: " + error.message,
        });
      }
    }

  // Listar todas las reservas
  async allReservas(req, res) {
    try {
        const reservas = await Reservation.find();
        res.status(200).json({ status: 200, message: 'Reservas Listadas exitosamente', result: reservas});
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error al mostrar las Reservas: " + error.message,
      });
    }
  }

  // Eliminar Reservas
  async deleteReserva(req, res) {
    const { id } = req.params;

    try {
      const reserva = await Reservation.findByIdAndDelete(id);
      if (reserva != null) {
        return res
          .status(200)
          .json({
            status: 200,
            message: "Reservacion eliminada exitosamente",
            result: reserva,
          });
      }
      res.status(400).json({ status: 400, message: "No existe la Reservacion" });
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

export default new ReservationController();