// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('startGame', () => {
  cy.contains('Commencer la partie').click(); // Clique sur le bouton pour commencer la partie
});

Cypress.Commands.add('abandonGame', () => {
  cy.contains('Abandonner').click(); // Clique sur abandonner
});

Cypress.Commands.add('visitStats', () => {
  cy.contains('Historique des parties').click(); // Accède à la page des statistiques
});

Cypress.Commands.add('typeWordInGrid', (word) => {
  cy.get('body').type(word); // Simule la saisie du mot avec le clavier
});
