package com.intellexi.race_app_qs.repository;

import com.intellexi.race_app_qs.model.Race;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RaceRepository extends JpaRepository<Race, UUID> {
}
