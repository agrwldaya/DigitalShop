import express from "express";
import dbConnect from "./config/Database.js";
import dotenv from "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; 

// const __filename = fileURLToPath(import.meta.url);  
// const __dirname = path.dirname(__filename);  

import shoprouter from "./routes/shopRoutes.js";
import registerCustomer from "./routes/customerRoutes.js";
import Paymentrouter from "./routes/paymentRoute.js";
import { cloudinaryconnect } from "./config/Cloudinary.js";
 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Database connection
dbConnect();
// cloudinaryconnect();

//uploadFileOnCloudinary();

// Serve static files from uploads directory
// app.use(express.static(path.join(__dirname)));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/shops", shoprouter);
app.use("/api/customer", registerCustomer);
app.use('/api/payment', Paymentrouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
    });
});

//Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  });
app.listen(4000, () => {
    console.log("App is listening on port 4000");
});
