import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscription: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], required: true },
});

const User = mongoose.model('users', userSchema);

export default User;