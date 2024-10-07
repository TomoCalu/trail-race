package com.intellexi.race_app_cs.producer;

import com.intellexi.race_app_cs.dto.ApplicationEvent;
import com.intellexi.race_app_cs.dto.RaceEvent;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RabbitMqProducer {

    private static final Logger logger = LoggerFactory.getLogger(RabbitMqProducer.class);
    private final RabbitTemplate rabbitTemplate;

    @Value("${spring.rabbitmq.exchanges.race}")
    private String raceExchange;

    @Value("${spring.rabbitmq.exchanges.application}")
    private String applicationExchange;

    @Value("${spring.rabbitmq.queues.race}")
    private String raceRoutingKey;

    @Value("${spring.rabbitmq.queues.application}")
    private String applicationRoutingKey;

    public void publishRaceEvent(RaceEvent raceEvent) {
        try {
            rabbitTemplate.convertAndSend(raceExchange, raceRoutingKey, raceEvent);
            logger.info("Successfully sent race event: {}", raceEvent);
        } catch (Exception e) {
            logger.error("Error sending race event: {}", e.getMessage(), e);
            throw e;
        }
    }

    public void publishApplicationEvent(ApplicationEvent applicationEvent) {
        try {
            rabbitTemplate.convertAndSend(applicationExchange, applicationRoutingKey, applicationEvent);
            logger.info("Successfully sent application event: {}", applicationEvent);
        } catch (Exception e) {
            logger.error("Error sending application event {}", e.getMessage(), e);
            throw e;
        }
    }
}