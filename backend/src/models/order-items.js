import { Schema, model } from 'mongoose';

const {
  Types: { ObjectId },
} = Schema;

const orderItemSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: ObjectId,
    ref: 'Product',
  },
});

const OrderItem = model('OrderItem', orderItemSchema);

export default OrderItem;
