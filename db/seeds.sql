USE robin_db;

INSERT INTO expenses (user, amount, category_id) VALUES 
('Example User Joe', 45, 2),
('Example User Joe', 20, 15),
('Example User Joe', 900, 1),
('Example User Joe', 60, 8),
('Example User Joe', 100, 4);

INSERT INTO income (user, amount) VALUES 
('Example User Joe', 8000);

INSERT INTO categories (name) VALUES 
('Rent'), -- 1
('Eating Out'),-- 2
('Traveling'),-- 3
('Amazon'),-- 4
('Shopping'),-- 5
('Groceries'),-- 6
('Uber/Lyft'),-- 7
('Phone Bill'),-- 8
('One-Time/Non-Recurring'),-- 9
('Internet Bill'),-- 10
('TV Bill'),-- 11
('Commuting'),-- 12
('Upkeep'),-- 13
('Gifts'),-- 14
('Charity');-- 15


select * from expenses;
select * from income;
select * from categories;