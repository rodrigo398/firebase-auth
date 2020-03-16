context("Autocomplete", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    cy.visit("http://localhost:3000");

    cy.get("[data-testid=email]")
      .type("test@test.com")
      .should("have.value", "test@test.com");

    cy.get("[data-testid=password]")
      .type("admin123")
      .should("have.value", "admin123");

    cy.get("[data-testid=sign-in]").click();
  });

  it("works properly", () => {
    cy.get("[data-testid=search-input]")
      .type("sydney harbour bridge")
      .should("have.value", "sydney harbour bridge");

    cy.get("[data-testid=suggestions-list]")
      .children()
      .then(els => els.length)
      .should("be.at.least", 1);

    cy.get("[data-testid=suggestions-list] :first-child").click();

    cy.get("[data-testid=suggestions-list]")
      .children()
      .should("not.exist");
  });
});
