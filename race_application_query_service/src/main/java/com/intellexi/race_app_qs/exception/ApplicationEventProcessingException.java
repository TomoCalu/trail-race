package com.intellexi.race_app_qs.exception;

public class ApplicationEventProcessingException extends EventProcessingException {
    public ApplicationEventProcessingException(String message) {
        super(message);
    }

    public ApplicationEventProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}
