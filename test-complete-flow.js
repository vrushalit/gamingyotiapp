const axios = require('axios');

async function testCompleteFlow() {
    console.log('🧪 Testing Complete GamingYoti Flow...\n');
    
    try {
        // Test 1: Health Check
        console.log('1️⃣ Testing Backend Health...');
        const healthResponse = await axios.get('http://localhost:8080/health');
        console.log('✅ Backend is healthy:', healthResponse.data);
        
        // Test 2: Create Session
        console.log('\n2️⃣ Testing Session Creation...');
        const sessionResponse = await axios.post('http://localhost:8080/api/yoti/create-session', {
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpass'
        });
        console.log('✅ Session created successfully:', sessionResponse.data);
        
        const { sessionId, sdkId } = sessionResponse.data;
        
        // Test 3: Check Session Status
        console.log('\n3️⃣ Testing Session Status...');
        const statusResponse = await axios.get(`http://localhost:8080/api/yoti/session-status?sessionId=${sessionId}`);
        console.log('✅ Session status retrieved:', statusResponse.data);
        
        // Test 4: Generate Yoti URLs
        console.log('\n4️⃣ Generated Yoti Verification URLs:');
        console.log('🎯 Age Estimation:', `https://age.yoti.com/age-estimation?sessionId=${sessionId}&sdkId=${sdkId}`);
        console.log('🎯 ID Verification:', `https://age.yoti.com/doc-scan?sessionId=${sessionId}&sdkId=${sdkId}`);
        console.log('🎯 Digital ID:', `https://age.yoti.com/yoti?sessionId=${sessionId}&sdkId=${sdkId}`);
        
        console.log('\n🎉 All tests passed! GamingYoti is ready to use!');
        console.log('\n📱 Next Steps:');
        console.log('1. Open http://localhost:3000 in your browser');
        console.log('2. Fill the form and click "Start Age Verification"');
        console.log('3. You\'ll be redirected to Yoti\'s verification page');
        console.log('4. Complete verification and you\'ll be redirected back to results');
        
    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('1. Make sure backend is running: cd gamingapiyoti\\gamingapiyoti && .\\gradlew bootRun');
        console.log('2. Make sure frontend is running: cd Frontend\\gaming-yoti-frontend && npm start');
        console.log('3. Check if ports 8080 and 3000 are available');
    }
}

testCompleteFlow();
