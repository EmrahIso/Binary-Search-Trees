function mergeSort(arr) {
  let firstPointer = 0;
  let lastPointer = arr.length - 1;

  let midPointer = (lastPointer + 1) / 2;

  let leftHalf = arr.slice(firstPointer, midPointer);
  let rightHalf = arr.slice(midPointer, lastPointer + 1);

  if (firstPointer < lastPointer) {
    leftHalf = mergeSort(leftHalf);
    rightHalf = mergeSort(rightHalf);
  }

  return merge(leftHalf, rightHalf);
}

function merge(leftHalf, rightHalf) {
  let finalArray = [];

  let leftPointer = 0;
  let rightPointer = 0;
  let finalPointer = 0;

  while (
    leftPointer <= leftHalf.length - 1 &&
    rightPointer <= rightHalf.length - 1
  ) {
    if (leftHalf[leftPointer] <= rightHalf[rightPointer]) {
      finalArray[finalPointer++] = leftHalf[leftPointer++];
    } else {
      finalArray[finalPointer++] = rightHalf[rightPointer++];
    }
  }

  for (; leftPointer <= leftHalf.length - 1; leftPointer++) {
    finalArray[finalPointer++] = leftHalf[leftPointer];
  }

  for (; rightPointer <= rightHalf.length - 1; rightPointer++) {
    finalArray[finalPointer++] = rightHalf[rightPointer];
  }

  return finalArray;
}

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

export { mergeSort, removeDuplicates };
