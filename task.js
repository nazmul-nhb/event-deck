const sample = [4, 2, 7, 1, 9];

function get2ndLargest(numbers) {
    if (!Array.isArray(numbers) || numbers.length < 2) {
        return undefined;
    }

    const arr = [...numbers]

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] < arr[j + 1]) {
                const temp = arr[j];

                arr[j] = arr[j + 1];

                arr[j + 1] = temp;
            }
        }
    }

    return arr[1]
}

console.info(get2ndLargest(sample))