import { RoutePath } from '@shared/models/enums/route-path.enum';

describe('Search Page', () => {
  beforeEach(() => {
    cy.visit(RoutePath.Search);
  });

  it('should have a search input fields', () => {
    cy.get('input[placeholder="From"]');
    cy.get('input[placeholder="To"]');
    cy.get('input[name="datetime"]');
    cy.get('button[type="submit"]').contains('Search');
  });

  it('should search for a trips', () => {
    cy.get('input[placeholder="From"]').type('city1');
    cy.get('input[placeholder="To"]').type('city10');

    cy.get('button[type="submit"]').click();
    cy.url().should('include', RoutePath.Search);

    cy.contains('Loading...').should('be.visible');
  });
});
