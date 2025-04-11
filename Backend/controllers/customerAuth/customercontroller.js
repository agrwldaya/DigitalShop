
import otpGenerator from 'otp-generator';
import OtpModel from '../../models/otpmodel.js';
import Customer from '../../models/customer.js';
import sendOTP from '../../utils/sendOtp.js';
import jwt from 'jsonwebtoken'
import Shop from '../../models/shopkeeper.js';
import OrderModel from '../../models/orderModel.js';

export const registerCustomer = async (req, res) => {
  try {
    const { phoneNo } = req.body;
    console.log(req.body)
    let customer = await Customer.findOne({ phoneNo });

    if (customer) {
      return res.status(200).json({
        success: false,
        message: "Customer already registered with this phone number!"
      });
    }

    // Generate and save OTP
    const otp = otpGenerator.generate(6, { 
      digits: true, 
      lowerCaseAlphabets: false, 
      upperCaseAlphabets: false, 
      specialChars: false 
    });

    // Delete any previous OTPs for this phone number
    await OtpModel.deleteMany({ phone: phoneNo, userType: 'customer' });

    await OtpModel.create({ phone: phoneNo, otp, userType: 'customer' });

    // Send OTP via SMS
    const otpResponse = await sendOTP(phoneNo, otp);

    if (!otpResponse.success) {
      return res.status(400).json({ success: false, message: 'Failed to send OTP' });
    }

    res.status(200).json({ success: true, message: `OTP sent successfully and otp  is ${otp}`, otp });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Registration failed", error: error.message });
  }
};

// Verify OTP and Activate Customer
export const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    console.log(req.body)

    if (!otp || !phone) {
      return res.status(400).json({ success: false, message: "Phone number and OTP are required." });
    }

    // Get the latest OTP for this phone number
    const findOtp = await OtpModel.findOne({ phone: phone, userType: 'customer' }).sort({ createdAt: -1 });

    if (!findOtp) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
    }

    // Check OTP Match
    if (findOtp.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    // Delete OTP after successful verification
    //await OtpModel.deleteOne({ _id: findOtp._id });

    // Check if the customer is already registered
    let customer = await Customer.findOne({ phone });
    if(customer){
      return res.status(400).json({ success: false, message: "shop already registered!" });
    }
  
      customer = new Customer({
        phoneNo:phone,
        isVerified: true,
      });
      await customer.save();
      // Generate JWT Token
        const token = jwt.sign({ id:customer._id}, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
       success: true,
       message: "You have been registered successfully!",
       token
      });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ success: false, message: 'OTP verification failed!', error: error.message });
  }
};

// Update Customer Profile (Name, Email)
export const updateProfile = async (req, res) => {
  try {
    const { userId, name, email } = req.body;

    // Check if user exists
    const existingCustomer = await Customer.findById(userId);
    if (!existingCustomer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    // Update Customer Details
    const updatedCustomer = await Customer.findByIdAndUpdate(
      userId,
      { $set: { name, email } }, // Use $set to update fields
      { new: true, runValidators: true } // Return updated document
    );

    res.status(200).json({ success: true, message: "Profile updated successfully", updatedCustomer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Profile update failed", error: error.message });
  }
};

// Add or Update Address
export const addOrUpdateAddress = async (req, res) => {
   const { name, addressPhoneNo, address, city, state, district, zipcode, latitude, longitude, userId } = req.body;

  try {
      const customer = await Customer.findById(userId);

      if (!customer) {
          return res.status(404).json({ success: false, message: "Customer not found" });
      }

      // Check if the address with the same `zipcode` already exists
      const existingAddressIndex = customer.address.findIndex(addr => addr.zipcode === zipcode);

      if (existingAddressIndex !== -1) {
          // Update existing address
          customer.address[existingAddressIndex] = {
              ...customer.address[existingAddressIndex],  // Preserve old values
              name,
              addressPhoneNo,
              address,
              city,
              state,
              district,
              zipcode,
              country: "India",
              location: { latitude, longitude }
          };
      } else {
          // Add new address
          customer.address.push({
              name,
              addressPhoneNo,
              address,
              city,
              state,
              district,
              zipcode,
              country: "India",
              location: { latitude, longitude }
          });
      }

      await customer.save();
      return res.status(200).json({ success: true, message: "Address updated successfully", data: customer.address });

  } catch (error) {
      return res.status(500).json({ success: false, message: "Error updating address", error: error.message });
  }
};

// Delete Address
export const deleteAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    const { addressId } = req.params; // Use params for address ID

    const customer = await Customer.findById(userId);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    // Check if the address exists
    const addressExists = customer.address.some(addr => addr._id.toString() === addressId);
    if (!addressExists) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    // Use $pull to remove address by ID
    await Customer.findByIdAndUpdate(userId, {
      $pull: { address: { _id: addressId } }
    });

    res.status(200).json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete address", error: error.message });
  }
};

// Get Order History
export const getOrderHistory = async (req, res) => {
  try {
    const { phoneNo } = req.params;

    const customer = await Customer.findOne({ phoneNo }).select("orderHistory");
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ orderHistory: customer.orderHistory });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order history", error: error.message });
  }
};

// Get Payment History
export const getPaymentHistory = async (req, res) => {
  try {
    const { phoneNo } = req.params;

    const customer = await Customer.findOne({ phoneNo }).select("paymentHistory");
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ paymentHistory: customer.paymentHistory });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payment history", error: error.message });
  }
};

export const getNearbyShops = async (req, res) => {
  try {
    const {userId} = req.body;
    const { selectedAddressId, maxDistance = 5000 } = req.query; // Default radius: 5km
   //console.log(userId,selectedAddressId,maxDistance)
    // Find the customer
    const customer = await Customer.findById(userId);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }
   //console.log(customer)
    // Find the selected address from the customer's addresses
    const selectedAddress = customer.address.find(addr => addr._id.toString() === selectedAddressId);
    if (!selectedAddress || !selectedAddress.location || !selectedAddress.location.latitude || !selectedAddress.location.longitude) {
      return res.status(400).json({ success: false, message: "Invalid address or location data missing" });
    }

    // Extract latitude & longitude
    const { latitude, longitude } = selectedAddress.location;
   console.log(latitude, longitude )
    // Find nearby shops within maxDistance
    const radiusInMeters = (maxDistance || 5) * 1000;

    const nearbyShops = await Shop.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [parseFloat(latitude),parseFloat(longitude)] },
          distanceField: "distance",
          maxDistance: radiusInMeters,  
          spherical: true
        }
      }, {
        $project: {
          _id: 1,shopName: 1,ownerName: 1,address: 1,city: 1,state: 1,pincode: 1,location: 1,storeOpenTime: 1,storeCloseTime: 1,shopType: 1,whatsappNotifications: 1,shopCart: 1
        }
      }
    ]);
    res.status(200).json({
      success: true,
      message: "Nearby shops fetched successfully",
      nearbyShops,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching nearby shops", error: error.message });
  }
};

export const placeOrder = async (req, res) => {
  try {
    const { shopId, products, totalPrice, paymentMethod } = req.body;
    const customerId = req.user.userId;

    if (!shopId || !products || products.length === 0 || !totalPrice || !paymentMethod) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const shop = await Shop.findById(shopId);
    if (!shop) return res.status(404).json({ success: false, message: "Shop not found" });

    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });

    const order = new OrderModel({
      customerId,
      shopId,
      products,
      totalPrice,
      payment: { method: paymentMethod, status: paymentMethod === "COD" ? "pending" : "pending" }
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Something went wrong!", error: error.message });
  }
};


