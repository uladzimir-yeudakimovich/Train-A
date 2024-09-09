import { RoutePath } from '@shared/models/enums/route-path.enum';

describe('Search Page', () => {
  beforeEach(() => {
    cy.visit(RoutePath.Search);
  });

  it('should have a search input fields', () => {
    cy.get('input[placeholder="From"]');
    cy.get('input[placeholder="To"]');
    cy.get('input[name="date"]');
    cy.get('input[type="time"]');
    cy.get('button[type="submit"]').contains('Search');
  });

  it('should search for a trips', () => {
    const tomorrow = new Date();
    const date = tomorrow.toISOString().split('T')[0]; // YYYY-MM-DD
    const year = +date.split('-')[0];
    const month = +date.split('-')[1];
    const day = +date.split('-')[2];
    const formDate = `${month}-${day}-${year}`;

    cy.get('input[placeholder="From"]').type('city1');
    cy.get('input[placeholder="To"]').type('city10');
    cy.get('input[name="date"]').clear();
    cy.get('input[name="date"]').type(formDate);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', RoutePath.Search);

    cy.get('body').then(($body) => {
      if ($body.find('app-search-filter').length) {
        cy.get('app-search-filter').should('be.visible');
        cy.get('app-search-cards').should('be.visible');
      } else {
        cy.get('app-search img').should('be.visible');
      }
    });
  });
});
