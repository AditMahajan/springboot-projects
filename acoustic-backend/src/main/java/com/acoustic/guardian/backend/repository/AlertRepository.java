package com.acoustic.guardian.backend.repository;

import com.acoustic.guardian.backend.model.Alert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertRepository extends JpaRepository<Alert, Long> {
}
