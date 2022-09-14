describe('Search for terms', () => {

    it('should open the search page', () => {
        cy.visit('/search');
        cy.get('#titlePage').should('have.text', 'Snomed CT');
    });

    it('should open search and display results', () => {
        cy.get('input[data-cy="termId').type('test');
    });
});