import mongoose from 'mongoose';

const reservationSchema = mongoose.Schema({
  email_user: { type: String, required: true },
  name_user: { type: String, required: true },
  id_hotel: { type: String, required: true },
  date_start: { type: String, required: true },
  date_end: { type: String, required: true },
  people: { type: Number, required: true },
  promo: { type: String, required: true },
  cash: { type: Number, required: true },
  payment: { type: String, required: true },
  code: { type: String, required: true }
});

const Reservation = mongoose.model('reservations', reservationSchema);

export default Reservation;