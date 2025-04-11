import { v2 as cloudinary } from 'cloudinary'


const uploadFileOnCloudinary = async(file)=>{
   console.log(file)
    const result = await cloudinary.uploader.upload(file,{folder:'ShopEasy'})
    console.log(result)
}

export default uploadFileOnCloudinary;
