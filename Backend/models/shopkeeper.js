// models/Shop.js
import bcrypt from 'bcrypt'
import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
 
const shopSchema = new mongoose.Schema({
  // Basic Details
  shopName: {type: String,required: [true, 'Shop name is required'],trim: true},
  ownerName: {type: String,required: [true, 'Owner name is required'],trim: true},
  Bio:{type: String,trim: true},
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  phone: {type: String,required: [true, 'Phone number is required'],trim: true},
  // Shop Location
  address: {type: String,required: [true, 'Shop address is required'],trim: true},
  city: {type: String,required: [true, 'City is required'],trim: true},
  state: {type: String,required: [true, 'State is required'],trim: true},
  pincode: {type: String,required: [true, 'Pincode is required'],trim: true},
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [latitude,longitude, ]
      default: [0, 0]
    }
  },
  storeOpenTime:{type:String,required:true},
  storeCloseTime:{type:String,required:true},
  // Business Information
  shopType: {
    type: String,
    required: [true, 'Shop type is required'],
    enum: ['grocery', 'pharmacy', 'stationery', 'electronics', 'clothing', 'hardware', 'other'],
    trim: true
  },
  gstNumber: {
    type: String,
    trim: true
  },
  licenseDocument: {type:String,required:true},
  shopImage:{type:String,required:true},
  // Login Credentials
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password should be at least 8 characters long']
  },
  // Communication Preferences
  whatsappNotifications: {
    type: Boolean,
    default: true
  },
  // Status and Timestamps
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  ProductCart: [{ type: mongoose.Schema.Types.ObjectId, ref: "ShopProducts" }],
  orderCart:[{ type: mongoose.Schema.Types.ObjectId, ref: "Order"}],
  customerCart:[{type:mongoose.Schema.Types.ObjectId,ref:"customer"}],
  totalRevenue:{type:Number}
}, {
  timestamps: true
});

// Index for geospatial queries
shopSchema.index({ location: '2dsphere' });

// Pre-save hook to hash password
shopSchema.pre('save', async function(next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check if password is correct
shopSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
const Shop = mongoose.model('Shop', shopSchema);

export default Shop;