function removeDuplicates(arr) {
  const resultArr = [];
  let resultArrPointer = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1]) {
      continue;
    } else {
      resultArr[resultArrPointer] = arr[i];
      resultArrPointer++;
    }
  }

  return resultArr;
}

export { removeDuplicates };
