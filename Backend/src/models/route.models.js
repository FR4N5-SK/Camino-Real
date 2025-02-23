import mongoose from 'mongoose';

const routeSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  services: {type: Array, required: true},
  image: { type: String, required: true },
  requirement: { type: String, required: true },
});

const Route = mongoose.model('routes', routeSchema);

export default Route;