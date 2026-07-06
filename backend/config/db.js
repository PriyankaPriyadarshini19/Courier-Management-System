import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "courier-delivery-app",
        });
        console.log(`MongoDB Connection : ${conn.connection.host}`);
    } catch (error) {
        console.error(`Mongodb connection error : ${error.message}`);
        process.exit(1);
    }
};