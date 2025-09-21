import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "./models/user.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function seedAdmin() {
  await mongoose.connect(MONGO_URI);
  const adminEmail = "admin@pathwiser.com";
  const existing = await User.findOne({ email: adminEmail });
  if (existing) {
    console.log("Admin user already exists.");
    process.exit(0);
  }
  const hashedPassword = await bcrypt.hash("adminsachin@88", 10);
  const admin = new User({
    fullname: "Admin",
    email: adminEmail,
    phoneNumber: 9999999999,
    password: hashedPassword,
    role: "admin",
    profile: {}
  });
  await admin.save();
  console.log("Admin created:", adminEmail, "password: adminsachin@88");
  process.exit(0);
}

seedAdmin().catch(e => { console.error(e); process.exit(1); });
