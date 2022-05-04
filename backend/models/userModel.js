import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isSuperAdmin:{type:Boolean, required: true },
    isAdmin:{type:Boolean, required: true },
    isDispatcher:{type:Boolean, required: true }

  },

);
const User = mongoose.model('User', userSchema);
export default User;