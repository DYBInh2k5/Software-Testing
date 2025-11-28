import json
import pytest
from pathlib import Path
from sliding_window import sliding_window_probabilities

DATA_DIR = Path(__file__).parent.parent / "test_data"

def load_cases(filename):
    with open(DATA_DIR / filename, encoding="utf-8") as f:
        return json.load(f)

whitebox_cases = load_cases("whitebox_cases.json")
blackbox_cases = load_cases("blackbox_cases.json")

@pytest.mark.parametrize("case", whitebox_cases, ids=[c["id"] for c in whitebox_cases])
def test_whitebox_cases(case):
    probs, counter, total = sliding_window_probabilities(case["arrays"], case["n"])
    assert total == case["expected_total"], f"{case['id']} - {case['description']}"
    
    expected_counter = {eval(k): v for k, v in case["expected_windows"].items()}
    for window, count in expected_counter.items():
        assert counter[window] == count, f"{case['id']} window {window}"

@pytest.mark.parametrize("case", blackbox_cases, ids=[c["id"] for c in blackbox_cases])
def test_blackbox_cases(case):
    _, _, total = sliding_window_probabilities(case["arrays"], case["n"])
    assert total == case["expected_total"], f"{case['id']} - {case['description']}"