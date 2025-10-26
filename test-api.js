// Simple test script to verify the GamingYoti API
const axios = require('axios');

const BASE_URL = 'http://localhost:8080';

async function testAPI() {
    console.log('🧪 Testing GamingYoti API...\n');

    try {
        // Test 1: Health check
        console.log('1️⃣ Testing health endpoint...');
        const healthResponse = await axios.get(`${BASE_URL}/health`);
        console.log('✅ Health check passed:', healthResponse.data);

        // Test 2: Create session
        console.log('\n2️⃣ Testing create session...');
        const sessionData = {
            username: 'testgamer',
            email: 'test@example.com',
            password: 'testpassword123'
        };
        
        const sessionResponse = await axios.post(`${BASE_URL}/api/yoti/create-session`, sessionData);
        console.log('✅ Session created:', sessionResponse.data);
        
        const sessionId = sessionResponse.data.sessionId;
        
        // Test 3: Get session status
        console.log('\n3️⃣ Testing session status...');
        const statusResponse = await axios.get(`${BASE_URL}/api/yoti/session-status?sessionId=${sessionId}`);
        console.log('✅ Session status:', statusResponse.data);
        
        console.log('\n🎉 All tests passed! The API is working correctly.');
        
    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        console.error('Status:', error.response?.status);
    }
}

// Run the test
testAPI();
