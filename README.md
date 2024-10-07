# Trail Race Organizer

A web application for organizing and participating in trail races. This project consists of a backend (Java Spring Boot) and a frontend (React).

## Prerequisites

Before starting the application, ensure you have the following installed:

- Docker
- Docker Compose
- Node.js
- Npm
- Gradle

## Project Structure

- **Backend:**
    - `race_application_command_service`: Command service
    - `race_application_query_service`: Query service

- **Frontend:**
    - `race_application_client_application`: React application for both applicants and administrators.

## Setup and Usage

### 1. Clone the repository

git clone https://github.com/TomoCalu/trail-race.git
cd trail-race

### 2. How to Run the Project

#### Step 1: Build the Backend

To build the backend and frontend: 
- make build

#### Step 2: Run the Services

To run the backend services and frontend application, use the following command:

- make run

#### Step 3: Access the Application

After running the services, the application will be accessible at:

- [http://localhost:3000](http://localhost:3000)

#### Step 4: Clean Up Resources

To clean up Docker containers, volumes, and networks, run:

- make clean

### 3. Running Tests

#### Backend Tests

To tests:

- make test