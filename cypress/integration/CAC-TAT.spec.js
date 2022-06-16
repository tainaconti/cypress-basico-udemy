describe('Central de Atendimento ao Cliente TAC', ()=> {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
        })
    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'apenas um testee,apenas um teste,apenas um teste,apenas um teste,apenas um teste'
        cy.get('#firstName').type('Tainá')
        cy.get('#lastName').type('Wandermurem Conti')
        cy.get('#email').type('tainawandermurem@hotmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })
    it('campo telefone continua vazia quando preenchido com valor não-numérico', ()=> {
        cy.get('#phone')
            .type('ABCDJFJD')
            .should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=> {
        cy.get('#firstName').type('Tainá')
        cy.get('#lastName').type('Wandermurem Conti')
        cy.get('#email').type('tainawandermurem@hotmail.com')
        cy.get('#open-text-area').type('teste')
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible','eq','Valide os campos obrigatórios')
    })
    it('preenche e limpa ps campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Tainá')
            .should('have.value', 'Tainá')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Conti')
            .should('have.value', 'Conti')
            .clear()
            .should('have.value','')
        cy.get('#email')
            .type('tainawandermurem@hotmail.com')
            .should('have.value', 'tainawandermurem@hotmail.com')
            .clear()
            .should('have.value','')
        cy.get('#phone')
            .type('111111111111')
            .should('have.value', '111111111111')
            .clear()
            .should('have.value','')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=> {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible','eq','Valide os campos obrigatórios')
    })
    it('envia o formulário com sucesso usanso um comando customizado', ()=> {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (Youtube) por seu texto', () => {
        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) pelo seu valor(value)', ()=> {
        cy.get('#product').select('mentoria')
            .should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) pelo seu índice', ()=> {
        cy.get('#product').select(1)
            .should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', ()=> {
        cy.get('input[type="radio"][value="feedback"]').check()
            .should('have.value','feedback')
    })

    it('marca cada tipo de atendimento', ()=> {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })
    it('marca ambos os checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(($input)=> {
            expect($input[0].files[0].name).eq('example.json')
        })
    })
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
            .should(($input)=> {
                expect($input[0].files[0].name).eq('example.json')
        })
    })
    it('seleciona um arquivo utilizando uma fixture oara a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(($input)=> {
                expect($input[0].files[0].name).eq('example.json')
        })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    it('acessa a pagina da política de privacidade removendo o target e então clicando no link', () =>{
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })
})
