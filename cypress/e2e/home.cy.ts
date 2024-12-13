describe('Home Page Test', () => {
    it('should visit the home page', () => {
      cy.visitHome();
      cy.contains('Marcas').should('be.visible'); 
    });
  });