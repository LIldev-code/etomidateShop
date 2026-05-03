const fs = require('fs');
const FormData = require('form-data');

// Test upload with authentication
async function testUploadWithAuth() {
  try {
    console.log('🔐 Testing Upload Authentication...');
    
    // First, let's test the auth endpoint
    console.log('\n1. Testing admin authentication...');
    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'Etomidate-Admin',
        password: 'Etomidate1234H'
      })
    });

    if (!loginResponse.ok) {
      console.log('❌ Admin login failed');
      console.log('Status:', loginResponse.status);
      console.log('Status Text:', loginResponse.statusText);
      return;
    }

    const loginData = await loginResponse.json();
    console.log('✅ Admin login successful');
    
    // Get the token from cookies (need to extract from response headers)
    const setCookieHeader = loginResponse.headers.get('set-cookie');
    let adminToken = null;
    
    if (setCookieHeader) {
      const cookies = setCookieHeader.split(';');
      for (const cookie of cookies) {
        if (cookie.trim().startsWith('admin_token=')) {
          adminToken = cookie.trim().split('=')[1];
          break;
        }
      }
    }

    if (!adminToken) {
      console.log('❌ Could not extract admin token from login response');
      return;
    }

    console.log('✅ Admin token extracted');

    // Test 2: Try upload without authentication (should fail)
    console.log('\n2. Testing upload without authentication...');
    const formData = new FormData();
    
    // Create a small test image buffer
    const testImageData = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');
    formData.append('file', testImageData, {
      filename: 'test.png',
      contentType: 'image/png'
    });

    const uploadWithoutAuth = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData
    });

    if (uploadWithoutAuth.status === 401) {
      console.log('✅ Upload correctly requires authentication');
    } else {
      console.log('❌ Upload should require authentication but didn\'t');
      console.log('Status:', uploadWithoutAuth.status);
    }

    // Test 3: Try upload with authentication
    console.log('\n3. Testing upload with authentication...');
    const uploadWithAuth = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      headers: {
        'Cookie': `admin_token=${adminToken}`
      },
      body: formData
    });

    if (uploadWithAuth.ok) {
      const uploadData = await uploadWithAuth.json();
      console.log('✅ Upload successful with authentication');
      console.log('Image URL:', uploadData.url);
      
      // Test 4: Verify the uploaded image is accessible
      console.log('\n4. Testing uploaded image accessibility...');
      const imageResponse = await fetch(`http://localhost:3000${uploadData.url}`);
      
      if (imageResponse.ok) {
        console.log('✅ Uploaded image is accessible');
        console.log('Content-Type:', imageResponse.headers.get('content-type'));
        console.log('Content-Length:', imageResponse.headers.get('content-length'));
      } else {
        console.log('❌ Uploaded image is not accessible');
        console.log('Status:', imageResponse.status);
      }
    } else {
      const errorData = await uploadWithAuth.json();
      console.log('❌ Upload failed with authentication');
      console.log('Status:', uploadWithAuth.status);
      console.log('Error:', errorData.error);
    }

    console.log('\n🎉 Upload authentication test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Check if development server is running
async function checkDevServer() {
  try {
    const response = await fetch('http://localhost:3000');
    return response.ok;
  } catch {
    return false;
  }
}

// Main test function
async function runUploadTest() {
  console.log('🚀 Starting Image Upload Diagnostic Test...\n');
  
  // Check if development server is running
  console.log('📡 Checking if development server is running...');
  const serverRunning = await checkDevServer();
  
  if (!serverRunning) {
    console.log('❌ Development server is not running on http://localhost:3000');
    console.log('💡 Please start the development server with: npm run dev');
    return;
  }
  
  console.log('✅ Development server is running');
  
  // Run the authentication test
  await testUploadWithAuth();
}

// Run the test
runUploadTest();
