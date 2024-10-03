package com.intellexi.race_app_qs.dto;

import com.intellexi.race_app_qs.enums.EventType;
import com.intellexi.race_app_qs.model.Application;
import lombok.Data;

@Data
public class ApplicationEvent {
    private EventType eventType;
    private Application application;
}
