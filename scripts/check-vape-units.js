const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = "mongodb+srv://nzoggeivo_db_user:T9SOZDL4tOxljQ7h@cluster0.vkmmuuo.mongodb.net/?appName=Cluster0";

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  slug: String,
  price: Number,
  category: String,
  description: String,
  sizes: [{
    label: String,
    price: Number
  }],
  image: String,
  createdAt: Date,
  updatedAt: Date
});

const Product = mongoose.model('Product', ProductSchema);

async function checkVapeUnits() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get all vape products
    const vapeProducts = await Product.find({ category: 'vape' });
    console.log(`\n📊 Found ${vapeProducts.length} vape products in database\n`);

    vapeProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Slug: ${product.slug}`);
      console.log(`   Sizes:`);
      product.sizes.forEach((size, sizeIndex) => {
        console.log(`     ${sizeIndex + 1}. ${size.label} - €${size.price}`);
      });
      console.log('');
    });

    console.log('🔍 Analysis:');
    const problematicSizes = [];
    vapeProducts.forEach(product => {
      product.sizes.forEach(size => {
        if (size.label.toLowerCase().includes('gram') || 
            size.label.toLowerCase().includes('g ') || 
            size.label.match(/\d+g$/)) {
          problematicSizes.push({
            product: product.name,
            size: size.label
          });
        }
      });
    });

    if (problematicSizes.length > 0) {
      console.log('❌ Found vape products with gram units:');
      problematicSizes.forEach(item => {
        console.log(`   • ${item.product}: ${item.size}`);
      });
    } else {
      console.log('✅ No vape products with gram units found');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the check
checkVapeUnits();
