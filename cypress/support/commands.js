Cypress.Commands.add('fillMandatoryFieldsAndSubmit', ()=> {
        cy.get('#firstName').type('Tainá')
        cy.get('#lastName').type('Wandermurem Conti')
        cy.get('#email').type('tainawandermurem@hotmail.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
})
