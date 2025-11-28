# Bài 01.02 - Triangle Problem

# Nhập cạnh tam giác
a = float(input("Nhập cạnh a: "))
b = float(input("Nhập cạnh b: "))
c = float(input("Nhập cạnh c: "))

# Kiểm tra điều kiện tam giác
if a <= 0 or b <= 0 or c <= 0:
    print("❌ Not a triangle (cạnh phải > 0)")
elif (a + b <= c) or (a + c <= b) or (b + c <= a):
    print("❌ Not a triangle (không thỏa điều kiện 2 cạnh cộng lớn hơn cạnh còn lại)")
else:
    # Phân loại tam giác
    if a == b == c:
        print("✅ Equilateral triangle (Tam giác đều)")
    elif a == b or a == c or b == c:
        print("✅ Isosceles triangle (Tam giác cân)")
    else:
        print("✅ Scalene triangle (Tam giác thường)")
