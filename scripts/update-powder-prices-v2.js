require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const SizeSchema = new mongoose.Schema({ label: String, price: Number });
const ProductSchema = new mongoose.Schema({
  slug: String,
  category: String,
  sizes: [SizeSchema],
});
const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

const newSizes = [
  { label: "50g", price: 800 },
  { label: "100g", price: 1400 },
  { label: "200g", price: 2400 },
  { label: "500g", price: 5000 },
  { label: "1kg", price: 8500 },
];

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const result = await Product.updateMany(
      { category: "powder" },
      { $set: { sizes: newSizes } }
    );

    console.log(`Updated ${result.modifiedCount} powder products`);
    console.log("\nNew prices:");
    newSizes.forEach((s) =>
      console.log(`  ${s.label.padEnd(6)} = €${s.price.toLocaleString()}`)
    );
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
