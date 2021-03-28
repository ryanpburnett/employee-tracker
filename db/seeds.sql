USE employee_tracker_db;

INSERT INTO department (name)
VALUES ("mailroom");
INSERT INTO department (name)
VALUES ("sales");
INSERT INTO department (name)
VALUES ("finance");

INSERT INTO role (title, salary)
VALUES ("manager", 150000);
INSERT INTO role (title, salary)
VALUES ("courier", 30000);
INSERT INTO role (title, salary)
VALUES ("clerk", 45000);
INSERT INTO role (title, salary)
VALUES ("salesperson", 70000);
INSERT INTO role (title, salary)
VALUES ("accountant", 130000);
INSERT INTO role (title, salary)
VALUES ("coffee making specialist", 200000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Jackson", 1, null)