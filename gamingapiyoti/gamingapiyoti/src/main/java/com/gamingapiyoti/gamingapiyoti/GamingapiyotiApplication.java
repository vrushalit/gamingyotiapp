package com.gamingapiyoti.gamingapiyoti;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class GamingapiyotiApplication {

	public static void main(String[] args) {
		SpringApplication.run(GamingapiyotiApplication.class, args);
	}
}

@RestController
class TestController {

	@Autowired
	private YotiConfig yotiConfig;

	@GetMapping("/test-keys")
	public String testKeys() {
		try {
			String apiKey = yotiConfig.getApiKey();
			String sdkId = yotiConfig.getSdkId();
			return "Successfully read keys!\nAPI Key: " + apiKey + "\nSDK ID: " + sdkId;
		} catch (Exception e) {
			return "❌ Error reading keys: " + e.getMessage();
		}
	}
}
