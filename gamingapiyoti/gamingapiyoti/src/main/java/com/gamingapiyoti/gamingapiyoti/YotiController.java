package com.gamingapiyoti.gamingapiyoti;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/yoti")
@CrossOrigin(origins = "http://localhost:3000")

public class YotiController {

    @GetMapping("/")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "GamingYoti Backend is running");
        response.put("timestamp", java.time.Instant.now().toString());
        return ResponseEntity.ok(response);
    }

    private final YotiService yotiService;

    public YotiController(YotiService yotiService) {
        this.yotiService = yotiService;
    }



@PostMapping("/create-session")
public ResponseEntity<Map<String, Object>> createSession(@RequestBody Map<String, String> userData) {
    try {
        String username = userData.get("username");
        String email = userData.get("email");
        String password = userData.get("password");

        if (username == null || email == null || password == null) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Missing required fields: username, email, password");
            return ResponseEntity.badRequest().body(error);
        }

        // 1. Create Yoti session
        Map<String, String> sessionData = yotiService.createSession(username, email, password);
        Map<String, Object> response = new HashMap<>(sessionData);
        return ResponseEntity.ok(response);
        
    } catch (Exception e) {
        Map<String, Object> error = new HashMap<>();
        error.put("error", "Failed to create session: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}

@PostMapping("/age-estimation")
public ResponseEntity<Map<String, Object>> ageEstimation(@RequestBody Map<String, Object> request) {
    try {
        String sessionId = (String) request.get("sessionId");
        String base64Image = (String) request.get("image");
        String biometricConsent = (String) request.get("biometric_consent");
        String secureToken = (String) request.get("secure_token");
        
        // Call Yoti Age Estimation API from your backend
        Map<String, Object> result = yotiService.callYotiAgeEstimation(
            sessionId, 
            base64Image, 
            biometricConsent, 
            secureToken
        );
        
        return ResponseEntity.ok(result);
        
    } catch (Exception e) {
        Map<String, Object> error = new HashMap<>();
        error.put("status", "ERROR");
        error.put("context", e.getMessage());
        error.put("error_code", "UNSPECIFIED_ERROR");
        return ResponseEntity.ok(error);
    }
}

@GetMapping("/session-result")
public ResponseEntity<Map<String, Object>> getSessionResult(@RequestParam String sessionId) {
    try {
        if (sessionId == null || sessionId.trim().isEmpty()) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Session ID is required");
            return ResponseEntity.badRequest().body(error);
        }
        
        System.out.println("Getting session result for: " + sessionId);
        Map<String, Object> result = yotiService.getYotiSessionResult(sessionId);
        
        // Check if verification is complete
        String status = (String) result.get("status");
        if ("COMPLETE".equals(status) || "FAIL".equals(status) || "ERROR".equals(status)) {
            System.out.println("Verification completed with status: " + status);
        } else {
            System.out.println("Verification still in progress: " + status);
        }
        
        return ResponseEntity.ok(result);
        
    } catch (Exception e) {
        Map<String, Object> error = new HashMap<>();
        error.put("status", "ERROR");
        error.put("error", "Failed to get session result: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}

@PostMapping("/webhook")
public ResponseEntity<String> handleWebhook(@RequestBody Map<String, Object> webhookData) {
    try {
        System.out.println("Received webhook: " + webhookData);
        // Process webhook data if needed
        return ResponseEntity.ok("Webhook received");
    } catch (Exception e) {
        System.out.println("Error processing webhook: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing webhook");
    }
}

}
