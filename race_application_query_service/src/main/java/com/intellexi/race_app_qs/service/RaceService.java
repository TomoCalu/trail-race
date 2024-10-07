package com.intellexi.race_app_qs.service;

import com.intellexi.race_app_qs.exception.ResourceNotFoundException;
import com.intellexi.race_app_qs.model.Race;
import com.intellexi.race_app_qs.repository.RaceRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class RaceService {

    private final RaceRepository raceRepository;

    public List<Race> getAllRaces() {
        return raceRepository.findAll();
    }

    public Race getRaceById(UUID id) {
        return raceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Race not found with ID: " + id));
    }

    public void createRace(Race race) {
        raceRepository.save(race);
    }

    public void updateRace(UUID id, Race raceDetails) {
        Race existingRace = raceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Race not found with ID: " + id));

        existingRace.setName(raceDetails.getName());
        existingRace.setDistance(raceDetails.getDistance());

        raceRepository.save(existingRace);
    }


    public void deleteRace(UUID id) {
        if (!raceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Race not found with ID: " + id);
        }
        raceRepository.deleteById(id);
    }
}