import mongoose from 'mongoose';

const promoSchema = mongoose.Schema({
  name: { type: String, required: true },
  id_hotel: { type: String, required: true },
  description: { type: String, required: true },
  discount: { type: Number, required: true },
  active: { type: String, enum: ['activa', 'expirada'], required: true },
  requirement: { type: String, required: true },
});

const Promos = mongoose.model('promos', promoSchema);

export default Promos;