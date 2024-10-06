package com.intellexi.race_app_qs.controller;

import com.intellexi.race_app_qs.model.Application;
import com.intellexi.race_app_qs.service.ApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/applications")
@AllArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping
    public List<Application> getFilteredApplications(
            @RequestParam(required = false) UUID raceId,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName
    ) {
        return applicationService.getFilteredApplications(raceId, firstName, lastName);
    }

    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable UUID id) {
        return applicationService.getApplicationById(id);
    }
}
