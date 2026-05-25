require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const SizeSchema = new mongoose.Schema({ label: String, price: Number });
const ProductSchema = new mongoose.Schema({
  slug: String,
  name: String,
  price: Number,
  category: String,
  shortDescription: String,
  description: String,
  specifications: [String],
  sizes: [SizeSchema],
  inStock: Boolean,
  image: String,
});
const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

const update = {
  name: "Cychlorphine HCL Powder",
  shortDescription:
    "Ultra-pure Cychlorphine HCL powder for advanced pharmaceutical research. Batch-tested, COA certified, and produced under GMP-compliant conditions.",
  description: `Cychlorphine HCL Powder is a premium pharmaceutical-grade research compound produced under rigorous GMP-compliant manufacturing conditions. Engineered for advanced research and development applications, this product meets the exacting standards required by academic institutions, independent laboratories, and pharmaceutical research teams worldwide.

Each batch of Cychlorphine HCL Powder undergoes a comprehensive triple-verification testing protocol before release. Incoming raw materials are fully characterised at the point of receipt. In-process testing is conducted at multiple checkpoints during manufacturing to confirm that conditions remain optimal throughout production. The finished product then undergoes complete analytical verification, with results confirmed independently before any batch is approved for release.

The physical characteristics of this powder have been carefully optimised for research use. The crystalline structure is highly uniform, delivering excellent flow properties for automated dispensing systems and reproducible dissolution profiles across in-vitro and in-vivo studies. Particle size distribution, bulk density, and surface morphology are all controlled and documented, ensuring consistent handling characteristics batch to batch.

Analytical documentation supplied with each order goes beyond standard requirements. Full high-performance chromatographic analysis, residual solvent testing via GC-MS, heavy metals screening, and microbial contamination testing are all conducted and reported. Stability data under multiple storage conditions is available upon request, allowing research teams to plan accurately around their intended timelines.

Packaging is designed to protect product integrity from the point of manufacture through to delivery. Pharmaceutical-grade amber borosilicate glass with PTFE-lined closures provides chemical inertness and an excellent moisture barrier. Each container is individually serialised, tracked through our quality system, and shipped with temperature monitoring to verify cold chain compliance throughout transit.

Cychlorphine HCL Powder is the compound of choice when research outcomes depend entirely on the quality and consistency of the starting material. When precision matters, this product delivers.`,
  specifications: [
    "Purity: ≥99.9% (HPLC verified)",
    "Grade: Pharmaceutical Research Grade",
    "Form: Crystalline powder, white to off-white",
    "Loss on Drying: ≤0.5%",
    "Residue on Ignition: ≤0.1%",
    "Residual Solvents: Tested via GC-MS",
    "Heavy Metals: Tested via ICP-MS",
    "Full COA with chromatograms included",
    "Batch-coded for full traceability",
    "GMP-compliant manufacturing",
  ],
};

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const result = await Product.updateOne(
      { slug: "research-grade-powder" },
      { $set: update }
    );

    if (result.modifiedCount > 0) {
      console.log("Updated: Cychlorphine HCL Powder — description, short description, and specifications rewritten.");
    } else {
      console.log("No document modified — check slug.");
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
