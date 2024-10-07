package com.intellexi.race_app_qs.model;

import com.intellexi.race_app_qs.converter.RaceDistanceConverter;
import com.intellexi.race_app_qs.enums.RaceDistance;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(name = "races")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Race {

    @Id
    @UuidGenerator
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Convert(converter = RaceDistanceConverter.class)
    @Column(nullable = false, length = 20)
    private RaceDistance distance;
}