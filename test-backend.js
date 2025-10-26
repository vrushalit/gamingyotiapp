// Test script to verify GamingYoti backend is working
const axios = require('axios');

async function testBackend() {
    console.log('🧪 Testing GamingYoti Backend...\n');
    
    const baseUrl = 'http://localhost:8080';
    
    try {
        // Test 1: Health check
        console.log('1️⃣ Testing health endpoint...');
        const healthResponse = await axios.get(`${baseUrl}/health`);
        console.log('✅ Health check passed:', healthResponse.data);
        
        // Test 2: Root endpoint
        console.log('\n2️⃣ Testing root endpoint...');
        const rootResponse = await axios.get(`${baseUrl}/`);
        console.log('✅ Root endpoint:', rootResponse.data);
        
        // Test 3: Create session
        console.log('\n3️⃣ Testing create session...');
        const sessionData = {
            username: 'testgamer',
            email: 'test@example.com',
            password: 'testpassword123'
        };
        
        const sessionResponse = await axios.post(`${baseUrl}/api/yoti/create-session`, sessionData);
        console.log('✅ Session created:', sessionResponse.data);
        
        const sessionId = sessionResponse.data.sessionId;
        
        // Test 4: Get session status
        console.log('\n4️⃣ Testing session status...');
        const statusResponse = await axios.get(`${baseUrl}/api/yoti/session-status?sessionId=${sessionId}`);
        console.log('✅ Session status:', statusResponse.data);
        
        console.log('\n🎉 All backend tests passed! The API is working correctly.');
        console.log('\n📱 Frontend should be accessible at: http://localhost:3000');
        
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.log('❌ Backend is not running yet. Please wait for it to start...');
            console.log('💡 Make sure to run: cd gamingapiyoti\\gamingapiyoti && gradlew bootRun');
        } else {
            console.error('❌ Test failed:', error.response?.data || error.message);
            console.error('Status:', error.response?.status);
        }
    }
}

// Run the test
testBackend();
