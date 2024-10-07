package com.intellexi.race_app_cs.service;

import com.intellexi.race_app_cs.dto.RaceEvent;
import com.intellexi.race_app_cs.enums.EventType;
import com.intellexi.race_app_cs.model.Race;
import com.intellexi.race_app_cs.producer.RabbitMqProducer;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class RaceService {

    private final RabbitMqProducer rabbitMqProducer;

    public void sendCreateRaceEvent(Race race) {
        RaceEvent raceEvent = new RaceEvent(EventType.CREATE, race);
        rabbitMqProducer.publishRaceEvent(raceEvent);
    }

    public void sendUpdateRaceEvent(UUID id, Race raceDetails) {
        raceDetails.setId(id);
        RaceEvent raceEvent = new RaceEvent(EventType.UPDATE, raceDetails);
        rabbitMqProducer.publishRaceEvent(raceEvent);
    }

    public void sendDeleteRaceEvent(UUID id) {
        Race race = new Race();
        race.setId(id);
        RaceEvent raceEvent = new RaceEvent(EventType.DELETE, race);
        rabbitMqProducer.publishRaceEvent(raceEvent);
    }
}