package com.intellexi.race_app_qs.exception;

public class RaceEventProcessingException extends EventProcessingException {
    public RaceEventProcessingException(String message) {
        super(message);
    }

    public RaceEventProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}
