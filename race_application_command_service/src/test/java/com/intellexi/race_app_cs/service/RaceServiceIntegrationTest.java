package com.intellexi.race_app_cs.service;

import com.intellexi.race_app_cs.dto.RaceEvent;
import com.intellexi.race_app_cs.enums.EventType;
import com.intellexi.race_app_cs.enums.RaceDistance;
import com.intellexi.race_app_cs.model.Race;
import com.intellexi.race_app_cs.producer.RabbitMqProducer;
import com.intellexi.race_app_cs.security.JwtAuthorizationFilter;
import com.intellexi.race_app_cs.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;

@SpringBootTest(properties = "spring.profiles.active=test")
public class RaceServiceIntegrationTest {

    @Autowired
    private RaceService raceService;

    @MockBean
    private RabbitMqProducer rabbitMqProducer;


    @MockBean
    private JwtAuthorizationFilter jwtAuthorizationFilter;

    @MockBean
    private JwtUtil jwtUtil;

    @Test
    public void testSendCreateRaceEvent() {
        Race race = new Race(UUID.randomUUID(), "New Race", RaceDistance.FIVE_K); // Assuming the Race class has these attributes
        ArgumentCaptor<RaceEvent> raceEventCaptor = ArgumentCaptor.forClass(RaceEvent.class);

        raceService.sendCreateRaceEvent(race);

        verify(rabbitMqProducer).publishRaceEvent(raceEventCaptor.capture());
        RaceEvent capturedEvent = raceEventCaptor.getValue();

        assertThat(capturedEvent.getEventType()).isEqualTo(EventType.CREATE);
        assertThat(capturedEvent.getRace().getName()).isEqualTo("New Race");
        assertThat(capturedEvent.getRace().getDistance()).isEqualTo(RaceDistance.FIVE_K);
    }

    @Test
    public void testSendUpdateRaceEvent() {
        UUID raceId = UUID.randomUUID();
        Race race = new Race(raceId, "Updated Race", RaceDistance.TEN_K); // Assuming a distance of 10 kilometers
        ArgumentCaptor<RaceEvent> raceEventCaptor = ArgumentCaptor.forClass(RaceEvent.class);

        raceService.sendUpdateRaceEvent(raceId, race);

        verify(rabbitMqProducer).publishRaceEvent(raceEventCaptor.capture());
        RaceEvent capturedEvent = raceEventCaptor.getValue();

        assertThat(capturedEvent.getEventType()).isEqualTo(EventType.UPDATE);
        assertThat(capturedEvent.getRace().getId()).isEqualTo(raceId);
        assertThat(capturedEvent.getRace().getName()).isEqualTo("Updated Race");
        assertThat(capturedEvent.getRace().getDistance()).isEqualTo(RaceDistance.TEN_K);
    }

    @Test
    public void testSendDeleteRaceEvent() {
        UUID raceId = UUID.randomUUID();
        ArgumentCaptor<RaceEvent> raceEventCaptor = ArgumentCaptor.forClass(RaceEvent.class);

        raceService.sendDeleteRaceEvent(raceId);

        verify(rabbitMqProducer).publishRaceEvent(raceEventCaptor.capture());
        RaceEvent capturedEvent = raceEventCaptor.getValue();

        assertThat(capturedEvent.getEventType()).isEqualTo(EventType.DELETE);
        assertThat(capturedEvent.getRace().getId()).isEqualTo(raceId);
    }
}