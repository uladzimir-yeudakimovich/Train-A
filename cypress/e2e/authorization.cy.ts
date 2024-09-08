describe('SignIn Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/Train-A/#/signin');
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
        cy.get('input[type="email"]').type('admin@admin.com');
        cy.get('input[type="password"]').type('my-password');
        cy.get('button[type="submit"]').click();
        cy.url().should('eq', 'http://localhost:4200/Train-A/#/');
    });

    it('should show error messages for unsuccessful login', () => {
        cy.get('input[type="email"]').type('admin@admin.com');
        cy.get('input[type="password"]').type('invalid-password');
        cy.get('button[type="submit"]').click();
        cy.get('mat-error').should('have.length', 2);
    });
});