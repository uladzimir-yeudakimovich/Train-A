import { RoutePath } from '@shared/models/enums/route-path.enum';

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
    cy.url().should('include', RoutePath.Login);
  });

  it('should move to SignUp page', () => {
    cy.visit(RoutePath.Search);
    cy.get('app-navigation').get('a').contains('Sign Up').click();
    cy.url().should('include', RoutePath.Registration);
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

describe('Authorized Navigation', () => {
  
  beforeEach(() => {
    cy.register('user@user.com', 'my-password');
    cy.login('user@user.com', 'my-password');
  });

  it('should redirect to Home page', () => {
    cy.visit(RoutePath.Login);
    cy.url().should('eq', Cypress.config().baseUrl + RoutePath.Search);
  });

  it('should open Profile page', () => {
    cy.get('app-navigation').get('a').contains('Profile').click();
    cy.url().should('include', RoutePath.UserProfile);
  });

  it('should open Orders page', () => {
    cy.get('app-navigation').get('a').contains('Orders').click();
    cy.url().should('include', RoutePath.Orders);
  });

  it('should not show Admin link', () => {
    cy.get('app-navigation').get('a').contains('Admin').should('not.exist');
  });

  it('should not show SignIn link', () => {
    cy.get('app-navigation').get('a').contains('Sign In').should('not.exist');
  });

  it('should not show SignUp link', () => {
    cy.get('app-navigation').get('a').contains('Sign Up').should('not.exist');
  });

  it('should not show Admin page', () => {
    cy.visit(RoutePath.Admin);
    cy.url().should('eq', Cypress.config().baseUrl + RoutePath.Search);
  });
});

describe('Admin Navigation', () => {
  beforeEach(() => {
    cy.login('admin@admin.com', 'my-password');
    cy.get('app-navigation').get('a').contains('Admin').click();
  });

  it('should open Admin page', () => {
    cy.url().should('include', RoutePath.Admin);
  });

  it('should open Stations page', () => {
    cy.get('a').contains('Stations').click();
    cy.url().should('include', RoutePath.AdminStations);
  });

  it('should open Carriages page', () => {
    cy.get('a').contains('Carriages').click();
    cy.url().should('include', RoutePath.AdminCarriages);
  });

  it('should open Routes page', () => {
    cy.get('a').contains('Routes').click();
    cy.url().should('include', RoutePath.AdminRoutes);
  });
});
