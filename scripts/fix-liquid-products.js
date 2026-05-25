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
      "Form: Pharmaceutical-grade liquid solution",
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
    slug: "etomidate-pg-solution",
    name: "Etomidate PG Solution",
    price: 500,
    category: "liquid",
    shortDescription:
      "Etomidate in propylene glycol — the classic pharmaceutical carrier. Stable, highly soluble, and widely used in research.",
    description: `Etomidate PG Solution is etomidate (CAS 33125-97-2) dissolved in pharmaceutical-grade propylene glycol (PG), one of the most established and trusted carrier solvents in pharmaceutical liquid formulation. This is the original clinical etomidate preparation format, used for decades in medical and research settings worldwide.

Propylene glycol provides excellent solubility for etomidate at high concentrations while maintaining chemical stability over extended storage periods. The resulting solution is clear, colourless, and consistent batch to batch — exactly what serious researchers require.

Our Etomidate PG Solution is produced under strict quality control conditions, with each batch achieving ≥99.8% active compound purity confirmed by HPLC analysis. Supplied in sealed pharmaceutical-grade amber glass bottles with full batch documentation and a Certificate of Analysis (COA).

Available in 100ml through to 1000ml. Ships discreetly worldwide within 24–48 hours.`,
    specifications: [
      "Purity: ≥99.8% (HPLC verified)",
      "Form: Etomidate in propylene glycol (PG)",
      "CAS: 33125-97-2",
      "Carrier: Pharmaceutical-grade propylene glycol",
      "Appearance: Clear, colourless solution",
      "COA included with every order",
      "Batch-coded for full traceability",
      "Storage: Cool, dark place below 25°C",
    ],
    sizes,
    inStock: true,
    image: "",
  },
  {
    slug: "etomidate-lipid-emulsion",
    name: "Etomidate Lipid Emulsion",
    price: 500,
    category: "liquid",
    shortDescription:
      "Etomidate in a lipid emulsion base — the modern pharmaceutical-grade formulation for smoother, more stable delivery.",
    description: `Etomidate Lipid Emulsion is etomidate (CAS 33125-97-2) formulated in a pharmaceutical-grade lipid emulsion base, modelled on the clinical Etomidate-Lipuro preparation. The lipid carrier significantly improves the tolerability and stability profile of the solution compared to traditional propylene glycol-based preparations.

The milky-white lipid emulsion encapsulates the etomidate active compound, improving chemical stability and extending shelf life while maintaining the same ≥99.8% purity standard. This formulation is particularly well-suited for research applications requiring a lipid-compatible delivery medium.

Produced under GMP-aligned conditions with full quality documentation. Each batch undergoes HPLC purity testing before release, and a Certificate of Analysis (COA) is included with every order. Supplied in sealed pharmaceutical-grade glass vials or bottles appropriate to the ordered volume.

Available in 100ml, 250ml, 500ml, and 1000ml. Ships discreetly worldwide within 24–48 hours of order.`,
    specifications: [
      "Purity: ≥99.8% (HPLC verified)",
      "Form: Etomidate in lipid emulsion",
      "CAS: 33125-97-2",
      "Carrier: Pharmaceutical-grade lipid emulsion base",
      "Appearance: White to off-white emulsion",
      "COA included with every order",
      "Batch-coded for full traceability",
      "GMP-aligned manufacturing",
    ],
    sizes,
    inStock: true,
    image: "",
  },
  {
    slug: "etomidate-oral-solution",
    name: "Etomidate Oral Solution",
    price: 500,
    category: "liquid",
    shortDescription:
      "Pharmaceutical-grade etomidate formulated as an oral liquid solution. Precisely dosed, stable, and research-ready.",
    description: `Etomidate Oral Solution is a pharmaceutical-grade liquid preparation of etomidate (CAS 33125-97-2) formulated specifically as an oral-route liquid. The formulation uses a carefully selected aqueous-based carrier system with pharmaceutical-grade excipients to achieve optimal solubility, stability, and palatability for oral administration research.

Each batch is pH-adjusted and buffered to ensure chemical stability and compatibility with the oral route. The solution is filtered to pharmaceutical standards, producing a clear, consistent preparation that maintains its integrity throughout the stated shelf life when stored correctly.

This product is intended for research applications examining oral etomidate pharmacokinetics, bioavailability studies, and related scientific investigations. ≥99.8% purity confirmed by HPLC. Full Certificate of Analysis (COA) included. Shipped in sealed amber glass bottles, discreetly worldwide within 24–48 hours.`,
    specifications: [
      "Purity: ≥99.8% (HPLC verified)",
      "Form: Oral liquid solution",
      "CAS: 33125-97-2",
      "Carrier: Aqueous pharmaceutical-grade base",
      "pH: Adjusted and buffered for oral route",
      "COA included with every order",
      "Batch-coded for full traceability",
      "Storage: Refrigerate after opening",
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

    const deleted = await Product.deleteMany({ category: "liquid" });
    console.log(`Removed ${deleted.deletedCount} old liquid products`);

    for (const product of liquidProducts) {
      await Product.create(product);
      console.log(`Created: ${product.name}`);
    }

    console.log("\nDone — Liquid products updated.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
