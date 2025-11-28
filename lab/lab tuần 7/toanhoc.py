def tinhTong(x, y):
    """Hàm cộng hai số."""
    return x + y


def tinhChia(x, y):
    """Hàm chia hai số, kiểm tra chia cho 0."""
    if y == 0:
        return "Không thể chia cho 0"
    return x / y


def phanLoaiTamGiac(a, b, c):
    """Phân loại tam giác theo độ dài 3 cạnh."""
    # Kiểm tra dữ liệu đầu vào hợp lệ
    if a <= 0 or b <= 0 or c <= 0:
        return "Không phải tam giác"

    # Kiểm tra điều kiện tạo thành tam giác
    if a + b <= c or a + c <= b or b + c <= a:
        return "Không phải tam giác"

    # Phân loại
    if a == b == c:
        return "Tam giác đều"
    elif a == b or b == c or a == c:
        return "Tam giác cân"
    else:
        return "Tam giác thường"
