import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShopProducts', required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
  totalPrice: { type: Number, required: true },
  orderStatus: {
    type: String,
    enum: ['pending', 'packed', 'pickuped', 'cancelled'],
    default: 'pending'
  },
  payment: {
    method: { type: String, enum: ['COP', 'UPI', 'Credit Card', 'Net Banking'], required: true },
    status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
    transactionId: { type: String, default: null } // Only for online payments
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const OrderModel = mongoose.model('Order', orderSchema);
export default OrderModel;



