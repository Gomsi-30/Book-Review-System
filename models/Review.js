import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String }
}, { timestamps: true });

reviewSchema.index({ book: 1, user: 1 }, { unique: true });

export default model('Review', reviewSchema);
