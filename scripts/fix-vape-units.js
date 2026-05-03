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

async function fixVapeUnits() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get all vape products
    const vapeProducts = await Product.find({ category: 'vape' });
    console.log(`\n🔧 Fixing units for ${vapeProducts.length} vape products...\n`);

    // Define appropriate vape sizes for each product type
    const vapeSizeMappings = {
      'etomidate-vape-kpod-classic': [
        { label: '1 K-Pod (500 puffs)', price: 120 },
        { label: '3 K-Pods Pack', price: 320 },
        { label: '5 K-Pods Pack', price: 480 },
        { label: '10 K-Pods Bulk', price: 880 }
      ],
      'etomidate-vape-kpod-strong': [
        { label: '1 K-Pod (500 puffs)', price: 140 },
        { label: '3 K-Pods Pack', price: 380 },
        { label: '5 K-Pods Pack', price: 580 },
        { label: '10 K-Pods Bulk', price: 1080 }
      ],
      'etomidate-vape-disposable-mini': [
        { label: '1 Mini (200 puffs)', price: 80 },
        { label: '3 Mini Pack', price: 220 },
        { label: '5 Mini Pack', price: 340 },
        { label: '10 Mini Bulk', price: 640 }
      ],
      'etomidate-vape-kpod-menthol': [
        { label: '1 K-Pod (500 puffs)', price: 130 },
        { label: '3 K-Pods Pack', price: 350 },
        { label: '5 K-Pods Pack', price: 530 },
        { label: '10 K-Pods Bulk', price: 980 }
      ],
      'etomidate-vape-starter-kit': [
        { label: 'Starter Kit (1 K-Pod + Device)', price: 180 },
        { label: 'Pro Kit (3 K-Pods + Device)', price: 420 },
        { label: 'Ultimate Kit (5 K-Pods + Device)', price: 620 },
        { label: 'Business Kit (10 K-Pods + 2 Devices)', price: 1180 }
      ],
      'etomidate-vape-kpod-max': [
        { label: '1 K-Pod Max (800 puffs)', price: 160 },
        { label: '3 K-Pods Max Pack', price: 440 },
        { label: '5 K-Pods Max Pack', price: 680 },
        { label: '10 K-Pods Max Bulk', price: 1280 }
      ]
    };

    // Update each vape product
    for (const product of vapeProducts) {
      const newSizes = vapeSizeMappings[product.slug];
      
      if (newSizes) {
        console.log(`🔄 Updating ${product.name}:`);
        console.log(`   Old sizes: ${product.sizes.map(s => s.label).join(', ')}`);
        console.log(`   New sizes: ${newSizes.map(s => s.label).join(', ')}`);
        
        // Update the product
        await Product.updateOne(
          { _id: product._id },
          { 
            $set: { 
              sizes: newSizes,
              updatedAt: new Date()
            }
          }
        );
        
        console.log(`   ✅ Updated successfully\n`);
      } else {
        console.log(`⚠️  No size mapping found for ${product.name}`);
      }
    }

    // Verify the updates
    console.log('🔍 Verifying updates...');
    const updatedVapeProducts = await Product.find({ category: 'vape' });
    
    console.log('\n📊 Updated Vape Products:');
    updatedVapeProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}:`);
      product.sizes.forEach((size, sizeIndex) => {
        console.log(`     ${sizeIndex + 1}. ${size.label} - €${size.price}`);
      });
      console.log('');
    });

    console.log('✅ All vape product units have been fixed!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the fix
fixVapeUnits();
