require('dotenv').config({ path: '.env.local' });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const SizeSchema = new mongoose.Schema({ label: String, price: Number });
const ProductSchema = new mongoose.Schema({
  slug: String, name: String, price: Number,
  category: String,
  specifications: [String],
  sizes: [SizeSchema],
});
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const vapeProducts = await Product.find({ category: "vape" });
  console.log(`Found ${vapeProducts.length} vape products`);

  for (const p of vapeProducts) {
    const cleanedSpecs = (p.specifications || []).filter(
      (spec) => !spec.toLowerCase().includes("cas number")
    );

    await Product.updateOne(
      { _id: p._id },
      { $set: { specifications: cleanedSpecs } }
    );
    console.log(`Updated: ${p.name} (removed CAS from specs)`);
  }

  console.log("\nDone — CAS numbers removed from all vape products.");
  process.exit(0);
}

run().catch((e) => { console.error(e); process.exit(1); });
