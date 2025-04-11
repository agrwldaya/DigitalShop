import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true }, // Link to shop
    productName: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    unit: { type: String, default: "pcs" },
    productImage:{type:String},
    //productImage: { type: String },
    description: { type: String },
    addedAt: { type: Date, default: Date.now }
  });
  
  const ShopProductsModel = mongoose.model("ShopProducts", productSchema);

  export default ShopProductsModel;

  