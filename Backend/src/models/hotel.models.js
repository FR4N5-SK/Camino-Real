import mongoose from 'mongoose';

const hotelSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  room_capacity: { type: Number, required: true },
  services: {type: Array, required: true},
  review: {type: Number, default: 0},
  stars: {type: Number, required: true},
  image: { type: String, required: true },
});

const Hotel = mongoose.model('hotel', hotelSchema);

export default Hotel;