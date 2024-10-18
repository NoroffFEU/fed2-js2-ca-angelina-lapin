describe('Logout', () => {
  it('logs out the user and redirects to login page', () => {
    cy.visit('index.html');
    cy.window().then((win) => {
      win.location.href = '/auth/login/';
    });

    cy.get('input[name="email"]').type('miriamlop@stud.noroff.no');
    cy.get('input[name="password"]').type('asdfghj1');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/profile');

    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      expect(token).to.exist;
    });

    cy.get('#logoutButton').click();

    cy.window().then((win) => {
      win.localStorage.removeItem('token');
      const token = win.localStorage.getItem('token');
      console.log('Token after logout:', token);
      expect(token).to.be.null;
    });

    cy.url().should('include', '/auth/login');
  });
});
