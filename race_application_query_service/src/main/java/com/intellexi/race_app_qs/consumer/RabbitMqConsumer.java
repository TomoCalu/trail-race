package com.intellexi.race_app_qs.consumer;

import com.intellexi.race_app_qs.dto.ApplicationEvent;
import com.intellexi.race_app_qs.dto.RaceEvent;
import com.intellexi.race_app_qs.exception.ApplicationEventProcessingException;
import com.intellexi.race_app_qs.exception.RaceEventProcessingException;
import com.intellexi.race_app_qs.service.ApplicationService;
import com.intellexi.race_app_qs.service.RaceService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class RabbitMqConsumer {
    private static final Logger logger = LoggerFactory.getLogger(RabbitMqConsumer.class);

    private final RaceService raceService;
    private final ApplicationService applicationService;

    @RabbitListener(queues = "${spring.rabbitmq.queues.race}", errorHandler = "customRabbitListenerErrorHandler")
    public void handleRaceEvent(RaceEvent raceEvent) {
        try {
            switch (raceEvent.getEventType()) {
                case CREATE -> raceService.createRace(raceEvent.getRace());
                case UPDATE -> raceService.updateRace(raceEvent.getRace().getId(), raceEvent.getRace());
                case DELETE -> raceService.deleteRace(raceEvent.getRace().getId());
                default -> throw new RaceEventProcessingException("Unknown event type: " + raceEvent.getEventType());
            }
        } catch (Exception e) {
            logger.error("Error processing race event: {}", e.getMessage(), e);
            throw new RaceEventProcessingException("Failed to process race event", e);
        }
    }

    @RabbitListener(queues = "${spring.rabbitmq.queues.application}", errorHandler = "customRabbitListenerErrorHandler")
    public void handleApplicationEvent(ApplicationEvent applicationEvent) {
        try {
            switch (applicationEvent.getEventType()) {
                case CREATE -> applicationService.createApplication(applicationEvent.getApplication());
                case DELETE -> applicationService.deleteApplication(applicationEvent.getApplication().getId());
                default ->
                        throw new ApplicationEventProcessingException("Unknown event type: " + applicationEvent.getEventType());
            }
        } catch (Exception e) {
            logger.error("Error processing application event: {}", e.getMessage(), e);
            throw new ApplicationEventProcessingException("Failed to process application event", e);
        }
    }
}