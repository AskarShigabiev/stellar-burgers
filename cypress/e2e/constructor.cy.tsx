const baseUrl = 'http://localhost:4000/#/';

// мокирование данных и перехват запроса
beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients'); // Подгружаем ингредиенты
    cy.intercept('POST', 'api/auth/login', { fixture: 'user.json' }).as('userLogin'); // Авторизация пользователя
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('userAuth'); // Проверка данных пользователя
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder'); // Создание заказа

    cy.setCookie(
        'accessToken', 
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDk2MjI4ZDgyOWJlMDAxYzc3NWJkMSIsImlhdCI6MTcyOTk5NDg3NiwiZXhwIjoxNzI5OTk2MDc2fQ._igVV1fUMsWMK9bIc7H1xByua2efBFwq5BuP4mkr5cA'
    );
    cy.visit(baseUrl);
});

// очистка
afterEach(() => {
    cy.clearLocalStorage();
    cy.clearAllCookies();
})

describe('загрузка конструктора бургера', function () {
    it('страница сервиса доступна и ингредиенты загружены', function () {
        cy.visit(baseUrl);
        cy.wait('@getIngredients');
        cy.get('li').should('have.length', 15);
    });
})

describe('функционал конструктора бургера', function () {
    it('добавить булку', function () {
        cy.get('[data-cy=top-bun]').contains('Выберите булки');
        cy.get('[data-cy=bottom-bun]').contains('Выберите булки');

        cy.get('[data-cy=643d69a5c3f7b9001cfa093c]').children('button').click(); // Добавляем булку
        cy.get('.constructor-element_pos_top').contains('Краторная булка N-200i (верх)');
        cy.get('.constructor-element_pos_bottom').contains('Краторная булка N-200i (низ)');
    });

    it('добавить содержимое', function () {
        cy.get('[data-cy=empty-ingredients-list]').should('exist');
        cy.get('[data-cy=643d69a5c3f7b9001cfa093f]').children('button').click(); // Добавляем мясо
        cy.get('.constructor-element__row').contains('Мясо бессмертных моллюсков Protostomia');
        cy.get('[data-cy=643d69a5c3f7b9001cfa094a]').children('button').click(); // Добавляем сыр
        cy.get('.constructor-element__row').contains('Сыр с астероидной плесенью');
        cy.get('.constructor-element__row').should('have.length', 2);
    });
})

describe('работа модальных окон', function () {
    it('работа модального окна ингредиента', function () {

        // мясо
        cy.get('#modals').should('be.empty');
        cy.get('[data-cy=643d69a5c3f7b9001cfa093f]').children('a').click();
        cy.get('#modals').should('be.not.empty');
        cy.get('#modals').find('h3').contains('Мясо бессмертных моллюсков Protostomia');
        cy.get('#modals').find('button').click();
        cy.get('#modals').should('be.empty');

        // сыр
        cy.get('#modals').should('be.empty');
        cy.get('[data-cy=643d69a5c3f7b9001cfa094a]').children('a').click();
        cy.get('#modals').should('be.not.empty');
        cy.get('#modals').find('h3').contains('Сыр с астероидной плесенью');
        cy.get('#modals').find('button').click();
        cy.get('#modals').should('be.empty');
    });

    it('закртиые модального окна ингредиента(оверлей)', function () {
        cy.get('#modals').should('be.empty');
        cy.get('[data-cy=643d69a5c3f7b9001cfa093f]').children('a').click();
        cy.get('#modals').should('be.not.empty');
        cy.get('[data-cy=modal-overlay]').click({ force: true });
        cy.get('#modals').should('be.empty');

        cy.get('#modals').should('be.empty');
        cy.get('[data-cy=643d69a5c3f7b9001cfa094a]').children('a').click();
        cy.get('#modals').should('be.not.empty');
        cy.get('[data-cy=modal-overlay]').click({ force: true });
        cy.get('#modals').should('be.empty');
    });
})

describe('функционал создания заказа', function() {    
    it('создание и проверка заказа', function() {
        cy.get('[data-cy=643d69a5c3f7b9001cfa093c]').children('button').click();
        cy.get('[data-cy=643d69a5c3f7b9001cfa093f]').children('button').click();
        cy.get('[data-cy=643d69a5c3f7b9001cfa094a]').children('button').click();

        cy.get('[data-cy=order-button]').click();
        cy.wait('@userAuth');
        cy.wait('@createOrder');

        cy.get('#modals').find('h2').contains('57706');
        cy.get('#modals').find('button').click();

        cy.get('.constructor-element__row').should('have.length', 0); 
    })
})
