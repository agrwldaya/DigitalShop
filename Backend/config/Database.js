import mongoose from "mongoose";

const dbConnect = async()=>{
    if(mongoose.isConnected){
        console.log("Already connected to database")
        return;
    }
    try{
        const db = await mongoose.connect(process.env.DBURL ||" ")
        console.log("Db connected successfully!")
    }catch (error) {
        console.log("Database connection failed",error)
        process.exit(1);
    }
}

export default dbConnect;

