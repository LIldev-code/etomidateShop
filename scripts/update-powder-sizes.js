require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const SizeSchema = new mongoose.Schema({ label: String, price: Number });
const ProductSchema = new mongoose.Schema({
  slug: String,
  sizes: [SizeSchema],
});
const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

const newSizes = [
  { label: "50g", price: 2600 },
  { label: "100g", price: 4800 },
  { label: "200g", price: 8800 },
  { label: "500g", price: 19500 },
  { label: "1kg", price: 35000 },
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
    console.log("\nNew sizes:");
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
