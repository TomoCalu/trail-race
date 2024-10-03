package com.intellexi.race_app_qs.repository;

import com.intellexi.race_app_qs.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ApplicationRepository extends JpaRepository<Application, UUID> {
}
