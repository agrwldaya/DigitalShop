import { v2 as cloudinary } from 'cloudinary'

export const cloudinaryconnect = () => {
    try {
        const res = cloudinary.config(process.env.CLOUDINARY_URL);
        console.log("cloudinary conneted!")
    } catch (error) {
        console.log(error)
    }    
};   