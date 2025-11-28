from toanhoc import phanLoaiTamGiac

# === Nhóm 1: Tam giác đều (3 TC) ===
def test_deu_3_3_3(): 
    assert phanLoaiTamGiac(3, 3, 3) == "Tam giác đều"

def test_deu_10_10_10(): 
    assert phanLoaiTamGiac(10, 10, 10) == "Tam giác đều"

def test_deu_1_1_1(): 
    assert phanLoaiTamGiac(1, 1, 1) == "Tam giác đều"


# === Nhóm 2: Tam giác cân (7 TC) ===
def test_can_2_2_3(): 
    assert phanLoaiTamGiac(2, 2, 3) == "Tam giác cân"

def test_can_4_4_5(): 
    assert phanLoaiTamGiac(4, 4, 5) == "Tam giác cân"

def test_can_6_7_7(): 
    assert phanLoaiTamGiac(6, 7, 7) == "Tam giác cân"

def test_can_5_5_8(): 
    assert phanLoaiTamGiac(5, 5, 8) == "Tam giác cân"

def test_can_8_6_8(): 
    assert phanLoaiTamGiac(8, 6, 8) == "Tam giác cân"

def test_can_9_9_4(): 
    assert phanLoaiTamGiac(9, 9, 4) == "Tam giác cân"

def test_can_3_3_5(): 
    assert phanLoaiTamGiac(3, 3, 5) == "Tam giác cân"


# === Nhóm 3: Tam giác thường (7 TC) ===
def test_thuong_3_4_5(): 
    assert phanLoaiTamGiac(3, 4, 5) == "Tam giác thường"

def test_thuong_5_6_7(): 
    assert phanLoaiTamGiac(5, 6, 7) == "Tam giác thường"

def test_thuong_7_8_9(): 
    assert phanLoaiTamGiac(7, 8, 9) == "Tam giác thường"

def test_thuong_10_11_12(): 
    assert phanLoaiTamGiac(10, 11, 12) == "Tam giác thường"

def test_thuong_4_5_6(): 
    assert phanLoaiTamGiac(4, 5, 6) == "Tam giác thường"

def test_thuong_2_3_4(): 
    assert phanLoaiTamGiac(2, 3, 4) == "Tam giác thường"

def test_thuong_8_10_12(): 
    assert phanLoaiTamGiac(8, 10, 12) == "Tam giác thường"


# === Nhóm 4: Không phải tam giác (7 TC) ===
def test_khong_1_2_3(): 
    assert phanLoaiTamGiac(1, 2, 3) == "Không phải tam giác"

def test_khong_5_1_1(): 
    assert phanLoaiTamGiac(5, 1, 1) == "Không phải tam giác"

def test_khong_10_4_5(): 
    assert phanLoaiTamGiac(10, 4, 5) == "Không phải tam giác"

def test_khong_2_5_8(): 
    assert phanLoaiTamGiac(2, 5, 8) == "Không phải tam giác"

def test_khong_9_2_4(): 
    assert phanLoaiTamGiac(9, 2, 4) == "Không phải tam giác"

def test_khong_1_10_12(): 
    assert phanLoaiTamGiac(1, 10, 12) == "Không phải tam giác"

def test_khong_3_7_11(): 
    assert phanLoaiTamGiac(3, 7, 11) == "Không phải tam giác"


# === Nhóm 5: Dữ liệu không hợp lệ (6 TC) ===
def test_am_1_2_3(): 
    assert phanLoaiTamGiac(-1, 2, 3) == "Không phải tam giác"

def test_am_3_4_0(): 
    assert phanLoaiTamGiac(3, 4, 0) == "Không phải tam giác"

def test_am_0_0_0(): 
    assert phanLoaiTamGiac(0, 0, 0) == "Không phải tam giác"

def test_am_1_1_neg1(): 
    assert phanLoaiTamGiac(1, 1, -1) == "Không phải tam giác"

def test_float_3_3_4_2(): 
    assert phanLoaiTamGiac(3.0, 3.0, 4.2) == "Tam giác cân"

def test_large_100_100_150(): 
    assert phanLoaiTamGiac(100, 100, 150) == "Tam giác cân"
