package com.intellexi.race_app_cs.service;

import com.intellexi.race_app_cs.dto.ApplicationEvent;
import com.intellexi.race_app_cs.enums.EventType;
import com.intellexi.race_app_cs.model.Application;
import com.intellexi.race_app_cs.producer.RabbitMqProducer;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class ApplicationService {

    private final RabbitMqProducer rabbitMqProducer;

    public void sendCreateApplicationEvent(Application application) {
        ApplicationEvent applicationEvent = new ApplicationEvent(EventType.CREATE, application);
        rabbitMqProducer.publishApplicationEvent(applicationEvent);
    }

    public void sendDeleteApplicationEvent(UUID id) {
        Application application = new Application();
        application.setId(id);
        ApplicationEvent applicationEvent = new ApplicationEvent(EventType.DELETE, application);
        rabbitMqProducer.publishApplicationEvent(applicationEvent);
    }
}