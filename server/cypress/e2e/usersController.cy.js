describe('E2E Tests: UsersControllers.js', () => {
  let testUserId;

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
    cy.exec('npm run db:reset').then((result) => {
      cy.log(result);
      cy.log(result.stdout);
    });
  });

  after(() => {
    cy.exec('npm run db:reset').then((result) => {
      cy.log(result.stdout);
    });
  });

  it('should create a new user successfully', () => {
    cy.request({
      method: 'POST',
      url: '/users',
      body: validUser,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id', validUser.id);
      expect(response.body).to.have.property('email', validUser.email);

      testUserId = response.body.id;
    });
  });

  it('should fail to create a user if required fields are missing', () => {
    const invalidUser = {
      id: 'invalid-user-1',
      first_name: '',
      email: 'not-a-valid-email',
    };

    cy.request({
      method: 'POST',
      url: '/users',
      body: invalidUser,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 500]);

      expect(response.body).to.have.property('error');
    });
  });

  it('should return 400 (Bad Request) when creating user with missing required fields', () => {
    const badUser = {
      id: 'bad-user-id',
      first_name: '',
      email: 'nope',
    };

    cy.request({
      method: 'POST',
      url: '/users',
      body: badUser,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('error');
    });
  });

  it('should retrieve all users', () => {
    cy.request({
      method: 'GET',
      url: '/users',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');

      const found = response.body.find((u) => u.id === testUserId);
      expect(found).to.exist;
      expect(found.email).to.eq(validUser.email);
    });
  });

  it('should retrieve a single user by ID', () => {
    cy.request({
      method: 'GET',
      url: `/users/${testUserId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', testUserId);
      expect(response.body).to.have.property('email', validUser.email);
    });
  });

  it('should return null (or 500) when fetching a non-existing user or invalid ID type', () => {
    cy.request({
      method: 'GET',
      url: '/users/notAnInteger',

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

  it('should return 404 when trying to GET a non-existing user ID', () => {
    cy.request({
      method: 'GET',
      url: '/users/not-real-id-999',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.have.property('error').and.to.be.a('string');
    });
  });

  it('should update an existing user', () => {
    const updates = {
      first_name: 'Jane',
      middle_name: 'Z',
      last_name: 'Doe',
      dob: '1992-02-02',
      gender: 'Female',
      email: 'jane.doe@example.com',
      phone: '5559876543',
    };

    cy.request({
      method: 'PUT',
      url: `/users/${testUserId}`,
      body: updates,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include(updates);
      expect(response.body).to.have.property('id', testUserId);
    });
  });

  it('should fail to update if the userId is invalid or data is invalid', () => {
    cy.request({
      method: 'PUT',
      url: '/users/badUserId123',

      body: {
        first_name: '',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 404, 500]);

      if (response.body.error) {
        expect(response.body.error).to.be.a('string');
      }
    });
  });

  it('should return 404 if we try to UPDATE a non-existing user', () => {
    const updates = {
      first_name: 'Ghost',
      last_name: 'User',
      email: 'ghost@example.com',
    };

    cy.request({
      method: 'PUT',
      url: '/users/does-not-exist-123',
      body: updates,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body).to.have.property('error');
    });
  });

  it('should return 400 if we try to UPDATE a user with invalid data', () => {
    const badData = {
      first_name: '',

      email: 'notAnEmail',
      phone: 'abc',
    };

    cy.request({
      method: 'PUT',
      url: `/users/${createdUserId}`,
      body: badData,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('error');
    });
  });

  it('should delete the user', () => {
    cy.request({
      method: 'DELETE',
      url: `/users/${testUserId}`,
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it('should handle deleting a non-existing user gracefully', () => {
    cy.request({
      method: 'DELETE',
      url: `/users/${testUserId}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([204, 404, 500]);
    });
  });

  it('should return 404 if we try to DELETE a non-existing user ID', () => {
    cy.request({
      method: 'DELETE',
      url: '/users/user-does-not-exist-999',
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body).to.have.property('error');
    });
  });
});
