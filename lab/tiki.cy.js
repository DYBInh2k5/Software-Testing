// Tiki SSD Search Test - Cypress
// File: cypress/e2e/tiki-ssd-search.cy.js

describe('Tiki SSD Search với bộ lọc', () => {
  beforeEach(() => {
    // Truy cập trang tìm kiếm SSD
    cy.visit('https://tiki.vn/search?q=ssd')
    cy.wait(3000) // Chờ trang load
  })

  it('Tìm SSD với bộ lọc: 1TB, TOP DEAL, giá ≤ 2tr, chuẩn M.2', () => {
    
    // 1. Áp dụng bộ lọc Dung lượng 1TB
    cy.get('body').then(($body) => {
      // Tìm phần tử chứa bộ lọc dung lượng (có thể cần điều chỉnh selector)
      if ($body.find('[data-filter-name*="Dung lượng"], [class*="capacity"], [class*="storage"]').length > 0) {
        cy.contains('[data-filter-name*="Dung lượng"], [class*="capacity"], [class*="storage"]', '1TB')
          .click({ force: true })
      } else {
        // Fallback: tìm bằng text
        cy.contains('1TB').click({ force: true })
      }
    })
    
    cy.wait(2000)

    // 2. Áp dụng bộ lọc TOP DEAL
    cy.get('body').then(($body) => {
      if ($body.find('[data-filter-name*="Ưu đãi"], [class*="deal"], [class*="promotion"]').length > 0) {
        cy.contains('[data-filter-name*="Ưu đãi"], [class*="deal"], [class*="promotion"]', 'TOP DEAL')
          .click({ force: true })
      } else {
        cy.contains('TOP DEAL').click({ force: true })
      }
    })
    
    cy.wait(2000)

    // 3. Áp dụng bộ lọc Giá ≤ 2,000,000₫
    cy.get('body').then(($body) => {
      // Tìm ô nhập giá cao nhất
      const priceInput = $body.find('input[placeholder*="đến"], input[max-price], [class*="max-price"]')
      if (priceInput.length > 0) {
        cy.wrap(priceInput).first().clear().type('2000000')
        
        // Tìm nút áp dụng giá
        cy.contains('Áp dụng', 'Áp dụng giá', 'OK').click({ force: true })
      } else {
        // Alternative: click vào khoảng giá
        cy.contains('Dưới 2 triệu').click({ force: true })
      }
    })
    
    cy.wait(2000)

    // 4. Áp dụng bộ lọc Chuẩn M.2
    cy.get('body').then(($body) => {
      if ($body.find('[data-filter-name*="Chuẩn"], [class*="interface"], [class*="connection"]').length > 0) {
        cy.contains('[data-filter-name*="Chuẩn"], [class*="interface"], [class*="connection"]', 'M.2')
          .click({ force: true })
      } else if ($body.text().includes('M.2')) {
        cy.contains('M.2').click({ force: true })
      }
      // Nếu không tìm thấy M.2, có thể trang không có bộ lọc này
    })
    
    cy.wait(3000) // Chờ kết quả load

    // 5. Kiểm tra kết quả (kiểm tra cơ bản)
    cy.get('[data-view-id*="product"], .product-item, [class*="product"]').should('have.length.gt', 0)
    
    // 6. Lấy và hiển thị thông tin sản phẩm
    cy.get('[data-view-id*="product"], .product-item').first().within(() => {
      // Lấy tên sản phẩm
      cy.get('[class*="name"], [class*="title"], h3').invoke('text').then((productName) => {
        cy.log(`Sản phẩm đầu tiên: ${productName}`)
        // Kiểm tra có chứa từ khóa M.2 không
        expect(productName.toLowerCase()).to.include('m.2')
      })
      
      // Lấy giá
      cy.get('[class*="price"], [class*="final"]').invoke('text').then((priceText) => {
        cy.log(`Giá: ${priceText}`)
        // Chuyển đổi giá sang số
        const price = parseFloat(priceText.replace(/[^\d]/g, ''))
        expect(price).to.be.at.most(2000000)
      })
    })

    // 7. Chụp ảnh màn hình để tài liệu
    cy.screenshot('tiki-ssd-filtered-results')
  })

  it('Reset bộ lọc bằng nút Xóa tất cả', () => {
    // Áp dụng một số bộ lọc trước
    cy.contains('1TB').click({ force: true }).wait(1000)
    cy.contains('TOP DEAL').click({ force: true }).wait(1000)
    
    // Nhấp nút Xóa tất cả
    cy.contains('Xóa tất cả', 'Xoá tất cả').click({ force: true })
    
    cy.wait(2000)
    
    // Kiểm tra các bộ lọc đã được reset
    cy.contains('1TB').should('not.have.class', 'active')
    cy.contains('TOP DEAL').should('not.have.class', 'active')
    
    cy.screenshot('tiki-ssd-reset-filters')
  })
})

// File cấu hình hỗ trợ tiếng Việt và xử lý timeout
// Thêm vào cypress.config.js nếu cần
/*
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false, // Để vượt qua CORS nếu cần
  },
});
*/