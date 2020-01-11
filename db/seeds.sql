USE robin_db;
INSERT INTO users (username)
VALUES
  ('Example User Joe'),
  ('Tester');
INSERT INTO expenses_budgeted (user, amount, category_id)
VALUES
  ('Tester', 45, 13),
  ('Tester', 50, 12),
  ('Example User Joe', 45, 13),
  ('Example User Joe', 50, 12),
  ('Example User Joe', 900, 1),
  ('Example User Joe', 60, 8),
  ('Example User Joe', 100, 71);
INSERT INTO expenses_budgeted (user, category_id)
VALUES
  ('Tester', 9),
  ('Example User Joe', 9);
INSERT INTO expenses_actual (user, amount, category_id)
VALUES
  ('Tester', 75, 13),
  ('Tester', 40, 12),
  ('Example User Joe', 75, 13),
  ('Example User Joe', 40, 12),
  ('Example User Joe', 900, 1),
  ('Example User Joe', 60, 8),
  ('Example User Joe', 120, 71);
INSERT INTO income (user, amount)
VALUES
  ('Tester', 5000),
  ('Example User Joe', 8000);
INSERT INTO categories (name)
VALUES
  ('Mortgage/Rent'),
  -- 1
  ('HOA'),
  -- 2
  ('Home/Rent Insurance'),
  -- 3
  ('Property Taxes'),
  -- 4
  ('Home Repair/Maintenance'),
  -- 5
  ('Electricity'),
  -- 6
  ('Water'),
  -- 7
  ('Gas'),
  -- 8
  ('Phone'),
  -- 9
  ('Internet'),
  -- 10
  ('Cable'),
  -- 11
  ('Groceries'),
  -- 12
  ('Eating Out/Restaurant'),
  -- 13
  ('Eating Out/Lunch'),
  -- 14
  ('Coffee'),
  -- 15
  ('Alcohol/Bar'),
  -- 16
  ('Alcohol/Home'),
  -- 17
  ('Alimony/Child Support'),
  -- 18
  ('Day Care/Babysitting'),
  -- 19
  ('Activities/Lessons'),
  -- 20
  ('Insurance Co-Pay'),
  -- 21
  ('Presriptions/OTC'),
  -- 22
  ('Fitness/Gym'),
  -- 23
  ('Health Insurance (not deducted)'),
  -- 24
  ('Auto Loan'),
  -- 25
  ('Auto Insurance'),
  -- 26
  ('Gasoline'),
  -- 27
  ('Auto Maintenance'),
  -- 28
  ('Public Transportation'),
  -- 29
  ('Uber/Lyft'),
  -- 30
  ('Credit Card(s)'),
  -- 31
  ('Student Loan'),
  -- 32
  ('Other Loans'),
  -- 33
  ('Life Insurance'),
  -- 34
  ('Tuition'),
  -- 35
  ('School Supplies'),
  -- 36
  ('Monthly Subscriptions'),
  -- 37
  ('Hobbies'),
  -- 38
  ('Vacation/Travel'),
  -- 39
  ('Other Entertainment'),
  -- 40
  ('Pet Food'),
  -- 41
  ('Pet Treats'),
  -- 42
  ('Pet Insurance'),
  -- 43
  ('Grooming/Boarding/Vet Fees'),
  -- 44
  ('Toiletries/Cosmetics'),
  -- 45
  ('Household Products'),
  -- 46
  ('Clothing'),
  -- 47
  ('Personal Care (Other)'),
  -- 48
  ('Retirment Account (not deducted)'),
  -- 49
  ('Brokerage Accounts'),
  -- 50
  ('College Savings Plan'),
  -- 51
  ('Emergency Savings'),
  -- 52
  ('Charity'),
  -- 53
  ('Auto Registration'),
  -- 54
  ('Weddings'),
  -- 55
  ('Moving Fees'),
  -- 56
  ('Birthdays'),
  -- 57
  ('Baby Showers'),
  -- 58
  ('Anniversary'),
  -- 59
  ('Vitamins/Supplements'),
  -- 60
  ('Roadside Assistance'),
  -- 61
  ('Movies Theater'),
  -- 62
  ('Pay Per View'),
  -- 63
  ('Video Games'),
  -- 64
  ('Toys'),
  -- 65
  ('Tourist Attractions'),
  -- 66
  ('Credit Card Annual Fee'),
  -- 67
  ('Credit Card Payments'),
  -- 68
  ('Gambling Expenses'),
  -- 69
  ('Planned Expenses'),
  -- 70
  ('Amazon');
-- 71
select
  *
from expenses_budgeted;
Select
  *
from expenses_actual;
select
  *
from income;
select
  *
from categories;