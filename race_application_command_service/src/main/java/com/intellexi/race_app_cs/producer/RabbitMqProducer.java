package com.intellexi.race_app_cs.producer;

import com.intellexi.race_app_cs.dto.ApplicationEvent;
import com.intellexi.race_app_cs.dto.RaceEvent;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class RabbitMqProducer {

    private static final Logger logger = LoggerFactory.getLogger(RabbitMqProducer.class);
    private final RabbitTemplate rabbitTemplate;

    public void publishRaceEvent(RaceEvent raceEvent) {
        try {
            rabbitTemplate.convertAndSend("race.events.exchange", "race.events", raceEvent);
            logger.info("Successfully sent race event: {}", raceEvent);
        } catch (Exception e) {
            logger.error("Error sending race event: {}", e.getMessage(), e);
            throw e;
        }
    }

    public void publishApplicationEvent(ApplicationEvent applicationEvent) {
        try {
            rabbitTemplate.convertAndSend("application.events.exchange", "application.events", applicationEvent);
            logger.info("Successfully sent application event: {}", applicationEvent);
        } catch (Exception e) {
            logger.error("Error sending application event {}", e.getMessage(), e);
            throw e;
        }
    }
}