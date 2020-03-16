context("Login", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    cy.visit("http://localhost:3000");
  });

  it("lets you in when correct credentials are given", () => {
    cy.get("[data-testid=email]")
      .type("test@test.com")
      .should("have.value", "test@test.com");

    cy.get("[data-testid=password]")
      .type("admin123")
      .should("have.value", "admin123");

    cy.get("[data-testid=sign-in]").click();

    cy.location("pathname").should("eq", "/");
  });

  it("shows an error message when incorrect credentials are given", () => {
    cy.get("[data-testid=email]")
      .type("invalid@example.com")
      .should("have.value", "invalid@example.com");

    cy.get("[data-testid=password]")
      .type("testing")
      .should("have.value", "testing");

    cy.get("[data-testid=error-message]").should("not.be.visible");

    cy.get("[data-testid=sign-in]").click();

    cy.location("pathname").should("eq", "/login");

    cy.get("[data-testid=error-message]").should("be.visible");
  });
});
