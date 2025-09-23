describe('Login', () => {
  it('Login com dados válidos deve permitir entrada no sistema', () => {
    
    cy.intercept('POST', '/bff/login', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          token: 'fake-jwt-token',
          user: { username: 'douglas.willian', name: 'Douglas Willian' }
        }
      });
    }).as('loginRequest');

    cy.intercept('GET', '/bff/contas', (req) => {
      req.reply({
        statusCode: 200,
        body: [
          { id: 1, nome: 'Conta Corrente', saldo: 1500.0 },
        ]
      });
    }).as('contasRequest');

    
    cy.intercept('GET', '/bff/transferencias*', (req) => {
      req.reply({
        statusCode: 200,
        body: [
          { id: 1, valor: 200, descricao: 'Pix Maria' },
          { id: 2, valor: 350, descricao: 'Boleto Energia' }
        ]
      });
    }).as('transferenciasRequest');

    
    cy.visit('http://localhost:4000');

    cy.get('#username').click().type('douglas.willian');
    cy.get('#senha').click().type('123456');

    
    cy.get('#login-section > .btn').click();

    
    cy.wait('@loginRequest', { timeout: 20000 });
    cy.wait('@contasRequest', { timeout: 20000 });
    cy.wait('@transferenciasRequest', { timeout: 20000 });


    
    });
  });

  


    

