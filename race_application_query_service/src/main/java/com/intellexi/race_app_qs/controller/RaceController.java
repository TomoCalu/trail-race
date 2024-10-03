package com.intellexi.race_app_qs.controller;

import com.intellexi.race_app_qs.model.Race;
import com.intellexi.race_app_qs.service.RaceService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/races")
@AllArgsConstructor
public class RaceController {

    private final RaceService raceService;

    @GetMapping
    public List<Race> getAllRaces() {
        return raceService.getAllRaces();
    }

    @GetMapping("/{id}")
    public Race getRaceById(@PathVariable UUID id) {
        return raceService.getRaceById(id);
    }
}
