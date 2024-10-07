package com.intellexi.race_app_cs.config;

import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    @Value("${spring.rabbitmq.exchanges.race}")
    private String raceEventsExchangeName;

    @Value("${spring.rabbitmq.exchanges.application}")
    private String applicationEventsExchangeName;

    @Bean
    public TopicExchange raceEventsExchange() {
        return new TopicExchange(raceEventsExchangeName);
    }

    @Bean
    public TopicExchange applicationEventsExchange() {
        return new TopicExchange(applicationEventsExchangeName);
    }

    @Bean
    public Jackson2JsonMessageConverter jackson2JsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(final ConnectionFactory connectionFactory) {
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jackson2JsonMessageConverter());
        return rabbitTemplate;
    }
}