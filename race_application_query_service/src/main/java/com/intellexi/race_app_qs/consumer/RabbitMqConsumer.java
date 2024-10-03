package com.intellexi.race_app_qs.consumer;

import com.intellexi.race_app_qs.dto.ApplicationEvent;
import com.intellexi.race_app_qs.dto.RaceEvent;
import com.intellexi.race_app_qs.service.ApplicationService;
import com.intellexi.race_app_qs.service.RaceService;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class RabbitMqConsumer {
    private final RaceService raceService;
    private final ApplicationService applicationService;

    @RabbitListener(queues = "race.events")
    public void handleRaceEvent(RaceEvent raceEvent) {
        switch (raceEvent.getEventType()) {
            case CREATE:
                raceService.createRace(raceEvent.getRace());
                break;
            case UPDATE:
                raceService.updateRace(raceEvent.getRace().getId(), raceEvent.getRace());
                break;
            case DELETE:
                raceService.deleteRace(raceEvent.getRace().getId());
                break;
            default:
                break;
        }
    }

    @RabbitListener(queues = "application.events")
    public void handleApplicationEvent(ApplicationEvent applicationEvent) {
        switch (applicationEvent.getEventType()) {
            case CREATE:
                applicationService.createApplication(applicationEvent.getApplication());
                break;
            case DELETE:
                applicationService.deleteApplication(applicationEvent.getApplication().getId());
                break;
            default:
                break;
        }
    }
}
