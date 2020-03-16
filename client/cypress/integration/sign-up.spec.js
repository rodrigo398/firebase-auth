context("Sign Up", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    cy.visit("http://localhost:3000/signup");
  });
  it("signs up a user properly", () => {
    cy.get("[data-testid=email]")
      .type("testabcd@test.com")
      .should("have.value", "testabcd@test.com");
    cy.get("[data-testid=password]")
      .type("admin123")
      .should("have.value", "admin123");
    cy.server();
    cy.route("POST", "**/signupNewUser**", {
      kind: "identitytoolkit#SignupNewUserResponse",
      idToken: "FAKE_ID_TOKEN",
      email: "testabcd@test.com",
      refreshToken: "FAKE_REFRESH_TOKEN",
      expiresIn: "3600",
      localId: "FAKE_LOCAL_ID"
    }).as("signupNewUser");
    cy.route("POST", "**/getAccountInfo**", {
      kind: "identitytoolkit#GetAccountInfoResponse",
      users: [
        {
          localId: "ehkspaKe12XhPd2ONbDTa9GNXXp1",
          email: "testabcd@test.com",
          passwordHash: "UkVEQUNURUQ=",
          emailVerified: false,
          passwordUpdatedAt: 1575628173232,
          providerUserInfo: [
            {
              providerId: "password",
              federatedId: "testabcd@test.com",
              email: "testabcd@test.com",
              rawId: "testabcd@test.com"
            }
          ],
          validSince: "1575628173",
          lastLoginAt: "1575790802580",
          createdAt: "1575628173232",
          customAttributes: '{"admin":true}',
          lastRefreshAt: "2019-12-08T07:40:02.580Z"
        }
      ]
    }).as("getAccountInfo");
    cy.get("[data-testid=sign-up]").click();
  });
});
