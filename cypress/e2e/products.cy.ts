describe('Products Page', () => {
  beforeEach(() => {
    cy.visit('/products');
  });

  it('should display products', () => {
    cy.get('[data-testid="product-card"]').should('have.length.at.least', 1);
  });

  it('should filter products by category', () => {
    // Click on a category filter
    cy.get('[data-testid="category-filter"]').first().click();
    
    // Verify that products are filtered
    cy.get('[data-testid="product-card"]').should('have.length.at.least', 1);
  });

  it('should search products', () => {
    // Type in the search input
    cy.get('[data-testid="search-input"]').type('Test Product');
    
    // Verify that search results are displayed
    cy.get('[data-testid="product-card"]').should('have.length.at.least', 1);
  });

  it('should show loading state', () => {
    // Intercept the API call to simulate loading
    cy.intercept('GET', '**/products', (req) => {
      req.reply({
        delay: 1000,
        body: []
      });
    }).as('getProducts');

    cy.visit('/products');
    cy.get('[data-testid="loading-spinner"]').should('be.visible');
    cy.wait('@getProducts');
  });

  it('should show error state', () => {
    // Intercept the API call to simulate an error
    cy.intercept('GET', '**/products', {
      statusCode: 500,
      body: { error: 'Server error' }
    }).as('getProductsError');

    cy.visit('/products');
    cy.get('[data-testid="error-message"]').should('be.visible');
  });
}); 