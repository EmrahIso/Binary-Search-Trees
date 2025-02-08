import { Tree } from './treeFactory.js';

function arrayOfRandomNumbers(arrayLength) {
  let arr = [];

  for (let i = 0; i < arrayLength; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }

  return arr;
}

const myTree = new Tree(arrayOfRandomNumbers(16)); // Parameter for arrayOfRandomNumbers function specifies the length of the array that function will produce.

// Test it out

myTree.prettyPrint(myTree.root);

console.log('---------------------');
console.log('isBalanced:', myTree.isBalanced()); // should be true

console.log('---------------------');
console.log('PreOrder: ');
console.log(myTree.preOrder((node) => console.log(node.data)));

console.log('---------------------');
console.log('InOrder: ');
console.log(myTree.inOrder((node) => console.log(node.data)));

console.log('---------------------');
console.log('PostOrder: ');
console.log(myTree.postOrder((node) => console.log(node.data)));

myTree.insert(103);
myTree.insert(111);
myTree.insert(109);

console.log('---------------------');
console.log('isBalanced:', myTree.isBalanced()); // should be false

console.log('---------------------');
console.log('Rebalance');
myTree.rebalance();

console.log('---------------------');
console.log('isBalanced:', myTree.isBalanced()); // should be true

console.log('---------------------');
console.log('PreOrder: ');
console.log(myTree.preOrder((node) => console.log(node.data)));

console.log('---------------------');
console.log('InOrder: ');
console.log(myTree.inOrder((node) => console.log(node.data)));

console.log('---------------------');
console.log('PostOrder: ');
console.log(myTree.postOrder((node) => console.log(node.data)));
