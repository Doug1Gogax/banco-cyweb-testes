describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it.only("Login com dados válidos deve permitir entrada no sistema", () => {
    cy.intercept("POST", "/bff/login", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          token: "fake-jwt-token",
          user: { username: "douglas.willian", name: "Douglas Willian" },
        },
      });
    }).as("loginRequest");

    cy.intercept("GET", "/bff/contas", (req) => {
      req.reply({
        statusCode: 200,
        body: [{ id: 1, nome: "Conta Corrente", saldo: 1500.0 }],
      });
    }).as("contasRequest");

    cy.fixture("credenciais").then((credenciais) => {
      cy.get("#username").click().type(credenciais.valido.usuario);
      cy.get("#senha").click().type(credenciais.valido.senha);
    });
    cy.contains("button", "Entrar").click();
  });

  it("Login com dados inválidos deve exibir mensagem de erro", () => {
    cy.fixture("credenciais").then((credenciais) => {
      cy.get("#username").click().type(credenciais.invalido.usuario);
      cy.get("#senha").click().type(credenciais.invalido.senha);
    });

    cy.contains("button", "Entrar").click();

    //cy.get('.toast').should('have,text', 'Erro no login.Tente novamente')
  });
});
