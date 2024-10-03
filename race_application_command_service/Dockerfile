# Use a compatible OpenJDK image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file into the container (from build/libs directory)
COPY build/libs/race_application_command_service-*.jar app.jar

# Expose the port the application runs on
EXPOSE 8080

# Command to run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]