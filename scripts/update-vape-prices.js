require('dotenv').config({ path: '.env.local' });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const SizeSchema = new mongoose.Schema({ label: String, price: Number });
const ProductSchema = new mongoose.Schema({
  slug: String, name: String, price: Number,
  category: String, sizes: [SizeSchema],
});
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const newSizes = [
  { label: "10 Pods", price: 70 },
  { label: "25 Pods", price: 160 },
  { label: "50 Pods", price: 300 },
  { label: "100 Pods", price: 550 },
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const vapeProducts = await Product.find({ category: "vape" });
  console.log(`Found ${vapeProducts.length} vape products`);

  for (const p of vapeProducts) {
    // Map existing size labels to new prices
    const updatedSizes = p.sizes.map((s) => {
      const label = s.label.toLowerCase();
      if (label.includes("100")) return { label: s.label, price: 550 };
      if (label.includes("50")) return { label: s.label, price: 300 };
      if (label.includes("25")) return { label: s.label, price: 160 };
      if (label.includes("10")) return { label: s.label, price: 70 };
      return s;
    });

    await Product.updateOne(
      { _id: p._id },
      { $set: { price: 70, sizes: updatedSizes } }
    );
    console.log(`Updated: ${p.name}`);
  }

  console.log("\nDone! Vape prices updated:");
  console.log("  10 pods = €70");
  console.log("  25 pods = €160");
  console.log("  50 pods = €300");
  console.log(" 100 pods = €550");
  process.exit(0);
}

run().catch((e) => { console.error(e); process.exit(1); });
