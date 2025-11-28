import pytest
from toanhoc import phanLoaiTamGiac

# === Các test PASS ===
def test_pass_tam_giac_deu():
    assert phanLoaiTamGiac(3, 3, 3) == "Tam giác đều"

def test_pass_tam_giac_can():
    assert phanLoaiTamGiac(4, 4, 5) == "Tam giác cân"

def test_pass_tam_giac_thuong():
    assert phanLoaiTamGiac(3, 4, 5) == "Tam giác thường"

def test_pass_khong_phai_tam_giac():
    assert phanLoaiTamGiac(1, 2, 3) == "Không phải tam giác"

def test_pass_am():
    assert phanLoaiTamGiac(-2, 3, 3) == "Không phải tam giác"


# === Các test FAIL (cố tình) ===
# Sai mong đợi – lẽ ra "Tam giác đều" nhưng ghi "Tam giác cân"
def test_fail_sai_gia_tri():
    assert phanLoaiTamGiac(5, 5, 5) == "Tam giác cân"

# Sai logic – 3-4-5 là tam giác thường, ta ghi nhầm "Tam giác đều"
def test_fail_sai_logic():
    assert phanLoaiTamGiac(3, 4, 5) == "Tam giác đều"

# Cố tình ép lỗi bằng pytest.fail()
def test_fail_co_tinh():
    pytest.fail("Cố tình tạo lỗi để minh họa test FAIL trong pytest")
