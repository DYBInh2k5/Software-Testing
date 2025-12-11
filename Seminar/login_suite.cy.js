/// <reference types="cypress" />
//describe() là Test Suite – nhóm tất cả test liên quan đến login.
describe('Login Function - Full Test Suite', () => {

  // before() chạy 1 lần duy nhất trước toàn bộ test → in log để biết test bắt đầu.
  before(() => {
    cy.log('🔹 Bắt đầu toàn bộ Test Suite')
  })
  //beforeEach() chạy trước mỗi test case, để truy cập lại trang login mỗi lần → đảm bảo môi trường sạch.
  beforeEach(() => {
    cy.visit('https://practicetestautomation.com/practice-test-login/')
  })
  //afterEach() chạy sau mỗi test → ghi log hoặc dọn dẹp.
  afterEach(function() {
  const testName = this.currentTest.title.replace(/[:/\\?<>|"]/g, '_')
  cy.screenshot(`screenshots/${testName}`)
  cy.log('✅ Test Case hoàn tất & chụp ảnh kết quả')
})
    //after() chạy sau khi toàn bộ suite kết thúc.
  after(() => {
    cy.log('🏁 Kết thúc toàn bộ Test Suite')
  })


  // === TEST CASES ===
  it('TC01 - Login đúng thông tin', () => {
    //it() là một test case riêng lẻ (ví dụ: đăng nhập đúng thông tin).
    cy.fixture('loginData').then((data) => {
      //cy.fixture('loginData') nạp dữ liệu từ file loginData.json.
      cy.get('#username').type(data.validUser.username)
      //cy.get('#username') chọn ô nhập username theo ID.
      //.type() mô phỏng việc người dùng gõ.
      cy.get('#password').type(data.validUser.password)
      cy.get('#submit').click()
      //.click() nhấn nút đăng nhập.
      cy.url().should('include', 'logged-in-successfully')
      //cy.url().should('include', 'logged-in-successfully') là assertion – xác nhận URL có chứa chuỗi này (nghĩa là login thành công).
      cy.contains('Congratulations').should('be.visible')
      //cy.contains('Congratulations') xác nhận có dòng chữ hiển thị đúng mong đợi.
    })
  })









  it('TC02 - Sai mật khẩu', () => {
    cy.fixture('loginData').then((data) => {
      cy.get('#username').type(data.invalidUser.username)
      cy.get('#password').type(data.invalidUser.password)
      cy.get('#submit').click()
      cy.contains('Your password is invalid!').should('be.visible')
    })
  })

  it('TC03 - Sai username', () => {
    cy.fixture('loginData').then((data) => {
      cy.get('#username').type(data.unknownUser.username)
      cy.get('#password').type(data.unknownUser.password)
      cy.get('#submit').click()
      cy.contains('Your username is invalid!').should('be.visible')
    })
  })

  it('TC04 - Username rỗng', () => {
    cy.get('#password').type('Password123')
    cy.get('#submit').click()
    cy.contains('Please enter username').should('be.visible')
  })

  it('TC05 - Password rỗng', () => {
    cy.get('#username').type('student')
    cy.get('#submit').click()
    cy.contains('Please enter password').should('be.visible')
  })

  it('TC06 - Cả hai trường rỗng', () => {
    cy.get('#submit').click()
    cy.contains('Please enter username').should('be.visible')
  })

  it('TC07 - Username có khoảng trắng', () => {
    cy.fixture('loginData').then((data) => {
      cy.get('#username').type('  ' + data.validUser.username + '  ')
      cy.get('#password').type(data.validUser.password)
      cy.get('#submit').click()
      cy.url().should('include', 'logged-in-successfully')
    })
  })

  it('TC08 - Username chứa ký tự đặc biệt', () => {
    cy.fixture('loginData').then((data) => {
      cy.get('#username').type('stu@dent!')
      cy.get('#password').type(data.validUser.password)
      cy.get('#submit').click()
      cy.contains('Your username is invalid!').should('be.visible')
    })
  })

  it('TC09 - Password có khoảng trắng', () => {
    cy.fixture('loginData').then((data) => {
      cy.get('#username').type(data.validUser.username)
      cy.get('#password').type('  ' + data.validUser.password + '  ')
      cy.get('#submit').click()
      cy.url().should('include', 'logged-in-successfully')
    })
  })

  it('TC10 - SQL Injection', () => {
    cy.fixture('loginData').then((data) => {
      cy.get('#username').type(data.sqlInjection.username)
      cy.get('#password').type(data.sqlInjection.password)
      cy.get('#submit').click()
      cy.contains('Your username is invalid!').should('be.visible')
    })
  })

  it('TC11 - XSS Injection', () => {
    cy.fixture('loginData').then((data) => {
      cy.get('#username').type(data.xssInjection.username)
      cy.get('#password').type(data.xssInjection.password)
      cy.get('#submit').click()
      cy.contains('Your username is invalid!').should('be.visible')
    })
  })

  it('TC12 - Username viết hoa', () => {
    cy.get('#username').type('STUDENT')
    cy.get('#password').type('Password123')
    cy.get('#submit').click()
    cy.url().should('include', 'logged-in-successfully')
  })

})



/// <reference types="cypress" />

describe('Login Function - Full Test Suite', () => {

  before(() => {
    cy.log('🔹 Bắt đầu toàn bộ Test Suite')
  })

  beforeEach(() => {
    cy.visit('https://practicetestautomation.com/practice-test-login/')
    cy.viewport(1280, 720) 
  })

  afterEach(function () {
    const testName = this.currentTest.title.replace(/[:/\\?<>|"]/g, '_')
    cy.screenshot(`screens/${testName}`)
    cy.log('✅ Test Case hoàn tất & chụp ảnh kết quả')
  })

  after(() => {
    cy.log('🏁 Kết thúc toàn bộ Test Suite')
  })



 
  // ============================================================
  //                       TEST CASES ,new
  // ============================================================

  it('TC01 - Login đúng thông tin', () => {
    cy.fixture('loginData').then((data) => {
      cy.get('#username')
        .focus()                       // focus vào input
        .type(data.validUser.username)  // gõ từng ký tự
        .should('have.value', data.validUser.username)

      cy.get('#password')
        .type(data.validUser.password)

      cy.get('#submit')
        .scrollIntoView()              // kéo tới nút
        .click()                       // click
        .should('be.enabled')

      cy.url().should('include', 'logged-in-successfully')
      cy.contains('Congratulations').should('be.visible')
    })
  })


  it('TC02 - Sai mật khẩu', () => {
    cy.fixture('loginData').then((data) => {
      cy.get('#username').type(data.invalidUser.username)
      cy.get('#password').type(data.invalidUser.password)
      cy.get('#submit').click()
      cy.contains('Your password is invalid!').should('be.visible')
    })
  })


  it('TC03 - Sai username', () => {
    cy.fixture('loginData').then((data) => {
      cy.get('#username').type(data.unknownUser.username)
      cy.get('#password').type(data.unknownUser.password)
      cy.get('#submit').click()
      cy.contains('Your username is invalid!').should('be.visible')
    })
  })


  it('TC04 - Username rỗng', () => {
    cy.get('#password').type('Password123')
    cy.get('#submit').click()
    cy.contains('Please enter username').should('be.visible')
  })


  it('TC05 - Password rỗng', () => {
    cy.get('#username').type('student')
    cy.get('#submit').click()
    cy.contains('Please enter password').should('be.visible')
  })


  it('TC06 - Cả hai trường rỗng', () => {
    cy.get('#submit')
      .trigger('mouseover')  // mô phỏng di chuột
      .click()

    cy.contains('Please enter username').should('be.visible')
  })


  it('TC07 - Username có khoảng trắng', () => {
    cy.fixture('loginData').then((data) => {
      cy.get('#username')
        .type('  ' + data.validUser.username + '  ')
        .blur()  // bỏ focus → hệ thống có thể validate

      cy.get('#password').type(data.validUser.password)
      cy.get('#submit').click()

      cy.url().should('include', 'logged-in-successfully')
    })
  })


  it('TC08 - Username chứa ký tự đặc biệt', () => {
    cy.get('#username').type('stu@dent!')
    cy.get('#password').type('Password123')
    cy.get('#submit').dblclick()  // double-click để minh họa một action
    cy.contains('Your username is invalid!').should('be.visible')
  })


  it('TC09 - Password có khoảng trắng', () => {
    cy.get('#username').type('student')
    cy.get('#password').type('   Password123   ')
    cy.get('#submit').click()

    cy.url().should('include', 'logged-in-successfully')
  })


  it('TC10 - SQL Injection', () => {
    cy.get('#username').type("' OR '1'='1")
    cy.get('#password').type("' OR '1'='1")
    cy.get('#submit').click()
    cy.contains('Your username is invalid!').should('be.visible')
  })


  it('TC11 - XSS Injection', () => {
    cy.get('#username').type("<script>alert('XSS')</script>")
    cy.get('#password').type("123")
    cy.get('#submit').click()
    cy.contains('Your username is invalid!').should('be.visible')
  })


  it('TC12 - Username viết hoa', () => {
    cy.get('#username')
      .type('STUDENT')

    cy.get('#password')
      .clear()         // xóa sạch input
      .type('Password123')

    cy.get('#submit').click()
    cy.url().should('include', 'logged-in-successfully')
  })

})

