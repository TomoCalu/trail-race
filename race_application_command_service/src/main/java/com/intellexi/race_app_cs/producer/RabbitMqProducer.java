package com.intellexi.race_app_cs.producer;

import com.intellexi.race_app_cs.dto.ApplicationEvent;
import com.intellexi.race_app_cs.dto.RaceEvent;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class RabbitMqProducer {

    private final RabbitTemplate rabbitTemplate;

    public void publishRaceEvent(RaceEvent raceEvent) {
        rabbitTemplate.convertAndSend("race.events.exchange", "race.events", raceEvent);
    }

    public void publishApplicationEvent(ApplicationEvent applicationEvent) {
        rabbitTemplate.convertAndSend("application.events", applicationEvent);
    }
}