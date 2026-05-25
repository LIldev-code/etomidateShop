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
  { label: "100ml", price: 500 },
  { label: "250ml", price: 1250 },
  { label: "500ml", price: 2500 },
  { label: "1000ml", price: 5000 },
];

const liquidProducts = [
  {
    slug: "etomidate-space-oil",
    name: "Space Oil",
    price: 500,
    category: "liquid",
    shortDescription:
      "The original Space Oil — pharmaceutical-grade etomidate liquid solution. Smooth, pure, and precisely formulated for consistent results.",
    description: `Space Oil is our flagship liquid etomidate product and one of the most sought-after formulations in our entire range. The name speaks for itself — a smooth, ultra-pure pharmaceutical-grade etomidate solution (CAS 33125-97-2) that delivers a clean, consistent experience with every use.

Produced in an ISO-certified facility using only the highest-grade raw materials, Space Oil undergoes rigorous multi-stage purification to achieve a verified purity of ≥99.8% via HPLC analysis. The result is a crystal-clear liquid solution that performs reliably across all applications.

Each batch is individually coded and sealed in pharmaceutical-grade amber glass bottles to preserve potency and protect from light degradation. A full Certificate of Analysis (COA) accompanies every order, detailing batch number, purity results, and concentration data.

Available in 100ml, 250ml, 500ml, and 1000ml volumes to suit both individual researchers and larger-scale laboratory requirements. Discreet, secure worldwide shipping within 24–48 hours of dispatch.`,
    specifications: [
      "Purity: ≥99.8% (HPLC verified)",
      "Form: Premium pharmaceutical-grade liquid solution",
      "CAS: 33125-97-2",
      "Carrier: Pharmaceutical-grade solvent base",
      "Packaging: Hermetically sealed amber glass bottle",
      "COA included with every order",
      "Batch-coded for full traceability",
      "Storage: Cool, dark place below 25°C",
    ],
    sizes,
    inStock: true,
    image: "",
  },
  {
    slug: "etomidate-moon-drops",
    name: "Moon Drops",
    price: 500,
    category: "liquid",
    shortDescription:
      "Precision-dosed etomidate liquid in a fine dropper format. Controlled, measured, and effortlessly accurate.",
    description: `Moon Drops is our precision dropper liquid — etomidate (CAS 33125-97-2) in its most controlled form. Designed for researchers and professionals who demand exact, repeatable dosing without any room for error, Moon Drops combines pharmaceutical-grade liquid etomidate with a precision glass pipette dropper system calibrated for consistent drop volume every time.

The formulation is based on the same purified etomidate base as our Space Oil, maintaining ≥99.8% purity throughout. The dropper format eliminates measurement guesswork and minimises waste, making it the preferred choice for laboratory applications where accuracy is non-negotiable.

Housed in borosilicate amber glass with a pharmaceutical-grade pipette, the bottle protects the solution from UV degradation and contamination. Every unit ships with a full COA confirming purity, concentration, and batch traceability. Discreet worldwide shipping, dispatched within 24 hours of order.`,
    specifications: [
      "Purity: ≥99.8% (HPLC verified)",
      "Form: Liquid solution with precision dropper",
      "CAS: 33125-97-2",
      "Dropper: Pharmaceutical-grade glass pipette",
      "Bottle: Borosilicate amber glass",
      "COA included with every order",
      "Batch-coded for full traceability",
      "Light-protected, tamper-evident seal",
    ],
    sizes,
    inStock: true,
    image: "",
  },
  {
    slug: "etomidate-crystal-solution",
    name: "Crystal Solution",
    price: 500,
    category: "liquid",
    shortDescription:
      "High-concentration etomidate liquid for advanced research. Maximum potency, crystal-clear purity.",
    description: `Crystal Solution is our high-concentration liquid etomidate formulation — built for advanced research applications where standard concentrations are not sufficient. Derived from the same pharmaceutical-grade etomidate (CAS 33125-97-2), Crystal Solution undergoes an additional purification and concentration stage to produce a significantly more potent liquid per millilitre.

The name reflects exactly what you receive: a crystal-clear, high-purity solution with no compromise on quality or consistency. This product is ideal for researchers working with smaller volumes who need greater active compound density without increasing total liquid quantity.

Supplied in pharmaceutical-grade amber glass bottles with tamper-evident seals. Each order includes a full Certificate of Analysis (COA) with batch number, HPLC purity data, and concentration measurements. Ships discreetly worldwide within 24–48 hours of confirmed order.`,
    specifications: [
      "Purity: ≥99.8% (HPLC verified)",
      "Form: High-concentration liquid solution",
      "CAS: 33125-97-2",
      "Potency: Enhanced concentration — 2x standard",
      "Packaging: Amber glass, tamper-evident seal",
      "COA included with every order",
      "Batch-coded for full traceability",
      "Recommended for experienced researchers",
    ],
    sizes,
    inStock: true,
    image: "",
  },
  {
    slug: "etomidate-stellar-mist",
    name: "Stellar Mist",
    price: 500,
    category: "liquid",
    shortDescription:
      "Fine-mist nasal spray etomidate solution. Consistent actuation, even distribution, pharmaceutical precision.",
    description: `Stellar Mist delivers pharmaceutical-grade liquid etomidate (CAS 33125-97-2) in a fine-mist nasal spray format, offering a convenient and consistently dosed delivery method for research and professional applications.

Each actuation of the precision pump mechanism delivers a carefully measured volume of solution, ensuring strict dosing reproducibility across multiple uses. The fine-mist atomiser produces an even, uniform spray for optimal distribution. The formulation is pH-adjusted and buffered using only pharmaceutical-grade excipients, making it fully compatible with sensitive mucosal applications.

The spray bottle is constructed from medical-grade materials with a high-precision pump rated for thousands of consistent, reliable actuations. Each unit is individually batch-tested and supplied with a full Certificate of Analysis confirming ≥99.8% purity. Discreet worldwide shipping within 24–48 hours of order confirmation.`,
    specifications: [
      "Purity: ≥99.8% (HPLC verified)",
      "Form: Fine-mist nasal spray solution",
      "CAS: 33125-97-2",
      "Pump: Precision-metered dose atomiser",
      "Excipients: Pharmaceutical-grade only",
      "pH: Adjusted and buffered",
      "COA included with every order",
      "Medical-grade spray mechanism",
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

    // Remove old liquid products
    const deleted = await Product.deleteMany({ category: "liquid" });
    console.log(`Removed ${deleted.deletedCount} old liquid products`);

    for (const product of liquidProducts) {
      await Product.create(product);
      console.log(`Created: ${product.name}`);
    }

    console.log("\nDone — Liquid products updated:");
    liquidProducts.forEach((p) => console.log(`  - ${p.name}`));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
