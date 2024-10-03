-- Create Users table
CREATE TABLE users
(
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name    VARCHAR(255)        NOT NULL,
    last_name     VARCHAR(255)        NOT NULL,
    email         VARCHAR(255) UNIQUE NOT NULL,
    password      VARCHAR(255)        NOT NULL,
    date_of_birth DATE                NOT NULL,
    role          VARCHAR(20)         NOT NULL CHECK (role IN ('Applicant', 'Administrator'))
);

-- Create Races table
CREATE TABLE races
(
    id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name     VARCHAR(255) NOT NULL,
    distance VARCHAR(20)  NOT NULL CHECK (distance IN ('5k', '10k', 'HalfMarathon', 'Marathon'))
);

-- Create Applications table
CREATE TABLE applications
(
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    club       VARCHAR(255),
    race_id    UUID         NOT NULL,
    FOREIGN KEY (race_id) REFERENCES races (id) ON DELETE CASCADE
);