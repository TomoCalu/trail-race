package com.intellexi.race_app_cs.model;

import com.intellexi.race_app_cs.converter.RaceDistanceConverter;
import com.intellexi.race_app_cs.enums.RaceDistance;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "races")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Race implements Serializable {

    @Id
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Convert(converter = RaceDistanceConverter.class)
    @Column(nullable = false, length = 20)
    private RaceDistance distance;
}