INSERT INTO department (name) 
VALUES
     ('Sales'),
     ('Engineering'),
     ('Accounts'),
     ('HR')
     

INSERT INTO role (title, salary, department_id)
VALUES
    ('Business rep', 70000, 1 ),
    ('Account Executive', 100000, 1),
    ('Software Engineer', 120000, 2),
    ('Accountant', 90000, 3),
    ('Hr Manager', 70000, 4)
    
INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES
  ("Joe", "Lowe", 1, NULL),
  ("Hu", "Chang", 2, 1),
  ("Ash", "Cams", 3, NULL),
  ("Jolly", "Happy", 4, 3),
  ("Sam", "Harris", 5, NULL),
  ("Tom", "Bobby", 6, 5),
  