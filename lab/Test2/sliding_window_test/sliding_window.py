from collections import Counter

def sliding_window_probabilities(arrays, n):
    window_counter = Counter()
    total_windows = 0

    for arr in arrays:
        if len(arr) < n:
            continue
        for i in range(len(arr) - n + 1):
            window = tuple(arr[i:i + n])
            window_counter[window] += 1
            total_windows += 1

    probabilities = {
        window: count / total_windows
        for window, count in window_counter.items()
        if total_windows > 0
    }

    return probabilities, window_counter, total_windows