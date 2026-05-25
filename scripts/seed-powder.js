/**
 * Seed script for Powder products
 * Run with: node scripts/seed-powder.js
 *
 * Note: Make sure your MONGODB_URI environment variable is set
 */

require('dotenv').config({ path: '.env.local' });

const mongoose = require("mongoose");

// CAS Numbers
const CAS_ETOMIDATE = "33125-97-2";
const CAS_MEDETOMIDINE = "86347-14-0";
const CAS_TILETAMINE = "14176-50-2";
const CAS_SPIROCHLORPHINE = "3222-88-6";

// Powder products data
const powderProducts = [
  {
    slug: "etomidate-powder-pure",
    name: "Etomidate Powder Pure",
    price: 650,
    category: "powder",
    shortDescription: "Pharmaceutical-grade pure etomidate powder with exceptional purity and consistency.",
    description: `Our pure etomidate powder represents the absolute pinnacle of pharmaceutical-grade compounds, meticulously crafted for the most demanding research applications across the scientific spectrum. Etomidate, chemically known as ethyl 1-(1-phenylethyl)-1H-imidazole-5-carboxylate, stands as one of the most significant intravenous anesthetic agents discovered in modern pharmacology, and our powder delivers this compound in its purest form.

Sourced exclusively from certified manufacturers who adhere to the strictest international pharmaceutical standards, our etomidate powder undergoes a rigorous multi-stage quality control process that ensures ≥99.8% purity across every single batch. This isn't merely a number—it's a guarantee that each gram contains precisely what the label promises, with virtually no detectable impurities, byproducts, or contaminants that could compromise your research outcomes.

The crystalline structure of our etomidate powder is a testament to its quality. Each microscopic crystal is uniform in size and structure, ensuring consistent dissolution rates, predictable pharmacokinetics, and reproducible results across all your experimental protocols. This physical uniformity is critical for researchers working with exact dosing requirements, dissolution studies, or formulation development where particle size distribution directly impacts experimental validity.

Every batch is accompanied by a comprehensive Certificate of Analysis (COA) that goes far beyond basic identification. Our documentation includes High-Performance Liquid Chromatography (HPLC) verification showing purity levels, Nuclear Magnetic Resonance (NMR) spectroscopy confirming molecular structure, Mass Spectrometry (MS) validating molecular weight, Fourier-Transform Infrared (FTIR) spectroscopy identifying functional groups, and full elemental analysis. You'll also receive detailed information about residual solvents, heavy metals testing, microbial contamination screening, and batch-specific stability data.

The crystalline structure is carefully preserved through our proprietary packaging process. Each container is vacuum-sealed under inert nitrogen atmosphere, protected from light exposure through amber glass or aluminum-laminated materials, and includes pharmaceutical-grade desiccants to eliminate moisture—one of the primary degradation factors for etomidate. This attention to packaging detail means your powder maintains its full potency and stability throughout its shelf life, even with long-term storage.

Our pure etomidate powder serves an extraordinarily wide range of research applications. In academic institutions, it's used for pharmacological studies exploring GABA-A receptor modulation, structure-activity relationship investigations, and comparative anesthetic research. Pharmaceutical companies rely on it for formulation development, bioequivalence studies, and new drug delivery system testing. Institutional researchers utilize it for protocol standardization, training programs, and reference material preparation.

The compound's unique pharmacological profile makes it invaluable for research into anesthetic mechanisms, hemodynamic stability during induction, cerebral blood flow studies, and neuropharmacological investigations. Unlike many other anesthetic agents, etomidate's minimal cardiovascular impact makes it particularly valuable for research involving subjects with compromised cardiovascular function, though all research applications should follow appropriate ethical and safety guidelines.

When you choose our pure etomidate powder, you're not merely purchasing a chemical compound—you're investing in the integrity of your research, the reliability of your data, and the potential impact of your discoveries. We understand that in scientific research, quality isn't a luxury—it's an absolute necessity. That's why we've dedicated ourselves to providing etomidate powder that meets and exceeds the standards of the world's most prestigious research institutions.

Our commitment to quality extends beyond the product itself to encompass every aspect of your experience. From the moment you place your order to the final analysis of your research results, we provide comprehensive support including technical consultation, analytical method recommendations, regulatory compliance guidance, and responsive customer service from our team of pharmaceutical scientists who understand both the chemistry and the applications of this remarkable compound.

Whether your research focuses on anesthesia mechanisms, pharmaceutical development, receptor pharmacology, or any other application requiring pharmaceutical-grade etomidate, our pure etomidate powder delivers the consistency, purity, and documentation you need to conduct your work with confidence. Experience the difference that true pharmaceutical-grade quality makes in your research outcomes.`,
    specifications: [
      `CAS Number: ${CAS_ETOMIDATE}`,
      "Purity: ≥99.8% (HPLC verified)",
      "Form: Fine crystalline powder",
      "Molecular Formula: C14H16N2O2",
      "Molecular Weight: 244.29 g/mol",
      "Storage: Store in cool, dry place away from light",
      "Certificate of Analysis included with every order",
      "Vacuum-sealed, tamper-evident packaging",
    ],
    sizes: [
      { label: "10g", price: 650 },
      { label: "25g", price: 1400 },
      { label: "50g", price: 2600 },
      { label: "100g", price: 4800 },
    ],
    inStock: true,
    image: "",
  },
  {
    slug: "etomidate-powder-research",
    name: "Etomidate Powder Research",
    price: 650,
    category: "powder",
    shortDescription: "Research-grade etomidate powder specifically formulated for laboratory and scientific studies.",
    description: `Specially prepared for research institutions and laboratories worldwide, our Research Grade Etomidate Powder represents the convergence of pharmaceutical excellence and scientific rigor. This exceptional product meets and exceeds the stringent quality standards demanded by the most prestigious academic institutions, government research facilities, and private pharmaceutical laboratories engaged in cutting-edge scientific applications.

Every single batch of our research-grade etomidate powder undergoes an extraordinarily comprehensive analytical testing protocol that leaves no aspect of quality to chance. High-Performance Liquid Chromatography (HPLC) verifies chemical purity and identifies any potential impurities down to parts-per-million levels. Gas Chromatography-Mass Spectrometry (GC-MS) provides detailed molecular fingerprinting and confirms the absence of residual solvents or synthetic byproducts. Nuclear Magnetic Resonance (NMR) spectroscopy validates the exact molecular structure and stereochemical configuration, ensuring you receive precisely the compound specified by the molecular formula C14H16N2O2.

But our testing doesn't stop at these standard analyses. We additionally employ Fourier-Transform Infrared (FTIR) spectroscopy to verify functional group integrity, X-ray powder diffraction to characterize crystalline structure and polymorphism, thermogravimetric analysis to assess thermal stability, and Karl Fischer titration to determine exact moisture content. This multi-modal analytical approach provides unprecedented documentation of product quality and ensures batch-to-batch consistency that meets the exacting requirements of longitudinal studies and multi-site research protocols.

This research-grade powder is processed under meticulously controlled environmental conditions that far exceed standard pharmaceutical manufacturing requirements. Our production facilities maintain ISO Class 7 cleanroom standards with continuous monitoring of temperature, humidity, particulate count, and microbial contamination. The powder is handled only by trained personnel wearing full protective equipment, and every production step is documented according to Good Manufacturing Practice (GMP) protocols to ensure complete traceability from raw material to finished product.

The fine, uniform particle size of our research-grade powder is achieved through proprietary micronization technology that produces consistent particle size distributions typically ranging from 10-50 microns. This exceptional uniformity is essential for reproducible research protocols, particularly those involving dissolution studies, bioavailability assessments, inhalation research, or formulation development where particle characteristics directly impact experimental outcomes. Unlike generic powders that may exhibit significant particle size variation, our product ensures that your experimental results reflect true pharmacological effects rather than artifacts of physical variability.

Packaging for our research-grade etomidate powder incorporates multiple protective technologies designed to maintain product integrity throughout its shelf life. Pharmaceutical-grade amber glass vials prevent light-induced degradation, while vacuum-sealing under inert nitrogen atmosphere eliminates oxidative deterioration. Molecular sieve desiccants maintain optimal humidity levels, and aluminum-laminated secondary packaging provides additional barrier protection against environmental factors. Each package includes a tamper-evident seal and batch-specific documentation for complete quality assurance.

Trusted by universities across North America, Europe, and Asia, pharmaceutical companies engaged in new drug development, government research institutions, and independent research facilities worldwide, our Research Grade Etomidate Powder has become the reference standard for etomidate research. Whether your work involves GABA-A receptor pharmacology, anesthetic mechanism studies, pharmaceutical formulation science, or any other application requiring the highest quality etomidate, this product delivers the consistency, purity, and documentation essential for publication-quality research.

Our commitment to supporting your research extends beyond providing exceptional product quality. We offer comprehensive technical consultation services to help optimize your analytical methods, guidance on regulatory compliance for research applications, and responsive customer support from our team of Ph.D.-level pharmaceutical scientists. We understand that your research has the potential to advance scientific knowledge and improve human health, and we're dedicated to providing the materials and support you need to achieve meaningful discoveries.`,
    specifications: [
      `CAS Number: ${CAS_ETOMIDATE}`,
      "Purity: ≥99.8% (HPLC/MS verified)",
      "Grade: Research/Laboratory Grade",
      "Form: Fine crystalline powder",
      "Particle Size: Uniform microcrystalline structure",
      "Molecular Formula: C14H16N2O2",
      "Complete analytical documentation included",
      "Nitrogen-flushed, vacuum-sealed packaging",
      "Batch tracking and traceability records",
    ],
    sizes: [
      { label: "10g", price: 650 },
      { label: "25g", price: 1400 },
      { label: "50g", price: 2600 },
      { label: "100g", price: 4800 },
    ],
    inStock: true,
    image: "",
  },
  {
    slug: "research-grade-powder",
    name: "Research Grade Powder",
    price: 650,
    category: "powder",
    shortDescription: "Ultra-pure etomidate powder for critical research and development applications.",
    description: `Our Research Grade Powder sets the absolute benchmark for pharmaceutical research materials, representing the culmination of decades of advancement in pharmaceutical manufacturing and quality assurance. This ultra-pure etomidate powder is specifically engineered for critical research and development applications where even the slightest variation in compound quality could invalidate months or years of careful scientific work.

Manufactured under strictly controlled GMP-compliant conditions in state-of-the-art facilities, this product undergoes our most rigorous triple-verification testing protocols. The first verification occurs at the raw material stage, where incoming etomidate base is subjected to complete analytical characterization to ensure it meets our exacting purity standards. The second verification takes place during manufacturing, with in-process testing at multiple checkpoints to confirm that processing conditions remain optimal and that the product maintains its specified characteristics throughout production. The third and final verification occurs on the finished product, with comprehensive testing that goes well beyond standard pharmaceutical requirements.

This exceptional powder features remarkable batch-to-batch uniformity that has made it the preferred choice for longitudinal studies, multi-site research protocols, and regulatory submission batches. Each shipment includes extraordinarily detailed documentation covering not only standard chromatographic analysis but also advanced spectroscopic characterization, complete physical property testing including particle size distribution analysis, surface area measurements, and bulk density determinations. Our analytical reports include full chromatograms, spectra, and all raw data, allowing your research team to verify our conclusions independently.

Our quality assurance process is genuinely comprehensive, incorporating testing for residual solvents using headspace GC-MS with detection limits in the parts-per-billion range, heavy metals analysis via ICP-MS covering the full spectrum of elemental contaminants, and exhaustive microbial contamination screening that exceeds USP standards. We also conduct stability testing under various environmental conditions to provide you with accurate shelf-life data and storage recommendations specific to your intended research timeline.

The physical characteristics of this powder have been optimized for research applications. The crystalline structure is highly uniform, producing excellent flow properties for automated dispensing systems and consistent dissolution profiles for in-vitro studies. The surface morphology, characterized by scanning electron microscopy, reveals optimal crystal habits that maximize surface area for dissolution while maintaining excellent chemical stability.

For analytical method development, this Research Grade Powder serves as an ideal reference standard. Its exceptional purity means that chromatographic methods developed using this material will have minimal interference from impurities, resulting in cleaner baselines, better peak resolution, and more accurate quantification. Pharmaceutical companies particularly value this product for forced degradation studies, where the absence of initial impurities allows researchers to clearly identify and characterize degradation products formed under stress conditions.

Formulation research benefits enormously from the consistency this powder provides. Whether developing new parenteral formulations, investigating novel drug delivery systems, or optimizing existing products, the batch-to-batch uniformity of our Research Grade Powder eliminates a significant source of variability from your experimental design. This consistency extends to polymorphic form—we guarantee that every batch maintains the same crystal structure, ensuring that solubility, stability, and processing characteristics remain constant.

Our packaging for this premium product reflects its critical nature. Each container is individually serialized and tracked through our quality system. The primary container is pharmaceutical-grade amber borosilicate glass with a PTFE-lined closure that provides both chemical inertness and an excellent moisture barrier. An aluminum overwrap provides additional protection and tamper evidence. The secondary packaging includes shock-absorbing materials to prevent physical damage during shipping, and all packages are shipped with temperature monitoring devices to verify that the cold chain remained intact during transit.

This Research Grade Powder is ideal for pharmacological studies requiring the highest confidence levels, analytical method development where trace impurities could complicate validation, formulation research where consistency is essential for meaningful comparisons, and any application where the quality of the starting material directly impacts the validity of research conclusions. When your research demands the absolute best, this product delivers.`,
    specifications: [
      `CAS Number: ${CAS_ETOMIDATE}`,
      "Purity: ≥99.9% (Ultra-high performance LC verified)",
      "Grade: Premium Research Grade",
      "Form: Crystalline powder, white to off-white",
      "Molecular Formula: C14H16N2O2",
      "Assay: 99.9% ± 0.1%",
      "Loss on Drying: ≤0.5%",
      "Residue on Ignition: ≤0.1%",
      "Complete CoA with chromatograms included",
    ],
    sizes: [
      { label: "10g", price: 650 },
      { label: "25g", price: 1400 },
      { label: "50g", price: 2600 },
      { label: "100g", price: 4800 },
    ],
    inStock: true,
    image: "",
  },
  {
    slug: "medetomidine-powder",
    name: "Medetomidine Powder",
    price: 650,
    category: "powder",
    shortDescription: "High-purity medetomidine powder for research applications.",
    description: `Medetomidine represents one of the most potent and selective α2-adrenergic receptor agonists available for research applications, delivering extraordinary sedative and analgesic effects through highly specific receptor interactions. Our medetomidine powder embodies the pinnacle of synthetic excellence, manufactured under exacting pharmaceutical standards that ensure every batch meets or exceeds the purity requirements of even the most demanding research protocols.

The pharmacological significance of medetomidine in modern research cannot be overstated. As a highly selective agonist for α2-adrenergic receptors, this compound provides researchers with an exceptional tool for investigating the intricate mechanisms of adrenergic receptor signaling, central nervous system sedation pathways, and pain modulation systems. Its extraordinary potency—approximately ten times that of its predecessor, clonidine—makes it invaluable for studies requiring precise dose-response relationships and receptor binding investigations at nanomolar concentrations.

Our medetomidine powder is synthesized through a multi-step process that begins with pharmaceutical-grade starting materials and employs advanced purification techniques to achieve the exceptional purity our research customers require. Each synthesis batch undergoes comprehensive analytical characterization including High-Performance Liquid Chromatography (HPLC) for purity verification, Nuclear Magnetic Resonance (NMR) spectroscopy for structural confirmation, Mass Spectrometry for molecular weight verification, and chiral analysis to ensure the correct stereoisomeric configuration essential for biological activity.

The compound's unique pharmacokinetic profile makes it particularly valuable for research into sustained sedation protocols, where its relatively short half-life allows for rapid onset and recovery compared to many other sedative agents. Researchers investigating cardiovascular function appreciate medetomidine's minimal impact on cardiac output and its ability to maintain stable hemodynamics during sedation—properties that distinguish it from many alternative compounds in the research pharmacopeia.

In the crystalline powder form we provide, medetomidine offers exceptional versatility for research applications. The precise, uniform particle size distribution ensures consistent dissolution characteristics essential for intravenous formulation studies, while the high purity minimizes interference in analytical methods and receptor binding assays. The powder's excellent chemical stability under proper storage conditions means your research materials maintain their potency and integrity throughout extended study periods.

Our quality control process for medetomidine powder incorporates testing protocols that far exceed standard pharmaceutical requirements. In addition to the standard purity and identity testing, we conduct comprehensive residual solvent analysis, heavy metals screening, and microbial contamination testing to ensure the product meets the standards required for the most sensitive research applications. Each batch is accompanied by a detailed Certificate of Analysis documenting all test results and providing the traceability essential for regulated research environments.

The packaging of our medetomidine powder reflects our understanding of its value to your research. Each container is prepared under inert nitrogen atmosphere to prevent oxidative degradation, sealed with pharmaceutical-grade closures that provide both chemical inertness and moisture protection, and packaged in amber glass or aluminum-laminated materials that prevent light-induced degradation. We include pharmaceutical-grade desiccants and oxygen scavengers to maintain optimal storage conditions throughout the product's shelf life.

Whether your research focuses on adrenergic receptor pharmacology, sedation mechanism studies, pain management research, veterinary applications, or any other field requiring this exceptional compound, our medetomidine powder provides the quality, consistency, and documentation essential for publication-grade research. We understand the critical importance of reliable research materials in advancing scientific knowledge, and we're committed to providing products that support your pursuit of discovery.`,
    specifications: [
      `CAS Number: ${CAS_MEDETOMIDINE}`,
      "Purity: ≥99.5% (HPLC verified)",
      "Form: White crystalline powder",
      "Molecular Formula: C13H16N2",
      "Molecular Weight: 200.28 g/mol",
      "Melting Point: 150-154°C",
      "Storage: Store at -20°C, protect from moisture",
      "Certificate of Analysis included",
      "Amber glass vial with desiccant",
    ],
    sizes: [
      { label: "10g", price: 650 },
      { label: "25g", price: 1400 },
      { label: "50g", price: 2600 },
      { label: "100g", price: 4800 },
    ],
    inStock: true,
    image: "",
  },
  {
    slug: "tiletamine-powder",
    name: "Tiletamine Powder",
    price: 650,
    category: "powder",
    shortDescription: "Pharmaceutical-grade tiletamine powder for research and veterinary applications.",
    description: `Tiletamine represents a unique and powerful dissociative anesthetic agent that has garnered significant attention in both research and veterinary medicine for its distinctive pharmacological properties. Structurally related to the well-known dissociative anesthetics phencyclidine (PCP) and ketamine, tiletamine occupies a special position in the pharmacopeia as an NMDA receptor antagonist with specific characteristics that make it invaluable for scientific investigation.

Our pharmaceutical-grade tiletamine powder is produced under extraordinarily strict quality control protocols that ensure every batch meets the highest standards of purity and consistency. The synthesis begins with carefully selected, high-purity starting materials and proceeds through multiple purification stages designed to eliminate impurities, byproducts, and any residual reagents. The result is a crystalline powder of exceptional quality that researchers can rely on for reproducible results across even the most demanding experimental protocols.

This compound serves as an exceptionally valuable research tool for studying NMDA receptor pharmacology, the complex mechanisms underlying dissociative anesthesia, and various neuropharmacological pathways. The NMDA receptor, which tiletamine selectively antagonizes, plays crucial roles in synaptic plasticity, memory formation, and pain processing—making tiletamine an essential compound for researchers investigating these fundamental neurological processes. Studies utilizing high-quality tiletamine have contributed significantly to our understanding of glutamatergic neurotransmission and its role in consciousness.

The high-purity powder form we provide enables accurate dosing and consistent experimental results that are essential for valid scientific conclusions. Our micronized powder exhibits uniform particle size distribution, ensuring consistent dissolution characteristics whether you're preparing aqueous solutions for in-vivo studies or conducting in-vitro receptor binding assays. This physical consistency eliminates a potential source of experimental variability, allowing you to focus on the pharmacological phenomena under investigation rather than concerns about material quality.

Every batch of our tiletamine powder undergoes comprehensive testing using validated analytical methods. High-Performance Liquid Chromatography (HPLC) verifies chemical purity and quantifies any trace impurities. Nuclear Magnetic Resonance (NMR) spectroscopy confirms molecular structure and stereochemistry. Mass spectrometry validates molecular weight and elemental composition. Additional testing includes Karl Fischer titration for moisture content, heavy metals screening, and residual solvent analysis to ensure comprehensive quality assurance.

The product is packaged to maintain optimal stability throughout its shelf life. We employ amber glass containers that protect against light-induced degradation, vacuum-sealing under inert nitrogen atmosphere to prevent oxidative deterioration, and pharmaceutical-grade desiccants to control moisture. The secure, tamper-evident packaging provides both physical protection during shipping and assurance of product integrity upon receipt. Each container is labeled with batch numbers, expiration dates, and storage conditions to facilitate proper inventory management in your research facility.

Comprehensive safety and handling documentation accompanies every shipment, including detailed Material Safety Data Sheets (MSDS), recommended handling procedures, first aid information, and disposal guidelines. We understand that responsible research requires not only high-quality materials but also the knowledge to use them safely and effectively. Our technical support team remains available to answer questions about product handling, analytical methods, or any other aspect of your research using this compound.

Whether your research focuses on NMDA receptor function, dissociative anesthetic mechanisms, neuropharmacology, or veterinary applications, our pharmaceutical-grade tiletamine powder provides the quality, consistency, and documentation you need to conduct meaningful, publication-quality research.`,
    specifications: [
      `CAS Number: ${CAS_TILETAMINE}`,
      "Purity: ≥99.0% (HPLC verified)",
      "Form: White to off-white crystalline powder",
      "Molecular Formula: C12H17NOS",
      "Molecular Weight: 223.34 g/mol",
      "Solubility: Soluble in water, ethanol, DMSO",
      "Storage: Store at 2-8°C, protect from light",
      "Certificate of Analysis included",
      "Safety data sheet provided",
      "Secure, tamper-evident packaging",
    ],
    sizes: [
      { label: "10g", price: 650 },
      { label: "25g", price: 1400 },
      { label: "50g", price: 2600 },
      { label: "100g", price: 4800 },
    ],
    inStock: true,
    image: "",
  },
  {
    slug: "spirochlorphine-r6890",
    name: "Spirochlorphine R6890",
    price: 650,
    category: "powder",
    shortDescription: "High-purity Spirochlorphine R6890 powder for advanced research applications.",
    description: `Spirochlorphine R6890 stands as one of the most potent and selective κ-opioid receptor agonists discovered in modern pharmacological research, representing a significant advancement in our understanding of opioid receptor pharmacology and pain management mechanisms. This exceptional compound, identified by its unique chemical designation R6890, has emerged as a critical tool for researchers investigating the complex pathways of pain modulation, neuropharmacology, and the therapeutic potential of targeted opioid receptor activation.

Our pharmaceutical-grade Spirochlorphine R6890 powder is synthesized through sophisticated multi-step processes that demand the highest levels of chemical expertise and manufacturing precision. The synthesis begins with premium-grade starting materials that undergo rigorous pre-qualification testing to ensure they meet our exacting standards for purity and reactivity. Each synthetic step is carefully controlled with regard to temperature, pressure, reaction time, and stoichiometry to maximize yield while minimizing the formation of unwanted byproducts or stereoisomers. The result is a product of exceptional chemical purity that consistently exceeds 99.5% as verified by High-Performance Liquid Chromatography analysis.

The pharmacological profile of Spirochlorphine R6890 distinguishes it from other compounds in the opioid receptor agonist class. Its extraordinary selectivity for κ-opioid receptors—significantly greater than its affinity for μ or δ receptors—makes it an invaluable probe for dissecting the specific contributions of κ-receptor signaling to various physiological and behavioral outcomes. Researchers utilizing this compound can study κ-receptor mediated analgesia, the dysphoric and hallucinogenic effects associated with κ-activation, diuresis, neuroendocrine modulation, and the complex interactions between different opioid receptor subtypes in pain processing circuits.

The κ-opioid receptor, which Spirochlorphine R6890 selectively targets, plays crucial roles in modulating pain perception, stress responses, mood regulation, and various aspects of neuroendocrine function. Unlike μ-opioid agonists such as morphine or fentanyl, κ-selective compounds offer a different spectrum of pharmacological effects that include unique analgesic properties, particularly for visceral and inflammatory pain, without producing the same degree of respiratory depression or abuse liability. These characteristics make Spirochlorphine R6890 essential for research into next-generation analgesic therapies that might avoid the devastating public health consequences associated with traditional opioid medications.

Every batch of our Spirochlorphine R6890 powder undergoes comprehensive analytical characterization that far exceeds standard quality control protocols. High-Performance Liquid Chromatography (HPLC) with diode array detection verifies chemical purity and identifies any potential impurities down to the parts-per-million level. Liquid Chromatography-Mass Spectrometry (LC-MS) provides definitive molecular weight confirmation and structure verification. Nuclear Magnetic Resonance (NMR) spectroscopy, including both proton and carbon spectra, confirms the exact molecular structure and stereochemical configuration essential for biological activity.

Additional testing includes Fourier-Transform Infrared (FTIR) spectroscopy to verify functional group integrity, X-ray powder diffraction to characterize crystalline structure, thermogravimetric analysis to assess thermal stability, and differential scanning calorimetry to determine melting characteristics and identify any polymorphic forms. We also conduct extensive residual solvent analysis using headspace gas chromatography, heavy metals screening via inductively coupled plasma mass spectrometry (ICP-MS), and complete microbial contamination testing to ensure the product meets the standards required for even the most sensitive in-vivo research applications.

The crystalline powder form we provide is specifically engineered to support the diverse needs of advanced research protocols. The uniform particle size distribution, achieved through precision micronization technology, ensures consistent dissolution characteristics essential for preparing accurate stock solutions, conducting dose-response studies, and formulating experimental preparations. The high surface area-to-volume ratio of our micronized powder facilitates rapid dissolution in appropriate solvents while maintaining excellent chemical stability during storage.

Our packaging for this premium research compound reflects its value and sensitivity. The primary container consists of pharmaceutical-grade amber borosilicate glass that provides excellent chemical resistance and protects the contents from light-induced degradation. A specialized PTFE-lined closure system ensures both chemical inertness and an exceptional barrier against moisture and atmospheric oxygen. Each container is prepared under strictly controlled environmental conditions with inert nitrogen atmosphere, vacuum-sealed to eliminate oxidative degradation pathways, and includes pharmaceutical-grade molecular sieve desiccants to maintain optimal humidity levels throughout the product's shelf life.

Comprehensive documentation accompanies every shipment, including detailed Certificates of Analysis with full chromatograms and spectral data, Material Safety Data Sheets (MSDS) prepared by certified safety professionals, handling guidelines specific to this compound's unique properties, recommended storage conditions based on accelerated stability studies, and regulatory information to support institutional review board submissions and regulatory compliance. Our technical support team, including Ph.D.-level pharmacologists and analytical chemists, remains available to assist with experimental design, analytical method development, and any questions regarding the proper handling or application of this compound.

Spirochlorphine R6890 is intended exclusively for experienced researchers and institutions with appropriate licensing, safety protocols, and institutional oversight for working with potent opioid receptor agonists. We strongly emphasize that this compound is for research purposes only and must be handled according to all applicable regulations governing controlled substances and experimental compounds. The powerful pharmacological activity of this compound demands respect, proper safety equipment, and adherence to established protocols for handling high-potency research materials.

Whether your research focuses on opioid receptor pharmacology, pain management mechanisms, neuroendocrine function, substance use disorder research, or the development of novel therapeutic agents, our pharmaceutical-grade Spirochlorphine R6890 powder provides the exceptional quality, comprehensive documentation, and reliable consistency essential for groundbreaking discoveries. We are proud to support the advancement of scientific knowledge through the provision of premium research materials that meet the exacting standards of the global research community.`,
    specifications: [
      `CAS Number: ${CAS_SPIROCHLORPHINE}`,
      "Purity: ≥99.5% (HPLC verified)",
      "Form: White crystalline powder",
      "Molecular Formula: C22H28Cl2N2O2",
      "Molecular Weight: 423.38 g/mol",
      "Storage: Store at -20°C, protect from light and moisture",
      "Certificate of Analysis included",
      "Safety data sheet provided",
      "Secure, tamper-evident packaging",
    ],
    sizes: [
      { label: "10g", price: 650 },
      { label: "25g", price: 1400 },
      { label: "50g", price: 2600 },
      { label: "100g", price: 4800 },
    ],
    inStock: true,
    image: "",
  },
];

async function seedPowder() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI || MONGODB_URI.includes("username:password")) {
      console.error("Error: MONGODB_URI environment variable is not set or contains placeholder");
      console.log("Please set your MongoDB connection string:");
      console.log("  Windows: set MONGODB_URI=your_connection_string");
      console.log("  Mac/Linux: export MONGODB_URI=your_connection_string");
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log("✓ Connected to MongoDB");

    // Define Product Schema (same as in the app)
    const SizeSchema = new mongoose.Schema(
      {
        label: { type: String, required: true },
        price: { type: Number, required: true },
      },
      { _id: false }
    );

    const ProductSchema = new mongoose.Schema(
      {
        slug: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, enum: ["powder", "vape", "liquid", "flavours"], required: true },
        shortDescription: { type: String, default: "" },
        description: { type: String, default: "" },
        specifications: [{ type: String }],
        sizes: [SizeSchema],
        inStock: { type: Boolean, default: true },
        image: { type: String, default: "" },
      },
      { timestamps: true }
    );

    const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

    // Insert or update products
    let inserted = 0;
    let updated = 0;

    for (const productData of powderProducts) {
      const existing = await Product.findOne({ slug: productData.slug });
      
      if (existing) {
        await Product.updateOne({ slug: productData.slug }, productData);
        console.log(`✓ Updated: ${productData.name}`);
        updated++;
      } else {
        await Product.create(productData);
        console.log(`✓ Created: ${productData.name}`);
        inserted++;
      }
    }

    console.log("\n" + "=".repeat(50));
    console.log("Seeding complete!");
    console.log(`  Inserted: ${inserted} products`);
    console.log(`  Updated: ${updated} products`);
    console.log(`  Total: ${powderProducts.length} powder products`);
    console.log("=".repeat(50));

    await mongoose.disconnect();
    console.log("✓ Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error.message);
    process.exit(1);
  }
}

// Run the seed function
seedPowder();
