require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({ slug: String, specifications: [String] });
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await Product.updateOne(
    { slug: "research-grade-powder" },
    { $set: { "specifications.0": "CAS Number: 16145-71-4" } }
  );
  console.log("CAS 16145-71-4 added to Cychlorphine HCL specs");
  process.exit(0);
});
