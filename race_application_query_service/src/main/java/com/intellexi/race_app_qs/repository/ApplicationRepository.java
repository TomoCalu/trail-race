package com.intellexi.race_app_qs.repository;

import com.intellexi.race_app_qs.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ApplicationRepository extends JpaRepository<Application, UUID> {
    List<Application> findByRaceId(UUID raceId);

    List<Application> findByFirstNameAndLastName(String firstName, String lastName);
}
