package com.intellexi.race_app_cs.dto;

import com.intellexi.race_app_cs.enums.EventType;
import com.intellexi.race_app_cs.model.Race;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RaceEvent implements Serializable {
    private EventType eventType;
    private Race race;
}