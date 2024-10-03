-- Insert initial users
INSERT INTO users (first_name, last_name, email, password, date_of_birth, role)
VALUES ('Admin', 'User', 'admin@admin.com', '$2a$12$948428YcAkdzadChuRl2FOGhlJGD9K0GTsyn24.dZjpWKRlwbNQqm',
        '1980-01-01', 'Administrator'),
       ('Ivan', 'Horvat', 'user@user.com', '$2a$12$948428YcAkdzadChuRl2FOGhlJGD9K0GTsyn24.dZjpWKRlwbNQqm', '1990-05-15',
        'Applicant');

-- Insert initial races
INSERT INTO races (name, distance)
VALUES ('Zagreb Marathon', 'Marathon'),
       ('Plitvice Half Marathon', 'HalfMarathon'),
       ('Dubrovnik 10k', '10k'),
       ('Split 5k Run', '5k');

-- Insert initial applications
INSERT INTO applications (first_name, last_name, club, race_id)
VALUES ('Ivana', 'Horvat', 'Zagreb Runners', (SELECT id FROM races WHERE name = 'Zagreb Marathon')),
       ('Marko', 'Kovačić', 'Marathon Club', (SELECT id FROM races WHERE name = 'Plitvice Half Marathon')),
       ('Ana', 'Marić', 'Dubrovnik Athletes', (SELECT id FROM races WHERE name = 'Dubrovnik 10k')),
       ('Petar', 'Novak', NULL, (SELECT id FROM races WHERE name = 'Split 5k Run'));