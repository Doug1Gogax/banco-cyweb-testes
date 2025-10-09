describe("Transferências", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("credenciais").then((credenciais) => {
      cy.get("#username").click().type(credenciais.valido.usuario);
      cy.get("#senha").click().type(credenciais.valido.senha);
    });

    cy.intercept("GET", "**/bff/contas").as("carregarContas");

    cy.contains("button", "Entrar").click();   
    
    cy.wait(500)
    
  });
  
  it("Deve transferir quando informo dados e valor válidos", () => {
      cy.get('label[for="conta-origem"]').parent().as('campo-conta-origem');
      cy.get('@campo-conta-origem').click()
      cy.get('@campo-conta-origem').contains('Maria Oliveira').click()
      

      cy.get('label[for="conta-destino"]').parent().as('campo-conta-destino');
      cy.get('@campo-conta-destino').click()
      cy.get('@campo-conta-destino').contains('João da Silva').click()

      cy.get('#valor').click().type('11')

      cy.contains('button', 'Transferir').click()
      
      cy.contains('Transferência realizada').should('be.visible');
      
    
  });

  
});






