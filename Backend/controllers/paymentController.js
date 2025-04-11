import razorpay from "../config/razorpayConfig.js";

import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils.js';
import { readData, writeData } from "../utils/fileHelper.js";
 
// Create Razorpay Order
const createOrder = async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;

    const options = {
      amount: amount * 100, // Convert amount to paise
      currency,
      receipt,
      notes,
    };

    const order = await razorpay.orders.create(options);
    
    // Store order in JSON
    const orders = readData();
    orders.push({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: 'created',
    });
    writeData(orders);

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating order');
  }
};

// Payment Verification
const verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const secret = razorpay.key_secret;
  const body = razorpay_order_id + '|' + razorpay_payment_id;

  try {
    const isValidSignature = validateWebhookSignature(body, razorpay_signature, secret);
    
    if (isValidSignature) {
      // Update order status
      const orders = readData();
      const order = orders.find(o => o.order_id === razorpay_order_id);
      
      if (order) {
        order.status = 'paid';
        order.payment_id = razorpay_payment_id;
        writeData(orders);
      }

      res.status(200).json({ status: 'ok' });
      console.log("✅ Payment verification successful");
    } else {
      res.status(400).json({ status: 'verification_failed' });
      console.log("❌ Payment verification failed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error verifying payment' });
  }
};

export { createOrder, verifyPayment };
