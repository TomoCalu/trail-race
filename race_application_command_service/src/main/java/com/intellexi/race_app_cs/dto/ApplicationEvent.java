package com.intellexi.race_app_cs.dto;

import com.intellexi.race_app_cs.enums.EventType;
import com.intellexi.race_app_cs.model.Application;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApplicationEvent {
    private EventType eventType;
    private Application application;
}
