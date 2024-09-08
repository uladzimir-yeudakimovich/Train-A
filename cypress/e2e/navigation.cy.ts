import { RoutePath } from "@shared/models/enums/route-path.enum";

describe('Unauthorized Navigation', () => {
  it('should open Home page', () => {
    cy.visit(RoutePath.Search);
    cy.get('app-navigation')
      .get('a')
      .filter('[ng-reflect-activated="true"]')
      .contains('Home');
  });

  it('should open SignIn page', () => {
    cy.visit(RoutePath.Login);
    cy.get('app-navigation')
      .get('a')
      .filter('[ng-reflect-activated="true"]')
      .contains('Sign In');
  });

  it('should open SignUp page', () => {
    cy.visit(RoutePath.Registration);
    cy.get('app-navigation')
      .get('a')
      .filter('[ng-reflect-activated="true"]')
      .contains('Sign Up');
  });

  it('should redirect to SignIn page', () => {
    cy.visit(RoutePath.Admin);
    cy.get('app-navigation')
      .get('a')
      .filter('[ng-reflect-activated="true"]')
      .contains('Sign In');
  });

  it('should redirect to Not Found page', () => {
    cy.visit(RoutePath.NotFound);
    cy.contains('Not Found');
  });

  it('should move to SignIn page', () => {
    cy.visit(RoutePath.Search);
    cy.get('app-navigation').get('a').contains('Sign In').click();
    cy.url().should('include', '/signin');
  });

  it('should move to SignUp page', () => {
    cy.visit(RoutePath.Search);
    cy.get('app-navigation').get('a').contains('Sign Up').click();
    cy.url().should('include', '/signup');
  });

  it('should not show Admin link', () => {
    cy.visit(RoutePath.Search);
    cy.get('app-navigation').get('a').contains('Admin').should('not.exist');
  });

  it('should not show Profile link', () => {
    cy.visit(RoutePath.Search);
    cy.get('app-navigation').get('a').contains('Profile').should('not.exist');
  });

  it('should not show Orders link', () => {
    cy.visit(RoutePath.Search);
    cy.get('app-navigation').get('a').contains('Orders').should('not.exist');
  });
});
