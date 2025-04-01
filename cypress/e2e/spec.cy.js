describe('Tests de l\'application MATRUX', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/'); // localhost par défaut
  });

  it('Vérifie que l\'application se charge bien', () => {
    cy.get('h1').should('contain', 'MATRUX'); // Vérifie que le titre est présent
  });

  it('Vérifie que le bouton "lancer une partie" mène à la saisie de mots', () => {
    cy.contains('Commencer la partie').click(); // Clique sur le bouton
    cy.url().should('include', '/PageJeux'); // Vérifie que l'URL a changé
    cy.contains('TROUVE LE MOT !').should('exist');// Montre et indique qu'il doit trouver le mot
  });

  it('Vérifie qu\'un mot invalide affiche une erreur', () => {
    cy.contains('Commencer la partie').click(); // Démarre la partie
    cy.typeWordInGrid('zzzzz'); // Tape le mot 'zzzzz'
    cy.get('body').type('{enter}');
    cy.contains('Votre mot n\'est pas dans le dictionnaire').should('exist');
});

  it('Vérifie qu\'un mot valide est accepté', () => {
  cy.contains('Commencer la partie').click(); // Démarre la partie
  
  // Tape le mot lettre par lettre via le clavier
  cy.typeWordInGrid('jante'); // Custom command pour taper 'jante'
  
  // Valide le mot avec la touche "Entrée"
  cy.get('body').type('{enter}');
  cy.get('.error-message').should('not.exist');
});

  it('Vérifie que le bouton "abandonner" mène à la page de défaite', () => {
    cy.contains('Commencer la partie').click(); 
    cy.contains('Abandonner').click(); 
    cy.url().should('include', '/PageAbandon');
  });

 it('Vérifie que les statistiques s\'affichent', () => {
    cy.contains('Historique des parties').click(); 
    cy.url().should('include', '/PageHistorique'); 
   cy.get('h1').should('contain', 'Statistique'); // Vérifie qu'on soit dans les stats
  });
});

