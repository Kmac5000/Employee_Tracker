INSERT INTO department (id, name)
VALUES (001, "Leaders"),
       (002, "Clowns"),
       (003, "Animals"),
       (004, "Maintenance");

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Ring Leader", "65000.00", 001),
       (002, "Painted entertainer", "45000.00", 002),
       (003, "Veterinarian", "80000.00", 003),
       (004, "Custodian", "45000.00", 004);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Bilbo", "Hotchkin", 001),
       (002, "Hensly", "Mildrif", 004),
       (003, "Ron", "McGill", 003),
       (004, "Willma", "Ruffelganger", 003),
       (004, "Animal", "Bongo", 002),
       (004, "Skilt", "Flannigan", 004),
       (004, "Betty", "Krunkskilz", 001),
       (004, "Bilhaus", "Lizentonkinator", 002);