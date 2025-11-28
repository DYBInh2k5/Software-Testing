import pytest
from toanhoc import phanLoaiTamGiac

# --- Test 1: Sai giá trị mong đợi ---
# (Tam giác đều 3-3-3 mà mong đợi là 'Tam giác cân' => fail)
def test_fail_sai_gia_tri():
    assert phanLoaiTamGiac(3, 3, 3) == "Tam giác cân"


# --- Test 2: Sai logic ---
# (Hàm sẽ trả 'Tam giác thường' nhưng ta cố tình so với sai giá trị)
def test_fail_sai_logic():
    assert phanLoaiTamGiac(3, 4, 5) == "Tam giác cân"


# --- Test 3: Giá trị biên bị viết sai ---
# (1, 2, 3 không phải tam giác, nhưng ta ghi nhầm 'Tam giác thường')
def test_fail_boundary_value():
    assert phanLoaiTamGiac(1, 2, 3) == "Tam giác thường"


# --- Test 4: Test ép lỗi bằng pytest.fail() ---
def test_fail_force_by_pytest():
    pytest.fail("Cố tình tạo lỗi để kiểm tra báo cáo của pytest")


# --- Test 5: Test ngoại lệ không đúng như mong đợi ---
# (Hàm phanLoaiTamGiac không ném lỗi, nhưng ta mong đợi có)
def test_fail_raises_error():
    with pytest.raises(ValueError):
        phanLoaiTamGiac(-1, 2, 3)
