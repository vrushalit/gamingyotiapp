package com.gamingapiyoti.gamingapiyoti;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Component
public class YotiConfig {

    public String getApiKey() throws Exception {
        return Files.readString(new ClassPathResource("secrets/avs-api-key.txt").getFile().toPath(), StandardCharsets.UTF_8).trim();
    }

    public String getSdkId() throws Exception {
        return Files.readString(new ClassPathResource("secrets/avs-sdk-id.txt").getFile().toPath(), StandardCharsets.UTF_8).trim();
    }
}
