
import Shop from '../../models/shopkeeper.js';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import sendOTP from '../../utils/sendOtp.js';
import OtpModel from '../../models/otpmodel.js'
import bcrypt from 'bcrypt'
import ShopProductsModel from '../../models/shopProductModel.js';
import uploadFileOnCloudinary from '../../utils/uploadFiles.js';
const shopController = {
  
  registerShop: async (req, res) => {
    try {
      const {
        shopName, ownerName, email, phone, address, city, state, pincode,
        shopType, gstNumber, password, whatsappNotifications, communicationMode,
        latitude, longitude, storeOpenTime, storeCloseTime,licenseDocument,shopImage
      } = req.body;

    if (
      !shopName || !ownerName || !email || !phone || !address || !city || !state || !pincode ||
      !shopType || !gstNumber || !password || whatsappNotifications === undefined  ||
      latitude===undefined || longitude===undefined || !storeOpenTime || !storeCloseTime || !licenseDocument || !shopImage
    ) {
      return res.status(400).json({ success: false, message: 'All fields are required!' });
    }
    
    const existingShop = await Shop.findOne({ phone });

    if (existingShop && existingShop.isVerified) {
      return res.status(400).json({ success: false, message: 'A shop with this phone number already exists' });
    }

    if (existingShop && !existingShop.isVerified) {
      await existingShop.deleteOne(); // ✅ correct deletion
    }

    const checkEmail = await Shop.findOne({ email });

    if (checkEmail && checkEmail.isVerified) {
      return res.status(400).json({ success: false, message: 'A shop with this email already exists' });
    }

    if (checkEmail && !checkEmail.isVerified) {
      await checkEmail.deleteOne(); // ✅ correct deletion
    }

      //Generate and save OTP
      const otp = otpGenerator.generate(6, { 
        digits: true, 
        lowerCaseAlphabets: false, 
        upperCaseAlphabets: false, 
        specialChars: false 
      });
     
      await OtpModel.create({ phone, otp,userType:'shopkeeper',expiry: Date.now() + 5 * 60 * 1000 }); // OTP expires in 5 minutes
    //  console.log(otp)

      // Send OTP
      // const otpResponse = await sendOTP(phone,otp);
      // console.log(otpResponse)

      // if (!otpResponse.success) {
      //   return res.status(400).json({ success: false, message: 'Failed to send OTP' });
      // }
      // Save new shop

      const newShop = new Shop({
        shopName, ownerName, email, phone, address, city, state, pincode, shopType,
        gstNumber, password, whatsappNotifications,
        communicationMode, storeOpenTime, storeCloseTime, isVerified: false,licenseDocument,shopImage, isActive: false,ProductCart:[],
        orderCart:[],customerCart:[],totalRevenue:0
      });
   
      if (latitude && longitude) {
        newShop.location = { type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] };
      }

      // if (req.file) {
      //   const imgurl=uploadFileOnCloudinary(req.file.path)
      //   newShop.licenseDocument = imgurl;
      // }

      await newShop.save();

      res.status(201).json({ success: true, message: 'OTP sent successfully!', phone });
    } catch (error) {
      console.error('Shop registration error:', error);
      res.status(500).json({ success: false, message: 'An error occurred during registration', error: error.message });
    }
  },

  verifyOtp : async (req, res) => {
    try {
        const { phone, otp } = req.body;

        if (!otp || !phone) {
            return res.status(400).json({ success: false, message: "Phone number and OTP are required." });
        }

        // Get the latest OTP for the given phone number
        const findOtp = await OtpModel.findOne({ phone,userType:'shopkeeper' }).sort({ createdAt: -1 });

        if (!findOtp) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
        }

        // OTP Expiry Check: (Assuming OTP expires in 5 minutes)
        const otpExpiryTime = new Date(findOtp.createdAt).getTime() + 5 * 60 * 1000; // 5 minutes
        if (Date.now() > otpExpiryTime) {
            await OtpModel.deleteOne({ phone }); // Delete expired OTP
            return res.status(400).json({ success: false, message: "OTP has expired. Request a new one." });
        }

        // OTP Match Check
        if (findOtp.otp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP." });
        }

        // Check if Shop exists
        const findShop = await Shop.findOne({ phone });
        if (!findShop) {
           await OtpModel.deleteOne({ phone }); // Delete expired OTP
            return res.status(404).json({ success: false, message: "Shop not found." });
        }

        // Activate & Verify Shop
        findShop.isActive = true;
        findShop.isVerified = true;
        await findShop.save();

        // Delete OTP after successful verification
        await OtpModel.deleteOne({ phone });

        // Generate JWT Token
        const token = jwt.sign({ id: findShop._id, phone }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ success: true, message: "OTP verification successful!", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred during OTP verification." });
    }
  },

  login : async (req, res) => {
    try {
      const { phone, password } = req.body;
     console.log(req.body)
      // Find shop by phone number
      const shop = await Shop.findOne({ phone });
      if (!shop || !shop.isVerified) {
        return res.status(400).json({
          success: false,
          message: "Shop not found!",
        });
      }
  
      // Compare passwords
      const checkPassword = await bcrypt.compare(password, shop.password);
      if (!checkPassword) {
        return res.status(400).json({
          success: false,
          message: "Incorrect password!",
        });
      }
  
      // Generate JWT Token
      const token = jwt.sign(
        { id: shop._id, phone },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
  
      res.status(200).json({
        success: true,
        message: "Login successful!",
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error occurred during shopkeeper login!",
      });
    }
  },

  addProduct : async (req, res) => {
    try {
      const { userId, productName, category, price, stock, unit,productImage, description } = req.body;
    console.log(req.body)
      // Validate required fields
      if (!userId || !productName || !category || !price || !stock || !unit || !productImage) {
        return res.status(400).json({
          success: false,
          message: "All required fields must be provided!",
        });
      }
  
      // Find the shop by ID
      const shop = await Shop.findById(userId);
      if (!shop) {
        return res.status(404).json({
          success: false,
          message: "Shop not found!",
        });
      }
  
      // Create new product entry in ShopProducts collection
      const newProduct = new ShopProductsModel({
        shopId:userId, 
        productName,
        category,
        price,
        stock,
        unit,
        description,
        productImage
      });
      await newProduct.save();  
  
      // Push the product ID to shop's shopCart array
      shop.ProductCart.push(newProduct._id);
      await shop.save();
  
      res.status(201).json({
        success: true,
        message: "Product added successfully!",
        product: newProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error occurred while adding product!",
      });
    }
  },

  getProfile: async (req, res) => {
    try {
      const { userId } = req.body; // Extract shopId from request body

      if (!userId) {
        return res.status(400).json({ success: false, message: "shopId is required!" });
      }

      // Find shop by ID and exclude password & shopCart (ShopProducts data)
      const shop = await Shop.findById(userId).select("-password -ProductCart -orderCart -customerCart  -updatedAt -__v");

      if (!shop) {
        return res.status(404).json({ success: false, message: "Shop not found!" });
      }

      res.status(200).json({
        success: true,
        message: "Shop profile fetched successfully!",
        shop,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error occurred while fetching shop profile!",
      });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ success: false, message: "shopId is required!" });
      }

      // Find shop and populate shopCart to get product details
      const shop = await Shop.findById(userId).populate({
        path: "ProductCart",
        select: "-__v -createdAt -updatedAt" // Exclude unnecessary fields
      });

      if (!shop) {
        return res.status(404).json({ success: false, message: "Shop not found!" });
      }

      res.status(200).json({
        success: true,
        message: "All products fetched successfully!",
        products: shop.ProductCart, // Returning the populated shopCart array
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error occurred while fetching shop products!",
      });
    }
  },
  
  getAllOrders:async(req,res)=>{
    try {
      const {userId} = req.body;
      if (!userId) {
        return res.status(400).json({ success: false, message: "shopId is required!" });
      }

      const shop = await Shop.findById(userId).populate({
        path: "orderCart",
        select: "-__v -createdAt -updatedAt" // Exclude unnecessary fields
      });
      if (!shop) {
        return res.status(404).json({ success: false, message: "Shop not found!" });
      }

      res.status(200).json({
        success: true,
        orders: shop.orderCart, // Returning the populated shopCart array
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error occurred while fetching shop orders!",
      });
    }
  },

  getTotalRevenue:async(req,res)=>{
    try {
      const {userId} = req.body;
      if (!userId) {
        return res.status(400).json({ success: false, message: "shopId is required!" });
      }

      const shop = await Shop.findById(userId) 

      if (!shop) {
        return res.status(404).json({ success: false, message: "Shop not found!" });
      }

      res.status(200).json({
        success: true,
        totalRevenue: shop.totalRevenue,  
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error occurred while fetching totalRevenue",
      });
    }
  },

  getAllCustomer:async(req,res)=>{
    try {
      const {userId} = req.body;
      if (!userId) {
        return res.status(400).json({ success: false, message: "shopId is required!" });
      }

      const shop = await Shop.findById(userId).populate({
        path: "customerCart",
        select: "-__v -createdAt -updatedAt" // Exclude unnecessary fields
      });
      if (!shop) {
        return res.status(404).json({ success: false, message: "Shop not found!" });
      }

      res.status(200).json({
        success: true,
        orders: shop.customerCart, // Returning the populated shopCart array
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error occurred while fetching all customers!",
      });
    }
  },

};

export default shopController;
