import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
  src: { type: String, required: true },
  itemLength: { type: Number, required: true },
  sizes: { type: Array, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
});

export default mongoose.model('Product', productSchema);
