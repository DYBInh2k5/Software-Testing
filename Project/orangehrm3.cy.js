/// <reference types="cypress" />

// ======================================================================
// ORANGEHRM – FINAL SEMESTER PROJECT (MERGED SUITE)
// ======================================================================
// Bao gồm:
// ✔ Login (positive / negative / validation)
// ✔ Navigate PIM (with API intercept)
// ✔ Add Employee (full flow + validation + UI checking)
// ✔ Search Employee (table verify nâng cao)
// ✔ Logout
// ✔ UI visual check
// ✔ Stress test (reload 3 lần)
// ✔ Special test (multi-tab / session)
// ======================================================================

describe('ORANGEHRM – FULL MERGED TEST SUITE FOR FINAL PROJECT', () => {

  // ----------------------------------------------------
  // GLOBAL HOOKS
  // ----------------------------------------------------
  before(() => {
    cy.log('🚀 Start OrangeHRM Testing Project – Merged Suite');
  });

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  });

  after(() => {
    cy.log('🏁 Completed Full Test Execution');
  });

  // =====================================================================
  // SECTION 1 — LOGIN TESTS
  // =====================================================================

  it('TC01 – Login thành công với tài khoản hợp lệ', () => {
    cy.fixture('user').then((data) => {
      cy.get('input[name="username"]').type(data.username);
      cy.get('input[name="password"]').type(data.password);
    });

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
    cy.get('.oxd-userdropdown-tab').should('contain.text', 'Admin');
  });

  it('TC02 – Login thất bại khi nhập sai password', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('111111');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('TC03 – Login nhưng bỏ trống username/password → báo lỗi Required', () => {
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2)
      .and('contain', 'Required');
  });

  // Helper login for internal tests
  const quickLogin = () => {
    cy.fixture('user').then((u) => {
      cy.get('input[name="username"]').type(u.username);
      cy.get('input[name="password"]').type(u.password);
      cy.get('button[type="submit"]').click();
    });
  };

  // =====================================================================
  // SECTION 2 — PIM MODULE
  // =====================================================================

  it('TC04 – Điều hướng đến module PIM (có intercept API)', () => {
    quickLogin();

    cy.intercept('GET', '**/pim/employees**').as('getEmployees');

    cy.contains('PIM').click();
    cy.url().should('include', '/pim');

    cy.wait('@getEmployees').its('response.statusCode').should('eq', 200);
    cy.contains('Employee Information').should('be.visible');
  });

  // =====================================================================
  // SECTION 3 — ADD EMPLOYEE
  // =====================================================================

  it('TC05 – Add Employee: validation + full flow', () => {
    quickLogin();

    cy.contains('PIM').click();
    cy.contains('Add Employee').click();

    // UI check
    cy.get('input[name="firstName"]').should('be.visible');
    cy.get('input[name="lastName"]').should('be.visible');

    // Validation trước khi nhập
    cy.contains('Save').click();
    cy.get('.oxd-input-field-error-message').should('contain', 'Required');

    // Nhập dữ liệu hợp lệ
    cy.get('input[name="firstName"]').type('CodyX');
    cy.get('input[name="lastName"]').type('NguyenX');

    cy.contains('Save').click();

    // Xác nhận thêm thành công
    cy.contains('Personal Details').should('be.visible');
    cy.get('h6').should('contain.text', 'CodyX NguyenX');
  });

  // =====================================================================
  // SECTION 4 — SEARCH EMPLOYEE
  // =====================================================================

  it('TC06 – Search Employee nâng cao (verify table)', () => {
    quickLogin();
    cy.contains('PIM').click();

    cy.get('input[placeholder="Type for hints..."]').type('CodyX');
    cy.contains('Search').click();

    cy.get('.oxd-table-card').should('have.length.at.least', 1);
    cy.get('.oxd-table-card').within(() => {
      cy.contains('CodyX').should('exist');
    });
  });

  // =====================================================================
  // SECTION 5 — LOGOUT
  // =====================================================================

  it('TC07 – Logout', () => {
    quickLogin();

    cy.get('.oxd-userdropdown-tab').click();
    cy.contains('Logout').click();

    cy.url().should('include', '/auth/login');
    cy.contains('Username').should('be.visible');
  });

  // =====================================================================
  // SECTION 6 — UI VISUAL + SPECIAL TESTS
  // =====================================================================

  it('TC08 – UI check trang login (branding hiển thị đúng)', () => {
    cy.get('.orangehrm-login-branding')
      .should('be.visible')
      .and('have.css', 'background-color');
  });

  it('TC09 – Stress Test: reload 3 lần', () => {
    cy.reload();
    cy.reload();
    cy.reload();

    cy.get('button[type="submit"]').should('be.visible');
  });

  it('TC10 – Kiểm tra mở tab mới (session tách riêng)', () => {
    cy.window().then((win) => win.open('https://opensource-demo.orangehrmlive.com/'));
    cy.log('Đã mở tab mới để kiểm tra cookie/session hành xử thế nào');
  });

});
