describe('Flow Test: Navigate to Details Page', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });

  it('should navigate to the details page for the first brand', () => {

    cy.get('table').should('be.visible');

    cy.intercept('GET', '**/GetVehicleTypesForMake/**').as('getVehicleTypes');

    cy.get(':nth-child(1) > :nth-child(3) > .mdc-button > .mdc-button__label').click();

    cy.url().should('include', '/details/');

    cy.wait('@getVehicleTypes');

    cy.contains('Detalles').should('be.visible');

    cy.contains('Tipos de Vehículos').should('be.visible');
  });
});
