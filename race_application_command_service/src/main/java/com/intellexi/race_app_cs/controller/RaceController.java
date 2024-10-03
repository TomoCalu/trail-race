package com.intellexi.race_app_cs.controller;

import com.intellexi.race_app_cs.model.Race;
import com.intellexi.race_app_cs.service.RaceService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/races")
@AllArgsConstructor
public class RaceController {

    private final RaceService raceService;

    @PreAuthorize("hasRole('ADMINISTRATOR')")
    @PostMapping
    public void createRace(@RequestBody Race race) {
        raceService.sendCreateRaceEvent(race);
    }

    @PreAuthorize("hasRole('ADMINISTRATOR')")
    @PutMapping("/{id}")
    public void updateRace(@PathVariable UUID id, @RequestBody Race raceDetails) {
        raceService.sendUpdateRaceEvent(id, raceDetails);
    }

    @PreAuthorize("hasRole('ADMINISTRATOR')")
    @DeleteMapping("/{id}")
    public void deleteRace(@PathVariable UUID id) {
        raceService.sendDeleteRaceEvent(id);
    }
}
