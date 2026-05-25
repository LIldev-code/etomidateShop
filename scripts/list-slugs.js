require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({ name: String, slug: String, category: String });
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const ps = await Product.find().sort({ category: 1 }).lean();
  ps.forEach(p => console.log(p.category, "|", p.slug, "|", p.name));
  process.exit(0);
});
