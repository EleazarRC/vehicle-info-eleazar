describe('Flow Test: Navigate to Details Page for 17 CREEK ENTERPRISES', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should navigate to details of 17 CREEK ENTERPRISES and verify content', () => {

      cy.get('table').should('be.visible');

      cy.intercept('GET', '**/GetVehicleTypesForMake/**').as('getVehicleTypes');
  
      cy.get(':nth-child(6) > :nth-child(3) > .mdc-button > .mdc-button__label').click();

      cy.url().should('include', '/details/');
  
      cy.wait('@getVehicleTypes');
  
      cy.get('h1').should('contain.text', 'Detalles de 2-G TRAILER CO LLC');
  
      cy.contains('Tipos de Vehículos').should('be.visible');
      cy.get('table').contains('td', 'Trailer').should('be.visible');
    });
  });
  