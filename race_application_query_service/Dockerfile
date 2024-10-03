# Use a compatible OpenJDK image
FROM openjdk:17

# Copy the built JAR from the builder stage
COPY build/libs/race_application_query_service-0.0.1-SNAPSHOT.jar race_application_query_service.jar

# Expose the port the application runs on
EXPOSE 8080

# Command to run the JAR file
ENTRYPOINT ["java", "-jar", "/race_application_query_service.jar"]