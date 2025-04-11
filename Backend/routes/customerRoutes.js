
import express from 'express'
import { addOrUpdateAddress, deleteAddress, getNearbyShops, registerCustomer, updateProfile, verifyOTP } from '../controllers/customerAuth/customercontroller.js';
import { authMiddleware } from '../utils/authMiddleware.js';
const customerRouter = express.Router();
 

 
customerRouter.post("/send-otp", registerCustomer);
customerRouter.post("/verifyotp", verifyOTP);
customerRouter.put("/update-profile", authMiddleware, updateProfile);
customerRouter.post("/address", authMiddleware,addOrUpdateAddress );
customerRouter.delete("/delete-address/:addressId", authMiddleware, deleteAddress);
customerRouter.get("/nearby-shops", authMiddleware, getNearbyShops);
// router.get("/orders", authMiddleware, customerController.getOrderHistory);
// router.get("/payments", authMiddleware, customerController.getPaymentHistory);

export default customerRouter;
