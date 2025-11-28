import unittest
from toanhoc import phanLoaiTamGiac

class TestPhanLoaiTamGiac(unittest.TestCase):

    # Tam giác đều
    def test_tam_giac_deu(self):
        self.assertEqual(phanLoaiTamGiac(3, 3, 3), "Tam giác đều")

    # Tam giác cân
    def test_tam_giac_can(self):
        self.assertEqual(phanLoaiTamGiac(4, 4, 5), "Tam giác cân")

    # Tam giác thường
    def test_tam_giac_thuong(self):
        self.assertEqual(phanLoaiTamGiac(3, 4, 5), "Tam giác thường")

    # Không phải tam giác
    def test_khong_phai_tam_giac(self):
        self.assertEqual(phanLoaiTamGiac(1, 2, 3), "Không phải tam giác")

    # Cạnh âm hoặc 0
    def test_canh_khong_hop_le(self):
        self.assertEqual(phanLoaiTamGiac(-1, 4, 5), "Không phải tam giác")
        self.assertEqual(phanLoaiTamGiac(0, 3, 3), "Không phải tam giác")

if __name__ == "__main__":
    unittest.main()
