import { RoutePath } from '@shared/models/enums/route-path.enum';
import { ApiPath } from '@shared/models/enums/api-path.enum';

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      register(email: string, password: string): Chainable<void>;
      mockRegisterUser(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit(RoutePath.Login);
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('register', (email: string, password: string) => {
  cy.visit(RoutePath.Registration);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('input[name="confirmPassword"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('mockRegisterUser', () => {
  cy.intercept('POST', `/api/${ApiPath.SignUp}`, {
    statusCode: 201,
    body: {},
  }).as('registerUser');
});
