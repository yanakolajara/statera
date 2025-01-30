\c statera

-- Insert Users
INSERT INTO users (id, first_name, middle_name, last_name, dob, gender, email, phone, hashed_password)
VALUES
('firebase-uid-124', 'Alice', '', 'Smith', '1992-07-15', 'Female', 'alice.smith@email.com', '9876543210', '$2b$10$Xwfnvh/aeJ6RQgfJTCj5yON6Q3j8xYXU08vZtO7Ds2yOSkAGuACN2'),
('firebase-uid-125', 'John', 'A.', 'Doe', '1990-11-22', 'Male', 'john.doe@email.com', '1122334455', '$2b$10$EXs8bq2A2o1ZZzox0E/6OOz3L35Nl4FZUnKRPi0nDj8LzOKsUlEyq'),
('firebase-uid-126', 'Emily', 'B.', 'Davis', '1995-05-30', 'Female', 'emily.davis@email.com', '5566778899', '$2b$10$dTXUmhJSeO52fOoCtTHjE.9wOF83Udcu8XlbwJFE2KPjE7EdQbMZC'),
('firebase-uid-127', 'Michael', 'C.', 'Brown', '1988-02-14', 'Male', 'michael.brown@email.com', '6677889900', '$2b$10$nSEk2I2HjB2Oi6Z5eOq5z.rZCJv.1WNNcFkRrKEkAf3PRRwwJ7iFS');


-- Insert transactions
INSERT INTO transactions (user_id, amount, type, category, description, date)
VALUES
-- Yanako
('firebase-uid-123', 1000.00, 'income', 'salary', 'Monthly salary', '2025-01-01 10:00:00'),
('firebase-uid-123', 200.00, 'expense', 'groceries', 'Weekly groceries', '2025-01-02 11:00:00'),
('firebase-uid-123', 150.00, 'expense', 'utilities', 'Electricity bill', '2025-01-03 12:00:00'),
('firebase-uid-123', 300.00, 'expense', 'entertainment', 'Movie night', '2025-01-04 13:00:00'),

-- Alice
('firebase-uid-124', 1200.00, 'income', 'salary', 'Monthly salary', '2025-01-01 09:00:00'),
('firebase-uid-124', 250.00, 'expense', 'groceries', 'Weekly groceries', '2025-01-02 10:30:00'),
('firebase-uid-124', 180.00, 'expense', 'utilities', 'Gas bill', '2025-01-03 11:15:00'),
('firebase-uid-124', 100.00, 'expense', 'entertainment', 'Concert tickets', '2025-01-05 15:00:00'),

-- John
('firebase-uid-125', 900.00, 'income', 'freelance', 'Freelance project', '2025-01-02 08:00:00'),
('firebase-uid-125', 300.00, 'expense', 'rent', 'January rent', '2025-01-03 12:00:00'),
('firebase-uid-125', 100.00, 'expense', 'groceries', 'Weekly groceries', '2025-01-04 13:30:00'),
('firebase-uid-125', 50.00, 'expense', 'transportation', 'Train pass', '2025-01-05 14:00:00'),

-- Emily
('firebase-uid-126', 2000.00, 'income', 'business', 'Product sales', '2025-01-01 10:30:00'),
('firebase-uid-126', 400.00, 'expense', 'groceries', 'Monthly groceries', '2025-01-02 12:00:00'),
('firebase-uid-126', 300.00, 'expense', 'utilities', 'Water bill', '2025-01-03 14:00:00'),
('firebase-uid-126', 150.00, 'expense', 'dining', 'Dinner with family', '2025-01-04 19:00:00'),

-- Michael
('firebase-uid-127', 1500.00, 'income', 'investment', 'Dividend payout', '2025-01-01 16:00:00'),
('firebase-uid-127', 500.00, 'expense', 'rent', 'January rent', '2025-01-02 10:00:00'),
('firebase-uid-127', 120.00, 'expense', 'utilities', 'Internet bill', '2025-01-03 11:30:00'),
('firebase-uid-127', 250.00, 'expense', 'travel', 'Weekend trip', '2025-01-04 20:00:00');