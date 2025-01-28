describe('Transactions Controller E2E Tests', () => {
  let testUserId;
  let testTransactionId;

  const existingUserId = 'firebase-uid-123';

  const validTransaction = {
    amount: 150.0,
    type: 'expense',
    category: 'utilities',
    description: 'Electricity bill',
    date: '2025-01-03T17:00:00.000Z',
  };

  const validUser = {
    id: 'cypress-created-user-1',
    first_name: 'Temp',
    middle_name: 'M',
    last_name: 'User',
    dob: '1991-12-01T04:00:00.000Z',
    gender: 'Female',
    email: 'cypress@test.com',
    phone: '1231233223',
  };

  before(() => {
    cy.exec('npm run db:reset')
      .then(() => {
        cy.request('POST', '/users', validUser);
      })
      .then((resp) => {
        existingUserId = resp.body.id;
      });
  });

  after(() => {
    cy.exec('npm run db:reset').then((result) => {
      cy.log(result.stdout);
    });
  });

  it('should return all transactions', () => {
    cy.request({
      method: 'GET',
      url: '/transactions',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('should create a new transaction for a valid user', () => {
    cy.request({
      method: 'POST',
      url: `/transactions/${existingUserId}`,
      body: validTransaction,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.include({
        user_id: existingUserId,
        amount: validTransaction.amount.toFixed(2),
        type: validTransaction.type,
        category: validTransaction.category,
        description: validTransaction.description,
      });

      testTransactionId = response.body.id;
    });
  });

  it('should fail to create a transaction with missing fields', () => {
    const invalidTransaction = {
      type: 'expense',
      category: 'Utilities',
      description: 'No amount',
      date: '2025-01-20',
    };

    cy.request({
      method: 'POST',
      url: `/transactions/${existingUserId}`,
      body: invalidTransaction,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]);
      expect(response.body).to.have.property('error');
    });
  });

  it("should return 404 if user doesn't exist when creating a transaction", () => {
    cy.request({
      method: 'POST',
      url: `/transactions/no-such-user-999`,
      body: {
        amount: 100,
        type: 'expense',
        category: 'groceries',
        description: 'Test groceries',
        date: '2025-01-01',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body).to.have.property('error');
    });
  });

  it('should return 400 if transaction has invalid or missing fields', () => {
    const invalidTx = {
      amount: -999,

      type: 'expense',
      description: 'Invalid negative amount',
    };

    cy.request({
      method: 'POST',
      url: `/transactions/${testUserId}`,
      body: invalidTx,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('error');
    });
  });

  it('should create a valid transaction for the existing user', () => {
    cy.request({
      method: 'POST',
      url: `/transactions/${testUserId}`,
      body: {
        amount: 150,
        type: 'expense',
        category: 'utilities',
        description: 'Electricity bill',
        date: '2025-01-05',
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
      createdTransactionId = res.body.id;
    });
  });

  it('should create a valid transaction for the existing user', () => {
    cy.request({
      method: 'POST',
      url: `/transactions/${testUserId}`,
      body: {
        amount: 150,
        type: 'expense',
        category: 'utilities',
        description: 'Electricity bill',
        date: '2025-01-05',
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
      createdTransactionId = res.body.id;
    });
  });

  it('should return all transactions (should contain created transaction)', () => {
    cy.request({
      method: 'GET',
      url: '/transactions',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      const createdTransaction = response.body.find(
        (tx) => tx.id === testTransactionId
      );
      expect(createdTransaction).to.exist;
      expect(createdTransaction.amount).to.eq(validTransaction.amount);
      expect(createdTransaction.user_id).to.eq(existingUserId);
    });
  });

  it('should get a transaction by transactionId', () => {
    cy.request({
      method: 'GET',
      url: `/transactions/${testTransactionId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', testTransactionId);
      expect(response.body).to.have.property('amount', validTransaction.amount);
    });
  });

  it('should handle invalid or non-existent transactionId', () => {
    cy.request({
      method: 'GET',
      url: '/transactions/invalid-id-123',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 500]);
      if (response.status === 200) {
        expect(response.body).to.be.null;
      } else {
        expect(response.body).to.have.property('error');
      }
    });
  });

  it('should get all transactions for a specific user', () => {
    cy.request({
      method: 'GET',
      url: `/transactions/user/${existingUserId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');

      const userTx = response.body.find((tx) => tx.id === testTransactionId);
      expect(userTx).to.exist;
      expect(userTx.user_id).to.eq(existingUserId);
    });
  });

  it('should get user transactions within a date range', () => {
    const start = '2025-01-01';
    const end = '2025-01-31';

    cy.request({
      method: 'GET',
      url: `/transactions/user/${existingUserId}/date-range?start_date=${start}&end_date=${end}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');

      const foundTx = response.body.find((tx) => tx.id === testTransactionId);
      expect(foundTx).to.exist;
      expect(foundTx.date).to.eq(validTransaction.date);
    });
  });

  it('should handle invalid date range or non-existing user', () => {
    cy.request({
      method: 'GET',
      url: `/transactions/user/invalid-user-999/date-range?start_date=2025-01-01&end_date=2025-01-31`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 500]);
      if (response.status === 200) {
        expect(response.body).to.be.an('array');
      } else {
        expect(response.body).to.have.property('error');
      }
    });
  });

  it('should update a transaction by ID', () => {
    const updatedData = {
      amount: 75.0,
      type: 'income',
      category: 'Salary',
      description: 'Part-time job',
      date: '2025-01-26',
    };

    cy.request({
      method: 'PUT',
      url: `/transactions/${testTransactionId}`,
      body: updatedData,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include(updatedData);
      expect(response.body).to.have.property('id', testTransactionId);
    });
  });

  it('should handle update for invalid transaction ID or missing data', () => {
    cy.request({
      method: 'PUT',
      url: '/transactions/bad-id-999',
      body: {
        amount: -9999,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 404, 500]);
      if (response.body.error) {
        expect(response.body.error).to.be.a('string');
      }
    });
  });

  it('should return 404 when updating a non-existing transaction', () => {
    cy.request({
      method: 'PUT',
      url: `/transactions/tx-does-not-exist-999`,
      body: {
        amount: 200,
        type: 'expense',
        category: 'groceries',
        description: 'Updated groceries',
        date: '2025-01-06',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body).to.have.property('error');
    });
  });

  it('should return 400 if updating transaction with invalid data', () => {
    cy.request({
      method: 'PUT',
      url: `/transactions/${createdTransactionId}`,
      body: {
        amount: -50,
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('error');
    });
  });

  it('should delete a transaction by ID', () => {
    cy.request({
      method: 'DELETE',
      url: `/transactions/${testTransactionId}`,
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it('should handle deleting a transaction that does not exist', () => {
    cy.request({
      method: 'DELETE',
      url: `/transactions/${testTransactionId}`,

      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([204, 404, 500]);
    });
  });

  it("should return 404 if deleting a transaction that doesn't exist", () => {
    cy.request({
      method: 'DELETE',
      url: '/transactions/no-transaction-here-999',
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body).to.have.property('error');
    });
  });
});
