/// <reference types="cypress" />

// ==========================================================
// ORANGEHRM END-TO-END AUTOMATION PROJECT
// ==========================================================
// Bao gồm toàn bộ các mục trong docx:
// - Login
// - Điều hướng PIM
// - Add Employee
// - Search Employee
// - Logout
// ==========================================================

describe('OrangeHRM Demo – Full End-to-End Test Suite', () => {

  // --------------------------------------------------------
  // BEFORE EACH: mở web & login
  // --------------------------------------------------------
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/');

    cy.fixture('user').then((user) => {
      cy.get('input[name="username"]').type(user.username);
      cy.get('input[name="password"]').type(user.password);
      cy.get('button[type="submit"]').click();

      cy.url().should('include', '/dashboard');
      cy.contains('Dashboard').should('be.visible');
    });
  });

  // --------------------------------------------------------
  // TC01 – Login thành công (đã được xử lý trong beforeEach)
  // --------------------------------------------------------
  it('TC01 – Xác nhận login thành công', () => {
    cy.log("Login thành công → Dashboard hiển thị");
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });

  // --------------------------------------------------------
  // TC03 – Điều hướng sang Module PIM
  // --------------------------------------------------------
  it('TC03 – Điều hướng đến module PIM thành công', () => {
    cy.contains('PIM').click();
    cy.url().should('include', '/pim');
    cy.contains('Employee Information').should('be.visible');
  });

  // --------------------------------------------------------
  // TC04 – Thêm nhân viên mới
  // --------------------------------------------------------
  it('TC04 – Thêm nhân viên mới thành công', () => {
    cy.contains('PIM').click();
    cy.contains('Add Employee').click();

    cy.get('input[name="firstName"]').type('Cody');
    cy.get('input[name="lastName"]').type('Nguyen');
    cy.get('button[type="submit"]').click();

    // Assertions quan trọng
    cy.contains('Personal Details').should('be.visible');
    cy.get('h6').should('contain.text', 'Cody Nguyen');
  });

  // --------------------------------------------------------
  // TC05 – Tìm kiếm nhân viên vừa thêm
  // --------------------------------------------------------
  it('TC05 – Tìm kiếm nhân viên "Cody Nguyen"', () => {
    cy.contains('PIM').click();

    cy.get('input[placeholder="Type for hints..."]').type('Cody');
    cy.contains('button', 'Search').click();

    cy.get('.oxd-table').should('exist');
    cy.contains('.oxd-table-cell', 'Cody').should('be.visible');
  });

  // --------------------------------------------------------
  // TC06 – Đăng xuất
  // --------------------------------------------------------
  it('TC06 – Đăng xuất thành công', () => {
    cy.get('.oxd-userdropdown-tab').click();
    cy.contains('Logout').click();

    cy.url().should('include', '/auth/login');
    cy.contains('Username').should('be.visible');
  });

});
