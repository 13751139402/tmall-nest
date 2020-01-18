export function shuffle(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        let rIndex = Math.floor(Math.random() * (i + 1));
        // 打印交换值
        // console.log(i, rIndex);
        let temp = arr[rIndex];
        arr[rIndex] = arr[i];
        arr[i] = temp;
    }
    return arr;
}