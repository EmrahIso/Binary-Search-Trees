import { removeDuplicates, mergeSort } from './mergeSort.js';
import { Node } from './nodeClass.js';

class Tree {
  // array must be sorted
  constructor(arr = []) {
    this.arr = arr;
    this.root = this.buildTree(removeDuplicates(mergeSort(this.arr)));
  }

  // Create BST
  buildTree(arr) {
    const start = 0;
    const end = arr.length - 1;

    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);

    const rootNode = new Node(arr[mid]);

    rootNode.leftChild = this.buildTree(arr.slice(start, mid));
    rootNode.rightChild = this.buildTree(arr.slice(mid + 1, end + 1));

    return rootNode;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      this.prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.leftChild !== null) {
      this.prettyPrint(
        node.leftChild,
        `${prefix}${isLeft ? '    ' : '│   '}`,
        true,
      );
    }
  }

  // Insert by value
  insert(value, currentNode = this.root) {
    if (currentNode === null) {
      this.root = new Node(value);
      return;
    }

    const newNode = new Node(value);

    let parentNode = null;

    while (currentNode !== null) {
      parentNode = currentNode;
      if (currentNode.data > value) {
        currentNode = currentNode.leftChild;
      } else if (currentNode.data < value) {
        currentNode = currentNode.rightChild;
      } else {
        return;
      }
    }

    if (parentNode.data > value) {
      parentNode.leftChild = newNode;
    } else if (parentNode.data < value) {
      parentNode.rightChild = newNode;
    }
    return;
  }

  // Delete by value
  deleteItem(value, currentNode = this.root) {
    let targetNode = null;
    let targetParentNode = null;

    while (true) {
      if (currentNode === null) {
        return null;
      } else if (currentNode.data === value) {
        targetNode = currentNode;
        currentNode = this.root;
        break;
      } else if (currentNode.data < value) {
        targetParentNode = currentNode;
        currentNode = currentNode.rightChild;
      } else if (currentNode.data > value) {
        targetParentNode = currentNode;
        currentNode = currentNode.leftChild;
      }
    }

    // We have 3 cases

    if (targetNode.leftChild === null && targetNode.rightChild === null) {
      // If that leaf node is root

      if (targetNode.data === this.root.data) {
        this.root = null;
        return;
      }

      // If we are deleting leaf node
      while (true) {
        if (currentNode === null) {
          return;
        } else if (value < currentNode.data) {
          if (
            currentNode.leftChild !== null &&
            currentNode.leftChild.leftChild === null &&
            currentNode.leftChild.rightChild === null
          ) {
            currentNode.leftChild = null;
          } else {
            currentNode = currentNode.leftChild;
          }
        } else if (value > currentNode.data) {
          if (
            currentNode.rightChild !== null &&
            currentNode.rightChild.leftChild === null &&
            currentNode.rightChild.rightChild === null
          ) {
            currentNode.rightChild = null;
          } else {
            currentNode = currentNode.rightChild;
          }
        }
      }
    } else if (
      targetNode.leftChild === null ||
      targetNode.rightChild === null
    ) {
      // If we are deleting item that has single child

      const targetSideChild =
        targetNode.rightChild === null
          ? targetNode.leftChild
          : targetNode.rightChild;

      // If that item node is root

      if (targetNode.data === this.root.data) {
        this.root = targetSideChild;
        return;
      }

      while (true) {
        if (currentNode === null) {
          return;
        } else if (value < currentNode.data) {
          if (currentNode.leftChild.data === value) {
            currentNode.leftChild = targetSideChild;
            return;
          } else {
            currentNode = currentNode.leftChild;
          }
        } else if (value > currentNode.data) {
          if (currentNode.rightChild.data === value) {
            currentNode.rightChild = targetSideChild;
            return;
          } else {
            currentNode = currentNode.rightChild;
          }
        }
      }
    } else if (
      targetNode.leftChild !== null &&
      targetNode.rightChild !== null
    ) {
      // If we are deleting item with 2 child nodes
      let nextBiggest = null;
      let parentOfNextBiggest = targetNode;

      let pointerNode = targetNode.rightChild;

      while (true) {
        if (pointerNode.leftChild === null) {
          nextBiggest = pointerNode;
          break;
        } else {
          parentOfNextBiggest = pointerNode;
          pointerNode = pointerNode.leftChild;
        }
      }

      // Now delete targeted Node

      // Assign new left child and new right child for the nextBiggest Node
      if (targetNode.rightChild.data === nextBiggest.data) {
        nextBiggest.leftChild = targetNode.leftChild;

        parentOfNextBiggest.rightChild = null;
      } else {
        parentOfNextBiggest.leftChild = nextBiggest.rightChild;

        nextBiggest.rightChild = targetNode.rightChild;
        nextBiggest.leftChild = targetNode.leftChild;
      }

      // If targeted Node is root Node

      if (targetNode.data === this.root.data) {
        this.root = nextBiggest;
        return;
      }

      if (targetParentNode.rightChild.data === targetNode.data) {
        targetParentNode.rightChild = nextBiggest;
      } else if (targetParentNode.leftChild.data === targetNode.data) {
        targetParentNode.leftChild = nextBiggest;
      }
    }
  }

  // Find Node by a value
  find(value) {
    let currentNode = this.root;

    while (true) {
      if (currentNode === null) {
        return null;
      } else if (currentNode.data === value) {
        return currentNode;
      } else if (currentNode.data < value) {
        currentNode = currentNode.rightChild;
      } else if (currentNode.data > value) {
        currentNode = currentNode.leftChild;
      }
    }
  }

  // Level Order Traversal
  levelOrder(callback, currentNode = this.root) {
    // Traverse tree in breadth-first approach
    if (typeof callback !== 'function')
      throw Error('Callback function must be provided!');

    if (currentNode === null) return;

    const queue = [];

    queue.unshift(currentNode);

    while (queue.length > 0) {
      let currentTarget = queue[queue.length - 1];

      // Process data
      callback(currentTarget);

      // enqueue
      if (currentTarget.leftChild !== null)
        queue.unshift(currentTarget.leftChild);

      if (currentTarget.rightChild !== null)
        queue.unshift(currentTarget.rightChild);

      // dequeue
      queue.pop();
    }
  }

  // Depth first Traversal

  inOrder(callback, currentNode = this.root) {
    if (typeof callback !== 'function')
      throw Error('Callback function must be provided!');

    // push
    if (currentNode.leftChild !== null)
      this.inOrder(callback, currentNode.leftChild);

    // Process data
    callback(currentNode);

    if (currentNode.rightChild !== null)
      this.inOrder(callback, currentNode.rightChild);
  }

  preOrder(callback, currentNode = this.root) {
    if (typeof callback !== 'function')
      throw Error('Callback function must be provided!');

    // Process data
    callback(currentNode);

    // push
    if (currentNode.leftChild !== null)
      this.preOrder(callback, currentNode.leftChild);

    if (currentNode.rightChild !== null)
      this.preOrder(callback, currentNode.rightChild);
  }

  postOrder(callback, currentNode = this.root) {
    if (typeof callback !== 'function')
      throw Error('Callback function must be provided!');

    // push
    if (currentNode.leftChild !== null)
      this.postOrder(callback, currentNode.leftChild);

    if (currentNode.rightChild !== null)
      this.postOrder(callback, currentNode.rightChild);

    // Process data
    callback(currentNode);
  }

  // Height of the given Node
  height(node) {
    if (node === null) return -1;

    let heightOfLeftSubtree = this.height(node.leftChild);
    let heightOfRightSubtree = this.height(node.rightChild);

    return heightOfLeftSubtree >= heightOfRightSubtree
      ? heightOfLeftSubtree + 1
      : heightOfRightSubtree + 1;
  }

  // Depth of given node
  depth(node, currentNode = this.root) {
    if (currentNode === null) return;

    if (node.data === currentNode.data) return 0;

    if (node.data > currentNode.data) {
      return 1 + this.depth(node, currentNode.rightChild);
    } else {
      return 1 + this.depth(node, currentNode.leftChild);
    }
  }

  // Check if tree is balanced
  isBalanced() {
    let heightOfLeftSubtree = this.height(this.root.leftChild);
    let heightOfRightSubtree = this.height(this.root.rightChild);

    if (
      heightOfLeftSubtree === heightOfRightSubtree ||
      heightOfLeftSubtree + 1 === heightOfRightSubtree ||
      heightOfLeftSubtree === heightOfRightSubtree + 1
    ) {
      return true;
    }

    return false;
  }

  // Rebalance an unbalanced tree
  rebalance() {
    let newSortedArray = [];

    this.inOrder((node) => newSortedArray.push(node.data));

    this.root = this.buildTree(newSortedArray);
  }
}

export { Tree };
