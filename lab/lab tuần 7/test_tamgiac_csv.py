import csv
import pytest
from toanhoc import phanLoaiTamGiac

# === Đọc dữ liệu CSV ===
def doc_du_lieu_csv(path):
    data = []
    with open(path, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            a = float(row["a"])
            b = float(row["b"])
            c = float(row["c"])
            expected = row["expected"].strip()
            data.append((a, b, c, expected))
    return data

# === Fixture cung cấp dữ liệu ===
@pytest.fixture(scope="module")
def du_lieu_tu_csv():
    path = r"D:\HSU\2531Semester 1(2025-2026)\software testing\lab\lab tuần 7\Lab tuần 8.csv"
    return doc_du_lieu_csv(path)

# === Test 30 test case ===
@pytest.mark.parametrize("index", range(30))
def test_phan_loai_tam_giac(du_lieu_tu_csv, index):
    a, b, c, expected = du_lieu_tu_csv[index]
    result = phanLoaiTamGiac(a, b, c)
    assert result == expected
