package com.intellexi.race_app_qs.converter;

import com.intellexi.race_app_qs.enums.RaceDistance;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class RaceDistanceConverter implements AttributeConverter<RaceDistance, String> {

    @Override
    public String convertToDatabaseColumn(RaceDistance raceDistance) {
        if (raceDistance == null) {
            return null;
        }
        return raceDistance.getDisplayName();
    }

    @Override
    public RaceDistance convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }
        return RaceDistance.fromString(dbData);
    }
}