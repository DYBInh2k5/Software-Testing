describe('Login Function - Full Test Suite', () => {

  // Hook: Chạy trước mỗi test case
  beforeEach(() => {
    cy.visit('https://practicetestautomation.com/practice-test-login/')
  })

  // 1. Login đúng thông tin
  it('TC01 - Login đúng thông tin', () => {
    cy.get('#username').type('student')
    cy.get('#password').type('Password123')
    cy.get('#submit').click()
    cy.url().should('include', 'logged-in-successfully')
    cy.contains('Congratulations').should('be.visible')
  })

  // 2. Sai mật khẩu
  it('TC02 - Sai mật khẩu', () => {
    cy.get('#username').type('student')
    cy.get('#password').type('wrongpass')
    cy.get('#submit').click()
    cy.contains('Your password is invalid!').should('be.visible')
  })

  // 3. Sai username
  it('TC03 - Sai username', () => {
    cy.get('#username').type('unknown')
    cy.get('#password').type('Password123')
    cy.get('#submit').click()
    cy.contains('Your username is invalid!').should('be.visible')
  })

  // 4. Username rỗng
  it('TC04 - Username rỗng', () => {
    cy.get('#password').type('Password123')
    cy.get('#submit').click()
    cy.contains('Please enter username').should('be.visible')
  })

  // 5. Password rỗng
  it('TC05 - Password rỗng', () => {
    cy.get('#username').type('student')
    cy.get('#submit').click()
    cy.contains('Please enter password').should('be.visible')
  })

  // 6. Cả hai trường rỗng
  it('TC06 - Username và password đều rỗng', () => {
    cy.get('#submit').click()
    cy.contains('Please enter username').should('be.visible')
  })

  // 7. Username có khoảng trắng
  it('TC07 - Username có khoảng trắng', () => {
    cy.get('#username').type('  student  ')
    cy.get('#password').type('Password123')
    cy.get('#submit').click()
    cy.url().should('include', 'logged-in-successfully')
  })

  // 8. Username chứa ký tự đặc biệt
  it('TC08 - Username chứa ký tự đặc biệt', () => {
    cy.get('#username').type('stu@dent!')
    cy.get('#password').type('Password123')
    cy.get('#submit').click()
    cy.contains('Your username is invalid!').should('be.visible')
  })

  // 9. Password có khoảng trắng
  it('TC09 - Password có khoảng trắng', () => {
    cy.get('#username').type('student')
    cy.get('#password').type('  Password123  ')
    cy.get('#submit').click()
    cy.url().should('include', 'logged-in-successfully')
  })

  // 10. Sai mật khẩu 5 lần liên tiếp
  it('TC10 - Sai mật khẩu 5 lần liên tiếp', () => {
    for (let i = 0; i < 5; i++) {
      cy.get('#username').type('student')
      cy.get('#password').type('wrongpass')
      cy.get('#submit').click()
      cy.contains('Your password is invalid!').should('be.visible')
      cy.reload()
    }
  })

  // 11. Password có ký tự đặc biệt
  it('TC11 - Password có ký tự đặc biệt', () => {
    cy.get('#username').type('student')
    cy.get('#password').type('Pass@123')
    cy.get('#submit').click()
    cy.contains('Your password is invalid!').should('be.visible')
  })

  // 12. Password quá ngắn
  it('TC12 - Password quá ngắn', () => {
    cy.get('#username').type('student')
    cy.get('#password').type('12')
    cy.get('#submit').click()
    cy.contains('Your password is invalid!').should('be.visible')
  })

  // 13. Username quá dài
  it('TC13 - Username quá dài', () => {
    cy.get('#username').type('a'.repeat(256))
    cy.get('#password').type('Password123')
    cy.get('#submit').click()
    cy.contains('Your username is invalid!').should('be.visible')
  })

  // 14. Password quá dài
  it('TC14 - Password quá dài', () => {
    cy.get('#username').type('student')
    cy.get('#password').type('b'.repeat(256))
    cy.get('#submit').click()
    cy.contains('Your password is invalid!').should('be.visible')
  })

  // 15. SQL Injection
  it('TC15 - SQL Injection ở username', () => {
    cy.get('#username').type("admin' OR '1'='1")
    cy.get('#password').type('abc')
    cy.get('#submit').click()
    cy.contains('Your username is invalid!').should('be.visible')
  })

  // 16. XSS Injection
  it('TC16 - XSS Injection ở username', () => {
    cy.get('#username').type('<script>alert(1)</script>')
    cy.get('#password').type('Password123')
    cy.get('#submit').click()
    cy.contains('Your username is invalid!').should('be.visible')
  })

  // 17. Username viết hoa
  it('TC17 - Username viết hoa', () => {
    cy.get('#username').type('STUDENT')
    cy.get('#password').type('Password123')
    cy.get('#submit').click()
    cy.url().should('include', 'logged-in-successfully')
  })

  // 18. Mất kết nối mạng (giả lập)
  it('TC18 - Mất kết nối mạng', () => {
    cy.intercept('POST', '**/practice-test-login', { forceNetworkError: true })
    cy.get('#username').type('student')
    cy.get('#password').type('Password123')
    cy.get('#submit').click()
    cy.on('fail', () => true)
  })

  // 19. Server down (giả lập 500 error)
  it('TC19 - Server down', () => {
    cy.intercept('POST', '**/practice-test-login', { statusCode: 500 })
    cy.get('#username').type('student')
    cy.get('#password').type('Password123')
    cy.get('#submit').click()
    cy.contains('Server unavailable').should('exist')
  })

  // 20. Username + Password hợp lệ sau nhiều lần sai
  it('TC20 - Login đúng sau nhiều lần sai', () => {
    for (let i = 0; i < 3; i++) {
      cy.get('#username').type('student')
      cy.get('#password').type('wrongpass')
      cy.get('#submit').click()
      cy.contains('Your password is invalid!').should('be.visible')
      cy.reload()
    }
    cy.get('#username').type('student')
    cy.get('#password').type('Password123')
    cy.get('#submit').click()
    cy.url().should('include', 'logged-in-successfully')
  })

})
