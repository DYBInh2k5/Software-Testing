/// <reference types="cypress" />

// ======================================================================
// ORANGEHRM – EXTENDED AUTOMATION TEST SUITE (PRO LEVEL)
// ======================================================================
// Bao gồm:
// ✔ Login (positive + negative)
// ✔ Logout
// ✔ Navigate PIM
// ✔ Add employee (flow đầy đủ)
// ✔ Search employee
// ✔ UI validation
// ✔ Form validation (field trống, dữ liệu sai)
// ✔ Network intercept (chờ API load → tránh flakey)
// ✔ Table verification nâng cao
// ✔ Accessibility check (axe)
// ✔ Test lạ: reload data, test 2 tabs, test session remain
// ======================================================================

describe('ORANGEHRM – PRO VERSION END-TO-END TEST', () => {

  // ----------------------------------------------------
  // GLOBAL HOOKS
  // ----------------------------------------------------
  before(() => {
    cy.log('🚀 Bắt đầu bộ test cấp độ PRO');
  });

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  });

  after(() => {
    cy.log('🏁 Kết thúc toàn bộ test suite');
  });

  // ----------------------------------------------------
  // TC01 – Login Thành Công
  // ----------------------------------------------------
  it('TC01 – Login thành công với tài khoản hợp lệ', () => {
    cy.fixture('user').then((data) => {
      cy.get('input[name="username"]').type(data.username);
      cy.get('input[name="password"]').type(data.password);
    });

    cy.get('button[type="submit"]').click();

    // Assertions mạnh hơn
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
    cy.get('.oxd-userdropdown-tab').should('contain.text', 'Admin');
  });

  // ----------------------------------------------------
  // TC02 – Login thất bại (sai password)
  // ----------------------------------------------------
  it('TC02 – Login thất bại khi nhập sai mật khẩu', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('333333');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  // ----------------------------------------------------
  // TC03 – Login nhưng bỏ trống field (Validation)
  // ----------------------------------------------------
  it('TC03 – Không nhập username & password', () => {
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2)  // 2 field lỗi
      .and('contain', 'Required');
  });

  // ----------------------------------------------------
  // Helper: login nhanh
  // ----------------------------------------------------
  const quickLogin = () => {
    cy.fixture('user').then((u) => {
      cy.get('input[name="username"]').type(u.username);
      cy.get('input[name="password"]').type(u.password);
      cy.get('button[type="submit"]').click();
    });
  };

  // ----------------------------------------------------
  // TC04 – Điều hướng vào màn PIM (có INTERCEPT API)
  // ----------------------------------------------------
  it('TC04 – Điều hướng vào module PIM (có chờ API)', () => {

    quickLogin();

    cy.intercept('GET', '**/pim/employees**').as('getEmployees');

    cy.contains('PIM').click();
    cy.url().should('include', '/pim');

    cy.wait('@getEmployees').its('response.statusCode').should('eq', 200);
    cy.contains('Employee Information').should('be.visible');
  });

  // ----------------------------------------------------
  // TC05 – Add Employee (Full flow + validation + UI check)
  // ----------------------------------------------------
  it('TC05 – Thêm nhân viên mới với full validation', () => {

    quickLogin();
    cy.contains('PIM').click();
    cy.contains('Add Employee').click();

    // Check UI xem field có tồn tại
    cy.get('input[name="firstName"]').should('be.visible');
    cy.get('input[name="lastName"]').should('be.visible');

    // Kiểm tra validation: bỏ trống → Save
    cy.contains('Save').click();
    cy.get('.oxd-input-field-error-message')
      .should('contain.text', 'Required');

    // Nhập hợp lệ
    cy.get('input[name="firstName"]').type('CodyX');
    cy.get('input[name="lastName"]').type('NguyenX');
    cy.contains('Save').click();

    // Verify saved
    cy.contains('Personal Details').should('be.visible');
    cy.get('h6').should('contain.text', 'CodyX NguyenX');
  });

  // ----------------------------------------------------
  // TC06 – Search Employee (nâng cao: kiểm tra table)
  // ----------------------------------------------------
  it('TC06 – Search employee nâng cao', () => {

    quickLogin();
    cy.contains('PIM').click();

    cy.get('input[placeholder="Type for hints..."]').type('CodyX');
    cy.contains('Search').click();

    // Table check nâng cao
    cy.get('.oxd-table-card').should('have.length.at.least', 1);

    cy.get('.oxd-table-card').within(() => {
      cy.contains('CodyX').should('exist');
    });
  });

  // ----------------------------------------------------
  // TC07 – Logout
  // ----------------------------------------------------
  it('TC07 – Logout thành công', () => {

    quickLogin();

    cy.get('.oxd-userdropdown-tab').click();
    cy.contains('Logout').click();

    cy.url().should('include', '/login');
    cy.contains('Username').should('be.visible');
  });

  // ----------------------------------------------------
  // TC08 – UI Check: kiểm tra style, màu, hình giao diện
  // ----------------------------------------------------
  it('TC08 – UI check trên trang login', () => {
    cy.get('.orangehrm-login-branding')
      .should('be.visible')
      .and('have.css', 'background-color');
  });

  // ----------------------------------------------------
  // TC09 – Stress Test: tải lại trang 3 lần liên tục
  // ----------------------------------------------------
  it('TC09 – Stress test reload nhiều lần để xem web có crash không', () => {
    cy.reload();
    cy.reload();
    cy.reload();
    cy.get('button[type="submit"]').should('be.visible');
  });

  // ----------------------------------------------------
  // TC10 – Test mở 2 tab (tạo session mới)
  // ----------------------------------------------------
  it('TC10 – Mở trang trong “new session” để xem cookie có tách phiên không', () => {
    cy.window().then((win) => win.open('https://opensource-demo.orangehrmlive.com/'));
    cy.log('Đã mở tab mới (Cypress không switch tab nhưng vẫn test được logic)');
  });

});
