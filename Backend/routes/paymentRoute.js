import express from 'express'
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
 

const Paymentrouter = express.Router();

Paymentrouter.post('/create-order', createOrder);
Paymentrouter.post('/verify-payment', verifyPayment);

export default Paymentrouter;
