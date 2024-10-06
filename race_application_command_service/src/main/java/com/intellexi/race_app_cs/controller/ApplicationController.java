package com.intellexi.race_app_cs.controller;

import com.intellexi.race_app_cs.model.Application;
import com.intellexi.race_app_cs.service.ApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/applications")
@AllArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PreAuthorize("hasRole('APPLICANT')")
    @PostMapping
    public void createApplication(@RequestBody Application application) {
        applicationService.sendCreateApplicationEvent(application);
    }

    @PreAuthorize("hasRole('APPLICANT')")
    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable UUID id) {
        applicationService.sendDeleteApplicationEvent(id);
    }
}