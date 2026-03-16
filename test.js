// const string = "hello world";
// const string2 = "pizza";

// function test(haystack, needle) {
//   const windowSize = needle.length;
//   for (let i = 0; i <= haystack.length - windowSize; i++) {
//     const window = haystack.slice(i, i + windowSize);
//     if (window === needle) {
//       return true;
//     }
//   }
//   return false;
// }

// console.log(test(string, string2));

function reverseString(str) {
  let left = 0;
  let right = str.length - 1;
  const arr = str.split("");
  while (left < right) {
    const temp = arr[left]; //h
    arr[left] = arr[right]; //0
    arr[right] = temp; //h
    left++;
    right--;
  }
  return arr.join("");
}

// let reversed = "";
// for (let i = str.length - 1; i >= 0; i--) {
//   reversed += str[i];
// }
// return reversed;

console.log(reverseString("hello world"));
