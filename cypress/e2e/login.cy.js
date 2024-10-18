describe('Login', () => {
  it('logs in with valid credentials', () => {
    cy.visit('index.html');
    cy.window().then((win) => {
      win.location.href = '/auth/login/';
    });
    cy.url().should('include', '/auth/login/');
    cy.get('input[name="email"]').type('miriamlop@stud.noroff.no');
    cy.get('input[name="password"]').type('asdfghj1');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/profile/');
  });

  it('shows error on invalid credentials', () => {
    cy.visit('index.html');
    cy.window().then((win) => {
      win.location.href = '/auth/login/';
    });
    cy.url().should('include', '/auth/login/');
    cy.get('input[name="email"]').type('wronguser@stud.noroff.no');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Login failed. Please try again.');
    });
  });
});
