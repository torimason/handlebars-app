DROP DATABASE IF EXISTS venues_db;

CREATE DATABASE venues_db;
USE venues_db;

CREATE TABLE venues (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    food varchar(255),
    rating int(2),
    visited BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);
