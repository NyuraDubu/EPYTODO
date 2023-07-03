DROP DATABASE IF EXISTS `epytodo`;
CREATE DATABASE `epytodo`;
USE `epytodo`;
DROP TABLE IF EXISTS `todo`;
DROP TABLE IF EXISTS `user`;

CREATE TABLE user (
    id int NOT NULL UNIQUE AUTO_INCREMENT,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    firstname varchar(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE todo (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    due_time DATETIME NOT NULL,
    status varchar(255) DEFAULT 'not started' CHECK (status= 'not started' OR status= 'todo' OR status= 'in progress' OR status= 'done'),
    user_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);