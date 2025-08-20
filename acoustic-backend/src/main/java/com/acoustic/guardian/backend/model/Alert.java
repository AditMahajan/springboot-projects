package com.acoustic.guardian.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String anomalyType;
    private LocalDateTime timestamp;
    private String audioUrl;

    @PrePersist
    protected void onCreate() {
        this.timestamp = (this.timestamp == null) ? LocalDateTime.now() : this.timestamp;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAnomalyType() { return anomalyType; }
    public void setAnomalyType(String anomalyType) { this.anomalyType = anomalyType; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public String getAudioUrl() { return audioUrl; }
    public void setAudioUrl(String audioUrl) { this.audioUrl = audioUrl; }
}