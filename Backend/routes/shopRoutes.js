// routes/shopRoutes.js
import express from 'express'
import shopController from '../controllers/shopkeeperAuth/shopkeeperController.js';
import { authMiddleware } from '../utils/authMiddleware.js';
import upload from '../utils/multerConfig.js';
const shoprouter = express.Router();

// Register a new shop
 
shoprouter.post('/reg', shopController.registerShop);
shoprouter.post('/verifyOtp', shopController.verifyOtp);
shoprouter.post('/login', shopController.login);
shoprouter.post('/addProduct',authMiddleware,shopController.addProduct);
shoprouter.get('/profile',authMiddleware,shopController.getProfile);
shoprouter.get('/get-all-products',authMiddleware,shopController.getAllProducts);
shoprouter.get('/get-all-orders',authMiddleware,shopController.getAllOrders);
shoprouter.get('/get-total-revenue',authMiddleware,shopController.getTotalRevenue);
shoprouter.get('/get-total-customer',authMiddleware,shopController.getAllCustomer);

export default shoprouter