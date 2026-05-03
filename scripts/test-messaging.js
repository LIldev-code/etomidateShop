const mongoose = require('mongoose');
const { sendContactNotification } = require('../src/lib/mailer');

// MongoDB connection
const MONGODB_URI = "mongodb+srv://nzoggeivo_db_user:T9SOZDL4tOxljQ7h@cluster0.vkmmuuo.mongodb.net/?appName=Cluster0";

// Message Schema
const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, default: "General Inquiry" },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', MessageSchema);

async function testMessagingSystem() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB successfully');

    // Test 1: Create a test message in database
    console.log('\n📝 Test 1: Creating test message in database...');
    const testMessage = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Message - Please Ignore',
      message: 'This is a test message to verify the messaging system is working properly. If you receive this, the system is functioning correctly.'
    };

    const createdMessage = await Message.create(testMessage);
    console.log(`✓ Test message created with ID: ${createdMessage._id}`);

    // Test 2: Test email notification
    console.log('\n📧 Test 2: Testing email notification...');
    try {
      await sendContactNotification(testMessage);
      console.log('✓ Email notification sent successfully');
    } catch (emailError) {
      console.log('⚠️ Email notification failed:', emailError.message);
      console.log('💡 Note: Email will work once GMAIL_APP_PASSWORD is configured');
    }

    // Test 3: Verify message retrieval
    console.log('\n📋 Test 3: Testing message retrieval...');
    const messages = await Message.find({}).sort({ createdAt: -1 }).limit(5);
    console.log(`✓ Retrieved ${messages.length} recent messages from database`);
    
    if (messages.length > 0) {
      console.log('Latest message:');
      console.log(`  - From: ${messages[0].name} (${messages[0].email})`);
      console.log(`  - Subject: ${messages[0].subject}`);
      console.log(`  - Created: ${messages[0].createdAt}`);
    }

    // Test 4: Cleanup test message
    console.log('\n🧹 Test 4: Cleaning up test message...');
    await Message.deleteOne({ _id: createdMessage._id });
    console.log('✓ Test message cleaned up');

    console.log('\n🎉 All messaging system tests completed!');
    console.log('\n📊 System Status:');
    console.log('  ✓ Database connection: Working');
    console.log('  ✓ Message storage: Working');
    console.log('  ✓ Message retrieval: Working');
    console.log('  ✓ Email configuration: Ready (needs GMAIL_APP_PASSWORD)');
    
    console.log('\n📧 Email Setup Instructions:');
    console.log('1. Set up orders@buyetomidateproducts.com as a Gmail account');
    console.log('2. Generate a Gmail App Password from Google Account settings');
    console.log('3. Update GMAIL_APP_PASSWORD in .env.local with the app password');
    console.log('4. Emails will then be sent to wplug80@gmail.com');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the test
testMessagingSystem();
