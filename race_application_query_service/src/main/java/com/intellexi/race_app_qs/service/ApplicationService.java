package com.intellexi.race_app_qs.service;

import com.intellexi.race_app_qs.exception.ResourceNotFoundException;
import com.intellexi.race_app_qs.model.Application;
import com.intellexi.race_app_qs.repository.ApplicationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public List<Application> getFilteredApplications(UUID raceId, String firstName, String lastName) {
        if (raceId != null) {
            return applicationRepository.findByRaceId(raceId);
        } else if (firstName != null && lastName != null) {
            return applicationRepository.findByFirstNameAndLastName(firstName, lastName);
        } else {
            return applicationRepository.findAll();
        }
    }

    public Application getApplicationById(UUID id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + id));
    }

    public void createApplication(Application application) {
        application.setId(UUID.randomUUID());

        applicationRepository.save(application);
    }

    public void deleteApplication(UUID id) {
        applicationRepository.deleteById(id);
    }
}
