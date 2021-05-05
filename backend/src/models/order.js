import { Schema, model } from 'mongoose';

const orderSchema = new Schema({});

const Order = model('Order', orderSchema);

export default Order;
