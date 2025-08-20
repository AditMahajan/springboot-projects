package com.acoustic.guardian.backend.controller;

import com.acoustic.guardian.backend.model.Alert;
import com.acoustic.guardian.backend.repository.AlertRepository;
import com.acoustic.guardian.backend.dto.LiveAlertDTO;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.Base64;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "http://localhost:3000")
public class AlertController {

    @Autowired
    private AlertRepository alertRepository;

    // POST for local simulated alerts (already working)
    @PostMapping
    public Alert receiveAlert(@RequestBody Alert alert) {
         System.out.println("[SIMULATE] Received simulated alert: " + alert.getAnomalyType());
        return alertRepository.save(alert);
    }

    // GET all alerts
    @GetMapping
    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    // DELETE alert
    @DeleteMapping("/{id}")
    public void deleteAlert(@PathVariable Long id) {
        alertRepository.deleteById(id);
    }

    // POST for live alerts from edge device
    @PostMapping("/live")
    //@PostMapping({"/live", ""}) dont use this one anymore
    public ResponseEntity<?> receiveLiveAlert(@RequestBody LiveAlertDTO dto) {
        System.out.println("\n========== [LIVE ALERT RECEIVED] ==========");
        System.out.println("Full DTO: " + dto);
        System.out.println("Anomaly Type: " + dto.getAnomalyType());
        System.out.println("Timestamp (raw): " + dto.getTimestamp());
        System.out.println("Base64 Audio Length: " + (dto.getAudio_b64() != null ? dto.getAudio_b64().length() : "null"));

        Alert alert = new Alert();
        alert.setAnomalyType(dto.getAnomalyType());

        // Parse timestamp
        try {
            if (dto.getTimestamp() != null) {
                alert.setTimestamp(LocalDateTime.parse(dto.getTimestamp()));
            }
        } catch (Exception e) {
            System.out.println("[!] Failed to parse timestamp.");
            return ResponseEntity.badRequest().body("Invalid timestamp format.");
        }

        // If audio_b64 is missing or empty, skip audio saving
        if (dto.getAudio_b64() == null || dto.getAudio_b64().isEmpty()) {
            System.out.println("[!] No base64 audio received.");
            Alert savedWithoutAudio = alertRepository.save(alert);
            return ResponseEntity.ok(savedWithoutAudio);
        }

        try {
            // Decode base64 to byte array
            byte[] audioBytes = Base64.getDecoder().decode(dto.getAudio_b64());

            // Prepare file path
            //String filename = "alert_" + UUID.randomUUID() + ".mp3";
            String filename = "alert_" + UUID.randomUUID() + ".wav";
            String folder = "src/main/resources/static/audio/";
            String filePath = folder + filename;

            // Ensure folder exists
            Files.createDirectories(Paths.get(folder));

            // Write to file
            try (FileOutputStream fos = new FileOutputStream(filePath)) {
                fos.write(audioBytes);
            }

            // Set audio URL relative to static
            alert.setAudioUrl("/audio/" + filename);
            System.out.println("[✓] Audio file saved: /audio/" + filename);

        } catch (IllegalArgumentException e) {
            System.out.println("[X] Base64 decoding failed.");
            return ResponseEntity.badRequest().body("Invalid base64 audio string.");
        } catch (IOException e) {
            System.out.println("[X] Failed to save audio file: " + e.getMessage());
            return ResponseEntity.internalServerError().body("Failed to save audio file.");
        }

        // Save alert with audio
        Alert savedAlert = alertRepository.save(alert);
        System.out.println("[✓] Alert saved to database with ID: " + savedAlert.getId());
        System.out.println("============================================\n");

        return ResponseEntity.ok(savedAlert);
    }


    // Optional: List audio files in directory
    @GetMapping("/list-audio")
    public ResponseEntity<List<String>> listAudio() {
        File audioDir = new File("src/main/resources/static/audio");

        if (!audioDir.exists() || !audioDir.isDirectory()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(List.of("Audio directory not found"));
        }

        //String[] filenames = audioDir.list((dir, name) -> name.toLowerCase().endsWith(".mp3"));
        String[] filenames = audioDir.list((dir, name) -> name.toLowerCase().endsWith(".wav"));
        if (filenames == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(List.of("Error reading files"));
        }

        List<String> audioUrls = Arrays.stream(filenames)
            .map(name -> "/audio/" + name)
            .collect(Collectors.toList());

        return ResponseEntity.ok(audioUrls);
    }	
}
