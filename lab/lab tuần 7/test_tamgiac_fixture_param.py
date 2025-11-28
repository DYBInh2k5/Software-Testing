import pytest
from toanhoc import phanLoaiTamGiac

# === Fixture cung cấp dữ liệu test ===
@pytest.fixture
def du_lieu_tam_giac():
    # Mỗi phần tử: (a, b, c, expected)
    return [
        # Nhóm 1: Tam giác đều (3)
        (3, 3, 3, "Tam giác đều"),
        (10, 10, 10, "Tam giác đều"),
        (5.5, 5.5, 5.5, "Tam giác đều"),

        # Nhóm 2: Tam giác cân (7)
        (4, 4, 5, "Tam giác cân"),
        (6, 6, 7, "Tam giác cân"),
        (8, 8, 5, "Tam giác cân"),
        (9, 7, 9, "Tam giác cân"),
        (12, 10, 12, "Tam giác cân"),
        (3.0, 3.0, 4.2, "Tam giác cân"),
        (100, 100, 150, "Tam giác cân"),

        # Nhóm 3: Tam giác thường (7)
        (3, 4, 5, "Tam giác thường"),
        (5, 6, 7, "Tam giác thường"),
        (7, 8, 9, "Tam giác thường"),
        (4, 5, 6, "Tam giác thường"),
        (8, 10, 12, "Tam giác thường"),
        (10, 11, 12, "Tam giác thường"),
        (2.5, 3.5, 4.5, "Tam giác thường"),

        # Nhóm 4: Không phải tam giác (7)
        (1, 2, 3, "Không phải tam giác"),
        (2, 5, 8, "Không phải tam giác"),
        (10, 4, 5, "Không phải tam giác"),
        (5, 1, 1, "Không phải tam giác"),
        (3, 7, 11, "Không phải tam giác"),
        (9, 2, 4, "Không phải tam giác"),
        (1, 10, 12, "Không phải tam giác"),

        # Nhóm 5: Dữ liệu không hợp lệ (6)
        (-1, 2, 3, "Không phải tam giác"),
        (0, 0, 0, "Không phải tam giác"),
        (3, 4, 0, "Không phải tam giác"),
        (1, 1, -1, "Không phải tam giác"),
        (5, -5, 5, "Không phải tam giác"),
        (-3, -4, -5, "Không phải tam giác"),
    ]


# === Test chính: chạy 30 bộ dữ liệu ===
@pytest.mark.parametrize("index", range(30))
def test_phan_loai_tam_giac(du_lieu_tam_giac, index):
    a, b, c, expected = du_lieu_tam_giac[index]
    result = phanLoaiTamGiac(a, b, c)
    assert result == expected
