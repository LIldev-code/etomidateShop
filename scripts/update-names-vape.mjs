import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://nzoggeivo_db_user:Nzogge1234H@cluster0.caypivf.mongodb.net/?appName=Cluster0";
const Product = mongoose.model("Product", new mongoose.Schema({}, { strict: false }));

async function run() {
  await mongoose.connect(MONGODB_URI);

  // Rename Pure Grade Powder to include / Krystal
  const powder = await Product.findOneAndUpdate(
    { slug: "etomidate-powder-pure" },
    { $set: { name: "Pure Grade Powder / Krystal" } },
    { new: true }
  );
  if (powder) console.log(`✅ Renamed: ${powder.name}`);

  // Update all vape products: minimum 25 pods at €160
  const vapes = await Product.find({ category: "vape" }).lean();
  for (const v of vapes) {
    // Keep existing sizes but make first tier 25 pods at 160
    const newSizes = [
      { label: "25 Pods", price: 160 },
      { label: "50 Pods", price: 300 },
      { label: "100 Pods", price: 550 },
    ];
    await Product.findByIdAndUpdate(v._id, { $set: { sizes: newSizes, price: 160 } });
    console.log(`✅ ${v.name}: 25 Pods → €160 | 50 Pods → €300 | 100 Pods → €550`);
  }

  console.log("\n🎉 Done!");
  await mongoose.disconnect();
}

run().catch((err) => { console.error(err); process.exit(1); });
