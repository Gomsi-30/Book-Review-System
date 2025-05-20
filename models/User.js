import { Schema, model } from 'mongoose';
import pkg from 'bcryptjs';

const { genSalt, hash, compare } = pkg;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

// Compare password method for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return compare(candidatePassword, this.password);
};

export default model('User', userSchema);
