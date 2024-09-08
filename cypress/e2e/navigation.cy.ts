describe('Unauthorized Navigation', () => {
  it('should open Home page', () => {
    cy.visit('http://localhost:4200/');
    cy.get('app-navigation')
      .get('a')
      .filter('[ng-reflect-activated="true"]')
      .contains('Home');
  });

  it('should open SignIn page', () => {
    cy.visit('http://localhost:4200/Train-A/#/signin');
    cy.get('app-navigation')
      .get('a')
      .filter('[ng-reflect-activated="true"]')
      .contains('Sign In');
  });

  it('should open SignUp page', () => {
    cy.visit('http://localhost:4200/Train-A/#/signup');
    cy.get('app-navigation')
      .get('a')
      .filter('[ng-reflect-activated="true"]')
      .contains('Sign Up');
  });

  it('should redirect to SignIn page', () => {
    cy.visit('http://localhost:4200/Train-A/#/admin');
    cy.get('app-navigation')
      .get('a')
      .filter('[ng-reflect-activated="true"]')
      .contains('Sign In');
  });

  it('should redirect to Not Found page', () => {
    cy.visit('http://localhost:4200/Train-A/#/404');
    cy.contains('Not Found');
  });

  it('should move to SignIn page', () => {
    cy.visit('http://localhost:4200/');
    cy.get('app-navigation').get('a').contains('Sign In').click();
    cy.url().should('include', '/signin');
  });

  it('should move to SignUp page', () => {
    cy.visit('http://localhost:4200/');
    cy.get('app-navigation').get('a').contains('Sign Up').click();
    cy.url().should('include', '/signup');
  });

  it('should not show Admin link', () => {
    cy.visit('http://localhost:4200/');
    cy.get('app-navigation').get('a').contains('Admin').should('not.exist');
  });

  it('should not show Profile link', () => {
    cy.visit('http://localhost:4200/');
    cy.get('app-navigation').get('a').contains('Profile').should('not.exist');
  });

  it('should not show Orders link', () => {
    cy.visit('http://localhost:4200/');
    cy.get('app-navigation').get('a').contains('Orders').should('not.exist');
  });
});
