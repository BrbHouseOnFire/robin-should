CREATE DATABASE robin_db;
USE robin_db;
CREATE TABLE expenses_budgeted (
  id int NOT NULL AUTO_INCREMENT,
  user varchar (255) NOT NULL,
  amount DECIMAL (63, 2) NOT NULL,
  category_id int NOT NULL,
  creation_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
CREATE TABLE expenses_actual (
  id int NOT NULL AUTO_INCREMENT,
  user varchar (255) NOT NULL,
  amount DECIMAL (63, 2) NOT NULL,
  category_id int NOT NULL,
  creation_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
CREATE TABLE income (
  id int NOT NULL AUTO_INCREMENT,
  user varchar (255) NOT NULL,
  amount DECIMAL (63, 2) NOT NULL,
  creation_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
CREATE TABLE categories (
  id int NOT NULL AUTO_INCREMENT,
  name varchar (255) NOT NULL,
  creation_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);