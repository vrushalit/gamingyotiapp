package com.gamingapiyoti.gamingapiyoti;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class YotiService {

    private final YotiConfig yotiConfig;
    private final RestTemplate restTemplate;
    private String SESSION_DETAILS_URL;

    public YotiService(YotiConfig yotiConfig) {
        this.yotiConfig = yotiConfig;
        this.restTemplate = new RestTemplate();
    }

    private final Map<String, String> userSessions = new HashMap<>();
    
    private static final boolean SIMULATE_AGE_ESTIMATION_FAILURE = false;
    private static final boolean USE_MOCK_DATA = false;
    
    private final Map<String, Boolean> idVerificationSessions = new HashMap<>();

public Map<String, String> createSession(String username, String email, String password) throws Exception {
    try {
        
        String apiKey = yotiConfig.getApiKey();
        String sdkId = yotiConfig.getSdkId();
        
        System.out.println("Creating session for user: " + username);
        System.out.println("API Key: " + apiKey);
        System.out.println("SDK ID: " + sdkId);
        
        if (apiKey == null || apiKey.isEmpty()) {
            throw new Exception("Yoti API Key is not configured");
        }
        if (sdkId == null || sdkId.isEmpty()) {
            throw new Exception("Yoti SDK ID is not configured");
        }

        String url = "https://age.yoti.com/api/v1/sessions";

    Map<String, Object> body = new HashMap<>();
    body.put("type", "OVER");
    body.put("ttl", 900);
    body.put("reference_id", "gaming_yoti_" + username);
    body.put("synchronous_checks", true);
    body.put("resume_enabled", true);
    body.put("retry_enabled",true);

    Map<String, Object> ageEstimation = new HashMap<>();
    ageEstimation.put("allowed", true);
    ageEstimation.put("threshold", 18);
    ageEstimation.put("level", "PASSIVE");
    body.put("age_estimation", ageEstimation);

    Map<String, Object> digitalId = new HashMap<>();
    digitalId.put("allowed", true);
    digitalId.put("threshold", 30);
    digitalId.put("level", "NONE");
    body.put("digital_id", digitalId);

    Map<String, Object> docScan = new HashMap<>();
    docScan.put("allowed", true);
    docScan.put("threshold", 30);
    docScan.put("authenticity", "AUTO");
    docScan.put("level", "PASSIVE");
    body.put("doc_scan", docScan);

    Map<String, Object> creditCard = new HashMap<>();
    creditCard.put("allowed", false);
    creditCard.put("level", "NONE");
    creditCard.put("retry_limit", 1);
    body.put("credit_card", creditCard);

    Map<String, Object> mobile = new HashMap<>();
    mobile.put("allowed", false);
    mobile.put("level", "NONE");
    mobile.put("retry_limit", 1);
    body.put("mobile", mobile);

    Map<String,Object> callback = new HashMap<>();
    callback.put("auto",true);
    callback.put("callback","https://age.yoti.com/");
    body.put("callback", callback);
    
    body.put("cancel_url", "https://www.yoti.com/");

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.setBearerAuth(apiKey);
    headers.set("Yoti-SDK-Id", sdkId);

    HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

    System.out.println("Calling Yoti API to create session...");
    System.out.println("Request body: " + body);
    
    ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
    
    System.out.println("Yoti API response status: " + response.getStatusCode());
    System.out.println("Yoti API response body: " + response.getBody());

    // Extract sessionId from response
    String sessionId = response.getBody().get("id").toString();
    
    if (sessionId == null || sessionId.isEmpty()) {
        throw new Exception("No session ID returned from Yoti API");
    }

    // Store user data and session
    String userId = username + "_" + System.currentTimeMillis();
    userSessions.put(userId, sessionId);

    Map<String, String> result = new HashMap<>();
    result.put("sessionId", sessionId);
    result.put("sdkId", sdkId);
    result.put("userId", userId);

    System.out.println("Created session for user: " + username + ", sessionId: " + sessionId);
    
    // Wait for session to be fully created and ready on Yoti's side
    System.out.println("Waiting for session to be ready on Yoti's side...");
    Thread.sleep(3000); 
    
    return result;
    
    } catch (Exception e) {
        System.err.println("Error creating Yoti session: " + e.getMessage());
        e.printStackTrace();
        
        if (e.getMessage().contains("401") || e.getMessage().contains("Unauthorized")) {
            throw new Exception("Yoti API authentication failed. Please check your API key and SDK ID.", e);
        } else if (e.getMessage().contains("403") || e.getMessage().contains("Forbidden")) {
            throw new Exception("Yoti API access forbidden. Please check your API key permissions.", e);
        } else if (e.getMessage().contains("404") || e.getMessage().contains("Not Found")) {
            throw new Exception("Yoti API endpoint not found. Please check the API URL.", e);
        } else {
            throw new Exception("Failed to create Yoti session: " + e.getMessage(), e);
        }
    }
}


    public Map<String, Object> callYotiAgeEstimation(String sessionId, String base64Image, String biometricConsent, String secureToken) throws Exception {
        // This method is not used in the current flow
        // Age estimation is handled directly by Yoti's web interface
        throw new Exception("Age estimation is handled by Yoti's web interface");
    }

public Map<String, Object> getYotiSessionResult(String sessionId) throws Exception {
    try {
        
        System.out.println("Getting real session result for session: " + sessionId);

        // Call real Yoti API to get session result
        String apiKey = yotiConfig.getApiKey();
        String sdkId = yotiConfig.getSdkId();
        String url = "https://age.yoti.com/api/v1/sessions/" + sessionId + "/result";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        headers.set("Yoti-SDK-Id", sdkId);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, request, Map.class);
            Map<String, Object> yotiResult = response.getBody();
            
            System.out.println("Real Yoti API Response: " + yotiResult);
            
            // Process the result based on method and status
            return processYotiResult(yotiResult, sessionId);
            
        } catch (Exception e) {
            System.out.println("Error calling Yoti API: " + e.getMessage());
            
            // Return error result
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("id", sessionId);
            errorResult.put("status", "ERROR");
            errorResult.put("method", "UNKNOWN");
            errorResult.put("error", "Failed to retrieve session result: " + e.getMessage());
            errorResult.put("created_at", java.time.Instant.now().toString());
            errorResult.put("updated_at", java.time.Instant.now().toString());
            
            return errorResult;
        }
        
    } catch (Exception e) {
        Map<String, Object> error = new HashMap<>();
        error.put("status", "ERROR");
        error.put("context", e.getMessage());
        error.put("error_code", "UNSPECIFIED_ERROR");
        return error;
    }
}

private Map<String, Object> processYotiResult(Map<String, Object> yotiResult, String sessionId) {
    Map<String, Object> processedResult = new HashMap<>();
    
    // Copy all fields from Yoti response
    processedResult.putAll(yotiResult);
    
    // Ensure we have the session ID
    processedResult.put("id", sessionId);
    
    // Add timestamp if not present
    if (!processedResult.containsKey("created_at")) {
        processedResult.put("created_at", java.time.Instant.now().toString());
    }
    if (!processedResult.containsKey("updated_at")) {
        processedResult.put("updated_at", java.time.Instant.now().toString());
    }
    
    // Enhanced status processing based on Yoti documentation
    String status = (String) processedResult.get("status");
    String method = (String) processedResult.get("method");
    Object age = processedResult.get("age");
    
    System.out.println("Session Status: " + status);
    System.out.println("Verification Method: " + method);
    System.out.println("Age Detected: " + age);
    
    // Add enhanced status information
    processedResult.put("verification_successful", "COMPLETE".equals(status));
    processedResult.put("verification_method_used", method);
    processedResult.put("age_verified", age);
    
    // Add user-friendly messages based on status
    if ("COMPLETE".equals(status)) {
        processedResult.put("message", "Age verification completed successfully!");
        processedResult.put("success", true);
    } else if ("FAIL".equals(status)) {
        processedResult.put("message", "Age verification failed - user did not meet age threshold");
        processedResult.put("success", false);
    } else if ("ERROR".equals(status)) {
        processedResult.put("message", "Age verification error - could not process verification");
        processedResult.put("success", false);
    } else if ("CANCELLED".equals(status)) {
        processedResult.put("message", "Age verification was cancelled by user");
        processedResult.put("success", false);
    } else if ("EXPIRED".equals(status)) {
        processedResult.put("message", "Age verification session has expired");
        processedResult.put("success", false);
    } else if ("PENDING".equals(status)) {
        processedResult.put("message", "Age verification is pending - user has not started verification");
        processedResult.put("success", false);
    } else if ("IN_PROGRESS".equals(status)) {
        processedResult.put("message", "Age verification is in progress - awaiting result");
        processedResult.put("success", false);
    } else {
        processedResult.put("message", "Age verification status: " + status.toLowerCase());
        processedResult.put("success", false);
    }
    
    // Log the processed result
    System.out.println("Processed Yoti Result: " + processedResult);
    
    return processedResult;
}

}
