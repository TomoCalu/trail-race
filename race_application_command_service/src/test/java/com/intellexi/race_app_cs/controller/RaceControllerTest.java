package com.intellexi.race_app_cs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.intellexi.race_app_cs.model.Race;
import com.intellexi.race_app_cs.service.RaceService;
import com.intellexi.race_app_cs.service.UserDetailsServiceImpl;
import com.intellexi.race_app_cs.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.UUID;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;

@WebMvcTest(RaceController.class)
class RaceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private RaceService raceService;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private UserDetailsServiceImpl userDetailsService;

    @Test
    @WithMockUser(username = "admin", roles = {"ADMINISTRATOR"})
    void createRace() throws Exception {
        Race race = new Race();
        race.setName("Test Race");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/races")
                        .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMINISTRATOR")))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(race)))
                .andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(raceService).sendCreateRaceEvent(Mockito.any(Race.class));
    }

    @Test
    @WithMockUser(username = "admin@test.com", roles = {"ADMINISTRATOR"})
    void updateRace() throws Exception {
        UUID raceId = UUID.randomUUID();
        Race race = new Race();
        race.setName("Updated Race");

        mockMvc.perform(MockMvcRequestBuilders.put("/api/races/" + raceId)
                        .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMINISTRATOR")))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(race)))
                .andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(raceService).sendUpdateRaceEvent(Mockito.any(UUID.class), Mockito.any(Race.class));
    }

    @Test
    @WithMockUser(username = "admin@test.com", roles = {"ADMINISTRATOR"})
    void deleteRace() throws Exception {
        UUID raceId = UUID.randomUUID();

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/races/" + raceId)
                        .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_ADMINISTRATOR"))))
                .andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(raceService).sendDeleteRaceEvent(Mockito.any(UUID.class));
    }

    @Test
    @WithMockUser(username = "user@test.com", roles = {"APPLICANT"})
    void unauthorizedAccess() throws Exception {
        Race race = new Race();
        race.setName("Unauthorized Test Race");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/races")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(race)))
                .andExpect(MockMvcResultMatchers.status().isForbidden());
    }
}