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

const liquidProducts = [
  {
    slug: "etomidate-space-oil-classic",
    name: "Etomidate Space Oil — Classic",
    price: 500,
    category: "liquid",
    shortDescription:
      "Pure pharmaceutical-grade etomidate liquid solution. Our signature Space Oil formula — smooth, clean, and precisely dosed.",
    description: `Etomidate Space Oil Classic is our flagship liquid etomidate solution, carefully formulated for consistent potency and maximum purity. Each batch is synthesised from pharmaceutical-grade etomidate (CAS 33125-97-2) and prepared in our ISO-certified facility to a verified concentration, ensuring you receive exactly what you order every time.

The Classic formula uses a refined carrier base that preserves the integrity of the active compound over extended storage periods. It is designed for researchers and professionals who require a reliable, repeatable liquid etomidate source without compromise.

Every bottle is individually batch-coded, hermetically sealed, and accompanied by a full Certificate of Analysis (COA) confirming ≥99.8% purity via HPLC testing. Discreet, secure worldwide shipping with delivery within 24–48 hours of dispatch.

Available in 100ml, 250ml, 500ml, and 1000ml volumes to suit both sample testing and large-scale research requirements.`,
    specifications: [
      "Purity: ≥99.8% (HPLC verified)",
      "Form: Pharmaceutical-grade liquid solution",
      "Concentration: Precisely measured per batch",
      "Carrier: Pharmaceutical-grade solvent base",
      "Packaging: Hermetically sealed amber glass bottle",
      "COA included with every order",
      "Batch-coded for full traceability",
      "Storage: Keep in a cool, dark place",
    ],
    sizes: [
      { label: "100ml", price: 500 },
      { label: "250ml", price: 1250 },
      { label: "500ml", price: 2500 },
      { label: "1000ml", price: 5000 },
    ],
    inStock: true,
    image: "",
  },
  {
    slug: "etomidate-space-oil-concentrate",
    name: "Etomidate Space Oil — Concentrate",
    price: 500,
    category: "liquid",
    shortDescription:
      "High-concentration etomidate liquid solution for advanced research applications. Maximum potency in every drop.",
    description: `Etomidate Space Oil Concentrate is engineered for advanced research applications where a higher-concentration liquid etomidate solution is required. Built on the same pharmaceutical-grade etomidate base (CAS 33125-97-2) as our Classic formula, the Concentrate delivers significantly greater active compound per millilitre — ideal for situations where volume efficiency is critical.

The formulation undergoes an additional purification and concentration stage, producing a solution with enhanced potency while retaining the same exceptional purity standards. The result is a product that goes further, allowing researchers to achieve their required outcomes with smaller volumes.

Supplied in pharmaceutical-grade amber glass bottles with tamper-evident seals. Each order includes a full Certificate of Analysis (COA) detailing batch number, HPLC purity results, and concentration data. Ships discreetly worldwide within 24–48 hours.`,
    specifications: [
      "Purity: ≥99.8% (HPLC verified)",
      "Form: High-concentration liquid solution",
      "Potency: Enhanced concentration (2x Classic)",
      "Carrier: Pharmaceutical-grade solvent base",
      "Packaging: Amber glass bottle, tamper-evident seal",
      "COA included with every order",
      "Batch-coded for full traceability",
      "Recommended for experienced researchers",
    ],
    sizes: [
      { label: "100ml", price: 500 },
      { label: "250ml", price: 1250 },
      { label: "500ml", price: 2500 },
      { label: "1000ml", price: 5000 },
    ],
    inStock: true,
    image: "",
  },
  {
    slug: "etomidate-space-oil-dropper",
    name: "Etomidate Space Oil — Dropper Bottle",
    price: 500,
    category: "liquid",
    shortDescription:
      "Precision dropper bottle format for controlled, measured etomidate liquid dosing. Perfect for laboratory and research use.",
    description: `Etomidate Space Oil Dropper Bottle combines the same pharmaceutical-grade etomidate liquid solution with a precision-engineered dropper delivery system, giving researchers complete control over dosing accuracy. Each drop is calibrated for consistent volume, eliminating guesswork and reducing waste during experiments.

The dropper format is particularly suited to laboratory environments where exact, repeatable measurements are essential. The pharmaceutical-grade etomidate (CAS 33125-97-2) base maintains full potency and purity throughout the product's shelf life when stored correctly.

Constructed from borosilicate glass with a pharmaceutical-grade pipette dropper, the bottle protects the solution from light and contamination. Supplied batch-coded with a full COA confirming ≥99.8% purity. Shipped discreetly worldwide within 24–48 hours of order.`,
    specifications: [
      "Purity: ≥99.8% (HPLC verified)",
      "Form: Liquid solution with precision dropper",
      "Dropper: Pharmaceutical-grade glass pipette",
      "Bottle: Borosilicate amber glass",
      "Delivery: Calibrated drop volume for accuracy",
      "COA included with every order",
      "Batch-coded for full traceability",
      "Light-protected, tamper-evident packaging",
    ],
    sizes: [
      { label: "100ml", price: 500 },
      { label: "250ml", price: 1250 },
      { label: "500ml", price: 2500 },
      { label: "1000ml", price: 5000 },
    ],
    inStock: true,
    image: "",
  },
  {
    slug: "etomidate-space-oil-nasal",
    name: "Etomidate Space Oil — Nasal Spray",
    price: 500,
    category: "liquid",
    shortDescription:
      "Pharmaceutical-grade etomidate in a fine-mist nasal spray format. Consistent delivery, precise dosing.",
    description: `Etomidate Space Oil Nasal Spray presents our pharmaceutical-grade etomidate liquid solution (CAS 33125-97-2) in a fine-mist nasal spray format, providing a convenient and consistently dosed delivery mechanism for research purposes.

Each actuation delivers a precisely measured volume, allowing researchers to maintain strict dosing protocols across experiments. The fine-mist atomiser ensures even distribution, maximising research reproducibility. The formulation is pH-adjusted and buffered for compatibility with mucosal applications, using only pharmaceutical-grade excipients.

The spray bottle is manufactured from medical-grade materials with a precision pump mechanism rated for thousands of consistent actuations. Every unit is batch-tested and supplied with a full Certificate of Analysis confirming ≥99.8% etomidate purity. Discreet worldwide shipping within 24–48 hours.`,
    specifications: [
      "Purity: ≥99.8% (HPLC verified)",
      "Form: Fine-mist nasal spray solution",
      "Pump: Precision-metered dose atomiser",
      "Excipients: Pharmaceutical-grade only",
      "pH: Adjusted and buffered for mucosal use",
      "COA included with every order",
      "Batch-coded for full traceability",
      "Medical-grade spray mechanism",
    ],
    sizes: [
      { label: "100ml", price: 500 },
      { label: "250ml", price: 1250 },
      { label: "500ml", price: 2500 },
      { label: "1000ml", price: 5000 },
    ],
    inStock: true,
    image: "",
  },
];

async function seedLiquids() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    for (const product of liquidProducts) {
      const existing = await Product.findOne({ slug: product.slug });
      if (existing) {
        await Product.updateOne({ slug: product.slug }, { $set: product });
        console.log(`Updated: ${product.name}`);
      } else {
        await Product.create(product);
        console.log(`Created: ${product.name}`);
      }
    }

    console.log("\nDone — Liquid (Space Oil) products seeded:");
    console.log("  100ml  = €500");
    console.log("  250ml  = €1,250");
    console.log("  500ml  = €2,500");
    console.log("  1000ml = €5,000");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedLiquids();
