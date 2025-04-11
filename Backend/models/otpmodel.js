import mongoose from "mongoose";


const otpSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  userType:{type:String,enum:['customer','shopkeeper'],default:'customer'},
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Manually define TTL Index
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const OtpModel = mongoose.model("Otp", otpSchema);

export default OtpModel;