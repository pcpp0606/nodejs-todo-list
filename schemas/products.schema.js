import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  password: { type: Number, required: true },
  status: { type: String, default: 'FOR_SALE' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);
