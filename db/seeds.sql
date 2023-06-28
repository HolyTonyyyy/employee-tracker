INSERT INTO department (name)
VALUES ("HR"),
("headquarter"),
("engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("builder", 20, 2),
("HR person", 30, 1),
("developer", 35, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jon", "Doe", 1, NULL), 
("Daisy", "Springs", 3, 1),
("Henry", "small", 2, 1);