// Test script to verify Yoti API credentials
const axios = require('axios');

async function testYotiCredentials() {
    console.log('🧪 Testing Yoti API Credentials...\n');
    
    try {
        // Test the create session endpoint
        const response = await axios.post('http://localhost:8080/api/yoti/create-session', {
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpass'
        });
        
        console.log('✅ Session created successfully:');
        console.log('Session ID:', response.data.sessionId);
        console.log('SDK ID:', response.data.sdkId);
        console.log('User ID:', response.data.userId);
        
        // Check if it's real Yoti data or mock data
        if (response.data.sessionId.startsWith('mock-')) {
            console.log('❌ WARNING: Still returning mock data!');
            console.log('This means the Yoti API call is failing and falling back to mock data.');
        } else {
            console.log('✅ Real Yoti session created!');
        }
        
    } catch (error) {
        console.error('❌ Error creating session:');
        console.error('Status:', error.response?.status);
        console.error('Error:', error.response?.data || error.message);
        
        if (error.response?.status === 500) {
            console.log('\n💡 This is likely a Yoti API authentication error.');
            console.log('Please check your Yoti API credentials in:');
            console.log('- gamingapiyoti/gamingapiyoti/src/main/resources/secrets/avs-api-key.txt');
            console.log('- gamingapiyoti/gamingapiyoti/src/main/resources/secrets/avs-sdk-id.txt');
        }
    }
}

testYotiCredentials();
