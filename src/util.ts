/*
 * @Author: your name
 * @Date: 2020-01-18 23:38:14
 * @LastEditTime: 2020-01-29 21:03:07
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\util.ts
 */
export function shuffle(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        let rIndex = Math.floor(Math.random() * (i + 1));
        // 打印交换值
        let temp = arr[rIndex];
        arr[rIndex] = arr[i];
        arr[i] = temp;
    }
    return arr;
}