describe('template spec', () => {
  
  Cypress.on("fail", (err, runnable) => {
    cy.log(err.message);
    return false;
  });

  it('Login', () => {
    cy.visit('/');
    cy.viewport('macbook-15')
    cy.get('[data-cy=login-user]').type(Cypress.env('USERNAME'));
    cy.get('[data-cy=login-pwd]').type(Cypress.env('PASSWORD'));
    cy.get('[data-cy=login-btn]')
      .click()
      .then(() => {
        // check that we are redirecetd to the login page
        cy.url().then(() => {
          cy.url().should('contain', 'landing');
          cy.get('[data-cy=landing-appointment-section]').should('exist')
        });
      });
  });
});
