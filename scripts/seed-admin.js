/**
 * Seed script to create admin user
 * Run with: node scripts/seed-admin.js
 */

require('dotenv').config({ path: '.env.local' });

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Admin credentials - matching website theme
const ADMIN_USERNAME = "etomidate";
const ADMIN_PASSWORD = "EtomShop2024!";

async function seedAdmin() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI || MONGODB_URI.includes("your_mongodb_uri")) {
      console.error("❌ Error: MONGODB_URI environment variable is not set or contains placeholder");
      console.log("Please ensure your .env.local file has a valid MongoDB connection string");
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log("✓ Connected to MongoDB");

    // Define Admin Schema inline to avoid import issues
    const AdminSchema = new mongoose.Schema(
      {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
      },
      { timestamps: true }
    );

    const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

    // Hash password
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: ADMIN_USERNAME });

    if (existingAdmin) {
      // Update password
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log(`✓ Updated admin user: ${ADMIN_USERNAME}`);
    } else {
      // Create new admin
      await Admin.create({
        username: ADMIN_USERNAME,
        password: hashedPassword,
      });
      console.log(`✓ Created admin user: ${ADMIN_USERNAME}`);
    }

    console.log("\n==================================================");
    console.log("Admin credentials:");
    console.log(`  Username: ${ADMIN_USERNAME}`);
    console.log(`  Password: ${ADMIN_PASSWORD}`);
    console.log("==================================================");
    console.log("✓ Disconnected from MongoDB");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedAdmin();
