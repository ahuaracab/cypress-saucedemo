/// <reference types="cypress" />

describe('Saucedemo tests', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('Login with valid user', () => {

        cy.get('[data-test=username]')
            .type('standard_user')
        cy.get('[data-test=password]')
            .type('secret_sauce')
        cy.get('[data-test=login-button]')
            .click()

        cy.get('.title').should('include.text', 'Products')
    })

    it('Login with invalid user', () => {

        cy.get('[data-test=username]')
            .type('standard_user')
        cy.get('[data-test=password]')
            .type('wrong_password')
        cy.get('[data-test=login-button]')
            .click()

        cy.get('[data-test=error]').should('include.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('Logout from the home page', () => {
        cy.get('[data-test=username]')
            .type('standard_user')
        cy.get('[data-test=password]')
            .type('secret_sauce')
        cy.get('[data-test=login-button]')
            .click()
        cy.get('.title').should('include.text', 'Products')
        cy.get('#react-burger-menu-btn')
            .click()
        cy.get('#logout_sidebar_link')
            .click()
        cy.get('[data-test=login-button]').should('be.visible')
    })

    it('Sort products by Price (low to high)', () => {
        cy.get('[data-test=username]')
            .type('standard_user')
        cy.get('[data-test=password]')
            .type('secret_sauce')
        cy.get('[data-test=login-button]')
            .click()
        cy.get('.title').should('include.text', 'Products')
        cy.get('[data-test=product_sort_container]')
            .select('Price (low to high)')
        cy.get('.active_option').should('include.text','Price (low to high)')
    })

    it('Add multiple items to the shopping cart', () => {
        cy.get('[data-test=username]')
            .type('standard_user')
        cy.get('[data-test=password]')
            .type('secret_sauce')
        cy.get('[data-test=login-button]')
            .click()
        cy.get('.title').should('include.text', 'Products')

        cy.get('[data-test*=add]').click({ multiple: true })
        
        cy.get('[data-test*=remove]').should('have.length', 6)
    })

    it('Add the specific item to the shopping cart', () => {
        cy.get('[data-test=username]')
            .type('standard_user')
        cy.get('[data-test=password]')
            .type('secret_sauce')
        cy.get('[data-test=login-button]')
            .click()
        cy.get('.title').should('include.text', 'Products')

        cy.get('[data-test*=add]').eq(4).click()
        cy.get('.shopping_cart_link').click()
        cy.get('.inventory_item_name').should('include.text', 'Sauce Labs Onesie')
    })

    it.only('Complete a purchase', () => {
        cy.get('[data-test=username]')
            .type('standard_user')
        cy.get('[data-test=password]')
            .type('secret_sauce')
        cy.get('[data-test=login-button]')
            .click()
        cy.get('.title').should('include.text', 'Products')

        cy.get('[data-test*=add]').eq(4).click()
        cy.get('.shopping_cart_link').click()
        cy.get('.inventory_item_name').should('include.text', 'Sauce Labs Onesie')
        cy.get('[data-test=checkout]').click()
        cy.get('.title').should('include.text', 'Checkout: Your Information')
        cy.get('[data-test=firstName]').type('Angelo')
        cy.get('[data-test=lastName]').type('Huaraca')
        cy.get('[data-test=postalCode]').type('15307')
        cy.get('[data-test=continue]').click()
        cy.get('.inventory_item_name').should('include.text', 'Sauce Labs Onesie')
        cy.get('[data-test=finish]').click()
        cy.get('.title').should('include.text', 'Checkout: Complete!')
    
    })

})
