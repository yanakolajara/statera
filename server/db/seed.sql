\c statera

INSERT INTO users (id, first_name,middle_name,last_name,dob,gender,email,phone)
VALUES
('firebase-uid-123', 'Yanako', '', 'Lajara', '1991-03-28', 'Male', 'yanakolajara@email.com', '1234567890' );

INSERT INTO transactions (user_id, amount, type, category, description, date)
VALUES
('firebase-uid-123', 1000.00, 'income', 'salary', 'Monthly salary', '2025-01-01 10:00:00'),
('firebase-uid-123', 200.00, 'expense', 'groceries', 'Weekly groceries', '2025-01-02 11:00:00'),
('firebase-uid-123', 150.00, 'expense', 'utilities', 'Electricity bill', '2025-01-03 12:00:00'),
('firebase-uid-123', 300.00, 'expense', 'entertainment', 'Movie night', '2025-01-04 13:00:00');