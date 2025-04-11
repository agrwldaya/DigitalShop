import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  addressPhoneNo: { type: String },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, default: "India" },
  state: { type: String, required: true },
  district: { type: String, required: true },
  zipcode: { type: String, required: true },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
});



const PaymentSchema = new mongoose.Schema({
  paymentId: { type: String, required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ["UPI", "Credit Card", "Debit Card", "Net Banking", "COD"], required: true },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  paymentDate: { type: Date, default: Date.now },
});

const CustomerSchema = new mongoose.Schema({
  phoneNo: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false }, // To track phone verification status
  name: { type: String },
  email: { type: String,sparse: true },
  address: [AddressSchema], // Multiple addresses allowed
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order"},],
  paymentHistory: [PaymentSchema], // Payment details
}, { timestamps: true });

const Customer = mongoose.model("customer", CustomerSchema);

export default Customer;
