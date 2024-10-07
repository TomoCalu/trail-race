package com.intellexi.race_app_qs.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    // Injecting values from application.yml or application.properties
    @Value("${spring.rabbitmq.queues.race}")
    private String raceEventsQueueName;

    @Value("${spring.rabbitmq.queues.application}")
    private String applicationEventsQueueName;

    @Value("${spring.rabbitmq.exchanges.race}")
    private String raceEventsExchangeName;

    @Value("${spring.rabbitmq.exchanges.application}")
    private String applicationEventsExchangeName;

    @Value("${spring.rabbitmq.routing-keys.race}")
    private String raceEventsRoutingKey;

    @Value("${spring.rabbitmq.routing-keys.application}")
    private String applicationEventsRoutingKey;

    @Bean
    public Queue raceEventsQueue() {
        return new Queue(raceEventsQueueName, true);
    }

    @Bean
    public Queue applicationEventsQueue() {
        return new Queue(applicationEventsQueueName, true);
    }

    @Bean
    public TopicExchange raceEventsExchange() {
        return new TopicExchange(raceEventsExchangeName);
    }

    @Bean
    public TopicExchange applicationEventsExchange() {
        return new TopicExchange(applicationEventsExchangeName);
    }

    @Bean
    public Binding raceEventsBinding(Queue raceEventsQueue, TopicExchange raceEventsExchange) {
        return BindingBuilder.bind(raceEventsQueue).to(raceEventsExchange).with(raceEventsRoutingKey);
    }

    @Bean
    public Binding applicationEventsBinding(Queue applicationEventsQueue, TopicExchange applicationEventsExchange) {
        return BindingBuilder.bind(applicationEventsQueue).to(applicationEventsExchange).with(applicationEventsRoutingKey);
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