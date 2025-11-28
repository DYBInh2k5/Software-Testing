from toanhoc import tinhTong, tinhChia

# === Kiểm thử hàm tinhTong ===
def test_TC01_TongAm():
    assert tinhTong(-10, -20) == -30

def test_TC02_TongZero():
    assert tinhTong(-10, 10) == 0

def test_TC03_TongDuong():
    assert tinhTong(10, 5) == 15


# === Kiểm thử hàm tinhChia ===
def test_TC04_ChiaBinhThuong():
    assert tinhChia(10, 2) == 5

def test_TC05_ChiaThapPhan():
    assert tinhChia(3, 2) == 1.5

def test_TC06_ChiaCho0():
    assert tinhChia(10, 0) == "Không thể chia cho 0"
