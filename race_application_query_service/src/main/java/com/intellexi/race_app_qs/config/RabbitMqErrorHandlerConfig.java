package com.intellexi.race_app_qs.config;

import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import com.intellexi.race_app_qs.exception.EventProcessingException;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.api.RabbitListenerErrorHandler;
import org.springframework.amqp.rabbit.retry.RejectAndDontRequeueRecoverer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.retry.interceptor.RetryInterceptorBuilder;

@Configuration
public class RabbitMqErrorHandlerConfig {

    private static final Logger logger = LoggerFactory.getLogger(RabbitMqErrorHandlerConfig.class);

    @Bean
    public RabbitListenerErrorHandler customRabbitListenerErrorHandler() {
        return (amqpMessage, message, exception) -> {
            Throwable cause = exception.getCause();
            logger.error("Listener execution failed: {}", exception.getMessage(), exception);
            if (cause instanceof EventProcessingException) {
                logger.error("Custom event processing exception occurred: {}", cause.getMessage());
            }
            throw exception;
        };
    }
}