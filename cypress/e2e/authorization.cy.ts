import { RoutePath } from '@shared/models/enums/route-path.enum';

describe('SignIn Page', () => {
  beforeEach(() => {
    cy.visit(RoutePath.Login);
  });

  it('should have a title with form', () => {
    cy.contains('Sign In');
    cy.get('form');
  });

  it('should have a form with email and password fields', () => {
    cy.get('input[type="email"]');
    cy.get('input[type="password"]');
  });

  it('should have a submit button', () => {
    cy.get('button[type="submit"]').contains('Sign In');
  });

  it('should have a link to Sign Up page', () => {
    cy.get('a').contains('Sign Up');
  });

  it('should navigate to Home after submitting the form', () => {
    cy.login('admin@admin.com', 'my-password');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.url().should('eq', Cypress.config().baseUrl + RoutePath.Search);
  });

  it('should show error messages for unsuccessful login', () => {
    cy.get('input[type="email"]').type('admin@admin.com');
    cy.get('input[type="password"]').type('invalid-password');
    cy.get('button[type="submit"]').click();
    cy.get('mat-error').should('have.length', 2);
  });

  it('should have navigation to Sign Up page', () => {
    cy.get('app-login').contains('Sign Up').click();
    cy.url().should('eq', Cypress.config().baseUrl + RoutePath.Registration);
  });
});

describe('SignUp Page', () => {
  beforeEach(() => {
    cy.visit(RoutePath.Registration);
  });

  it('should register a new user and navigate to SignIn', () => {
    // TODO: fix the mockRegisterUser command
    const randomEmail = `${Math.random().toString(36).substring(7)}@example.com`;
    cy.mockRegisterUser();

    cy.register(randomEmail, 'password');
    cy.url().should('include', RoutePath.Login);
  });

  it('should show error messages for unsuccessful registration', () => {
    cy.register('admin@admin.com', 'password');
    cy.get('mat-error');
  });

  it('should have navigation to Sign In page', () => {
    cy.get('app-registration').contains('Sign In').click();
    cy.url().should('eq', Cypress.config().baseUrl + RoutePath.Login);
  });
});
