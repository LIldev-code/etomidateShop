require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({ name: String, slug: String, category: String, sizes: [{ label: String, price: Number }] });
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const powders = await Product.find({ category: "powder" }).lean();
  powders.forEach(p => {
    console.log(`\n${p.name} (${p.slug})`);
    p.sizes?.forEach(s => console.log(`  ${s.label} = €${s.price}`));
  });
  process.exit(0);
});
