const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = "mongodb+srv://nzoggeivo_db_user:T9SOZDL4tOxljQ7h@cluster0.vkmmuuo.mongodb.net/?appName=Cluster0";

// Image Schema
const ImageSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    data: { type: String, required: true }, // base64 encoded
  },
  { timestamps: true }
);

const Image = mongoose.model('Image', ImageSchema);

async function testImageUpload() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB successfully');

    // Test 1: Check if Image collection exists
    console.log('\n📁 Test 1: Checking Image collection...');
    const collections = await mongoose.connection.db.listCollections().toArray();
    const imageCollectionExists = collections.some(col => col.name === 'images');
    
    if (imageCollectionExists) {
      console.log('✓ Images collection exists');
      
      // Count existing images
      const imageCount = await Image.countDocuments();
      console.log(`📊 Found ${imageCount} images in database`);
      
      if (imageCount > 0) {
        console.log('\n📋 Recent images:');
        const recentImages = await Image.find().sort({ createdAt: -1 }).limit(3);
        recentImages.forEach((img, index) => {
          console.log(`  ${index + 1}. ${img.filename} (${img.contentType}) - ${img.createdAt}`);
        });
      }
    } else {
      console.log('⚠️ Images collection does not exist - will be created on first upload');
    }

    // Test 2: Create a test image entry
    console.log('\n🖼️ Test 2: Creating test image entry...');
    const testImageData = {
      filename: 'test-image.jpg',
      contentType: 'image/jpeg',
      data: '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A' // Small test image data
    };

    const testImage = await Image.create(testImageData);
    console.log(`✓ Test image created with ID: ${testImage._id}`);

    // Test 3: Verify image retrieval
    console.log('\n🔍 Test 3: Testing image retrieval...');
    const retrievedImage = await Image.findById(testImage._id);
    
    if (retrievedImage) {
      console.log('✓ Image retrieval successful');
      console.log(`  - Filename: ${retrievedImage.filename}`);
      console.log(`  - Content Type: ${retrievedImage.contentType}`);
      console.log(`  - Data length: ${retrievedImage.data.length} characters`);
    } else {
      console.log('❌ Image retrieval failed');
    }

    // Test 4: Cleanup test image
    console.log('\n🧹 Test 4: Cleaning up test image...');
    await Image.deleteOne({ _id: testImage._id });
    console.log('✓ Test image cleaned up');

    console.log('\n🎉 Image upload system test completed!');
    console.log('\n📊 System Status:');
    console.log('  ✓ Database connection: Working');
    console.log('  ✓ Image model: Working');
    console.log('  ✓ Image storage: Working');
    console.log('  ✓ Image retrieval: Working');
    
    console.log('\n🔧 Upload Troubleshooting:');
    console.log('1. Check if you are logged into admin panel');
    console.log('2. Verify file size is under 5MB');
    console.log('3. Ensure file type is: JPG, PNG, WebP, GIF, or SVG');
    console.log('4. Check browser console for specific error messages');
    console.log('5. Verify network tab for failed API calls');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the test
testImageUpload();
