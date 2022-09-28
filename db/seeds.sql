INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal"),;

INSERT INTO role (title, department_id)
VALUES ("Sales Lead", 1),
       ("Salesperson", 1),
       ("Lead Engineer", 2),
       ("Software Engineer", 2),
       ("Account Manager", 3),
       ("Accountant", 3),
       ("Legal Team Lead",4),
       ("Lawyer",4);

INSERT INTO employee (first_name,last_name, role_id,manager_id)
VALUES ("John", "Doe",1,1),
       ("Mike", "Chan",2),
       ("Ashley", "Rodriguez",3,2),
       ("Kevin", "Tupik",4),
       ("Kunal", "Singh",5,3),
       ("Malia", "Brown",6),
       ("Sarah", "Lourd",7,4),
       ("Tom", "Allen",8);