# Bài 01.01 - Verification of Sum

# Nhập 2 số thực
a = float(input("Nhập số a: "))
b = float(input("Nhập số b: "))

# Tính tổng
c = a + b

# Kiểm tra c == a
if c == a:
    print("✅ c is equal to a.")
else:
    print("❌ c is not equal to a.")
