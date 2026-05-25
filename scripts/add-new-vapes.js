require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const SizeSchema = new mongoose.Schema({ label: String, price: Number });
const ProductSchema = new mongoose.Schema({
  slug: { type: String, unique: true },
  name: String,
  price: Number,
  category: String,
  shortDescription: String,
  description: String,
  specifications: [String],
  sizes: [SizeSchema],
  inStock: { type: Boolean, default: true },
  image: { type: String, default: "" },
});
const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

const sizes = [
  { label: "10 Pods", price: 70 },
  { label: "25 Pods", price: 160 },
  { label: "50 Pods", price: 300 },
  { label: "100 Pods", price: 550 },
];

const newVapes = [
  {
    slug: "zombie-vape",
    name: "Zombie Vape",
    price: 70,
    category: "vape",
    shortDescription:
      "Zombie Vape — an intensely potent K-Pod formula built for those who push the limits. Bold, powerful, and relentlessly consistent.",
    description: `Zombie Vape is not for the faint-hearted. This is our most bold and aggressively formulated K-Pod in the entire vape range — a pharmaceutical-grade etomidate vape cartridge engineered for users who demand maximum intensity from every draw.

Named for its signature knockout character, Zombie Vape delivers a deeply pronounced and immediately noticeable experience. The formulation uses a higher-load pharmaceutical-grade etomidate concentration housed in our premium ceramic coil K-Pod system, ensuring that each puff produces the same dense, consistent vapour with zero compromise on quality or potency.

Manufactured to the same strict GMP-aligned standards as all our products, Zombie Vape achieves ≥99.8% active compound purity confirmed by HPLC testing. The advanced ceramic coil technology ensures clean, even vaporisation without burning or degrading the active compounds, preserving full potency from the first draw through to the last.

Compatible with all standard K-Pod devices. Each pod is individually sealed at point of manufacture to maintain freshness and prevent any potency loss before use. Available in packs of 10, 25, 50, and 100 pods to suit both personal use and larger research requirements. Discreet worldwide shipping within 24–48 hours.`,
    specifications: [
      "Purity: ≥99.8% (HPLC verified)",
      "Form: Pre-filled K-Pod vape cartridge",
      "Potency: High-load concentration formula",
      "Coil: Advanced ceramic heating element",
      "Capacity: 1.0ml per pod",
      "Compatibility: Universal K-Pod devices",
      "Individually sealed for freshness",
      "Batch-coded for full traceability",
    ],
    sizes,
    inStock: true,
    image: "",
  },
  {
    slug: "piao-piao-vape",
    name: "Piao Piao Vape",
    price: 70,
    category: "vape",
    shortDescription:
      "Piao Piao Vape — light, smooth, and effortlessly drifting. A gentle yet effective K-Pod for a relaxed, easygoing experience.",
    description: `Piao Piao Vape takes its name from the sensation it delivers — light, smooth, and gently floating. In contrast to our heavier formulations, Piao Piao is crafted for users who prefer a softer, more relaxed experience without sacrificing the quality and purity that defines everything we produce.

The formulation uses pharmaceutical-grade etomidate at a carefully balanced concentration, designed to produce a smooth, manageable draw with gradual onset and comfortable duration. The result is a vaping experience that feels effortless — each puff light on the throat and easy on the senses, while still delivering consistent and reliable effects.

Housed in our standard K-Pod ceramic coil cartridge system, Piao Piao Vape benefits from the same precision manufacturing and quality assurance that applies across our entire range. ≥99.8% active compound purity is confirmed via HPLC analysis for every batch, and each pod is hermetically sealed to preserve its character until the moment of use.

Ideal for first-time users, those seeking a lighter daily-use option, or anyone who simply prefers to keep things smooth. Compatible with all standard K-Pod devices. Available in 10, 25, 50, and 100 pod packs. Ships discreetly worldwide within 24–48 hours.`,
    specifications: [
      "Purity: ≥99.8% (HPLC verified)",
      "Form: Pre-filled K-Pod vape cartridge",
      "Potency: Smooth, balanced light formula",
      "Coil: Advanced ceramic heating element",
      "Capacity: 1.0ml per pod",
      "Compatibility: Universal K-Pod devices",
      "Individually sealed for freshness",
      "Batch-coded for full traceability",
    ],
    sizes,
    inStock: true,
    image: "",
  },
];

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    for (const product of newVapes) {
      const existing = await Product.findOne({ slug: product.slug });
      if (existing) {
        await Product.updateOne({ slug: product.slug }, { $set: product });
        console.log(`Updated: ${product.name}`);
      } else {
        await Product.create(product);
        console.log(`Created: ${product.name}`);
      }
    }

    console.log("\nDone — New vape products added:");
    newVapes.forEach((p) => console.log(`  - ${p.name}`));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
