import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "./models/User.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        const name = process.env.ADMIN_NAME;

        let admin = await User.findOne({ email });

        if(admin) {
            console.log("Admin user already exists");
        }else {
            admin = new User({
                name,
                email,
                password,
            });

            await admin.save();
            console.log("Admin user created successfully");
        }

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
         console.error("Error seeding admin user:", error);
         process.exit(1);
    }
}

seedAdmin();