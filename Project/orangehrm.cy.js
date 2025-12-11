describe('OrangeHRM Demo Test', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  });

  it('Đăng nhập thành công', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });

  it('Thêm nhân viên mới', () => {
    // Đăng nhập trước
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Đi tới module PIM
    cy.contains('PIM').click();
    cy.contains('Add Employee').click();

    // Nhập thông tin nhân viên
    cy.get('input[name="firstName"]').type('Cody');
    cy.get('input[name="lastName"]').type('Nguyen');
    cy.get('button[type="submit"]').click();

    // Xác nhận thêm thành công
    cy.contains('Personal Details').should('be.visible');
  });

  it('Tìm kiếm nhân viên vừa thêm', () => {
    // Đăng nhập
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Tìm trong danh sách nhân viên
    cy.contains('PIM').click();
    cy.get('input[placeholder="Type for hints..."]').type('Cody');
    cy.get('button[type="submit"]').click();

    // Kiểm tra kết quả
    cy.contains('Cody').should('be.visible');
  });

  it('Đăng xuất', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-userdropdown-tab').click();
    cy.contains('Logout').click();

    cy.url().should('include', '/auth/login');
  });
});
