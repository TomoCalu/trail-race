package com.intellexi.race_app_cs.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RaceDistance {
    FIVE_K("5k"),
    TEN_K("10k"),
    HALF_MARATHON("HalfMarathon"),
    MARATHON("Marathon");

    private final String displayName;

    public static RaceDistance fromString(String input) {
        for (RaceDistance distance : RaceDistance.values()) {
            if (distance.getDisplayName().equalsIgnoreCase(input)) {
                return distance;
            }
        }
        throw new IllegalArgumentException("Unknown distance: " + input);
    }

    @Override
    public String toString() {
        return this.displayName;
    }
}