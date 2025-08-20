package com.acoustic.guardian.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LiveAlertDTO {
    private String anomalyType;
    private String timestamp;
    private String audioUrl;

    @JsonProperty("audio_b64") // Match the actual field in the sender's JSON
    private String audio_b64;

    // Getters and Setters
    public String getAnomalyType() { return anomalyType; }
    public void setAnomalyType(String anomalyType) { this.anomalyType = anomalyType; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public String getAudioUrl() { return audioUrl; }
    public void setAudioUrl(String audioUrl) { this.audioUrl = audioUrl; }

    //public String getAudioBase64() { return audio_b64; }
    //public void setAudioBase64(String audioBase64) { this.audio_b64 = audioBase64; }
    public String getAudio_b64() {
        return audio_b64;
    }

    public void setAudio_b64(String audio_b64) {
        this.audio_b64 = audio_b64;
    }
}
