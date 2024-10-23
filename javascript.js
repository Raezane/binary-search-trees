const node = function(value) {
  let data = value;
  let left = null;
  let right = null;
 
  return {data, left, right}
}

const tree = function(arr, sortedUniques) {
  let root = buildTree(arr, sortedUniques)

  return {root}
}

function findSuccessor(curr) {
  curr = curr.right;
  while (curr !== null && curr.left !== null) {
      curr = curr.left;
  }
  return curr;
}

function addToQueue(queue, current) {
   
  console.log(current.data)

  if (current.left !== null) {
    queue.push(current.left)
    }
 
  if (current.right !== null) {
    queue.push(current.right)
    }
 
  if (queue.length > 0) return addToQueue(queue, queue.shift())
 
  return
}  

function logger(node) {
  console.log(node.data)
}

function arrayPusher(node, arr) {
  arr.push(node.data)
}

function checkRootAndCallback(callback, root) {
  if (callback == undefined) throw new Error('Callback is required!')
  //check if binary tree is empty and if so, return
  if (root == null) return null
}

const insert = function(value) {
  let newNode = node(value)

  if (builtTree.root == null) {
    builtTree.root = newNode
    return
  }
  
  function recTree(root, newNode) {
    
    if (root.left == null && newNode.data < root.data) {
      root.left = newNode
      return
    }
      
    else if (root.right == null && newNode.data > root.data) {
      root.right = newNode
      return
    }

    if (newNode.data < root.data) {
      recTree(root.left, newNode)
    } else if (newNode.data > root.data) {
        recTree(root.right, newNode)
      }
    
  } recTree(builtTree.root, newNode)
}
 
const deleteItem = function(value) {

  function removalRec(root, value) {
    
    if (root == null) return root
    
    if (value < root.data) {
      root.left = removalRec(root.left, value)  
    } else if (value > root.data) {
        root.right = removalRec(root.right, value)  
      }
      
      else {
        if (root.right == null && root.left == null) return null
        
        if (root.left == null) return root.right
        if (root.right == null) return root.left
        
        else {
          let successor = findSuccessor(root)
          root.data = successor.data
          root.right = removalRec(root.right, successor.data);
          }
        
        
      } return root
  }
  removalRec(builtTree.root, value)
}

const find = function(value) {
  
  function findRec(root, value) {
    if (value > root.data) return findRec(root.right, value)
    else if (value < root.data) return findRec(root.left, value)
    else return root
    }
    
  return findRec(builtTree.root, value)
}

const levelOrder = function(callback) {
  checkRootAndCallback(callback, buildTree.root)
  
  let q = [];
  let current = builtTree.root

  //add the first single node and visit it
  q.push(current)
  current = q.shift()
  let levelOrderNodes = callback(q, current)
  return levelOrderNodes
}

const inOrder = function(callback) {
  checkRootAndCallback(callback, builtTree.root)

  let current = builtTree.root;

  //create an array for storing the values so that we may rebalance the tree if unbalanced
  let arr = []

  function inOrderRec(current) {
    if (current == null) return

    inOrderRec(current.left)
    callback(current, arr)
    inOrderRec(current.right)
  }
  
  inOrderRec(current)
  return arr
}

const preOrder = function(callback) {
  checkRootAndCallback(callback, builtTree.root)
  
  let current = builtTree.root;

  function preOrderRec(current) {
    if (current == null) return

    callback(current)
    preOrderRec(current.left)
    preOrderRec(current.right)
  }
    
  preOrderRec(current)
}

const postOrder = function(callback) {
  checkRootAndCallback(callback, builtTree.root)
  
  let current = builtTree.root;

  function postOrderRec(current) {
    if (current == null) return

    postOrderRec(current.left)
    postOrderRec(current.right)
    callback(current)
  }
    
  postOrderRec(current)
}
 
const height = function(node) {
  
  let current = node;

  function heightRec(current) {
    if (current == null) return -1
  
    let leftHeight = heightRec(current.left)

    let rightHeight = heightRec(current.right)

    return Math.max(leftHeight, rightHeight) +1
  }
    
  return heightRec(current)
  
}
 
const depth = function(node) {

  let current = builtTree.root;
  let depthVal = 0

  function depthRec(current, node, depthVal) {
    if (current == null) return -1
    if (current.data == node.data) return depthVal

    if (current.data > node.data) return depthRec(current.left, node, depthVal += 1)
    else if (current.data < node.data) return depthRec(current.right, node, depthVal += 1)
  }
    
  return depthRec(current, node, depthVal)
}
 
const isBalanced = function() {
  let current = builtTree.root;

  function isBalancedRec(current) {
    if (current == null) return true
  
    let leftHeight = height(current.left)

    let rightHeight = height(current.right)

    if (Math.abs(leftHeight - rightHeight) <= 1 &&
    isBalancedRec(current.right) && isBalancedRec(current.left)) return true

    return false
  }
    
  return isBalancedRec(current)
}

const rebalance = function() {
  if (isBalanced() == false) {
    //inOrder returns numbers in ascending order
    let unBalancedNums = inOrder(arrayPusher)
    builtTree = tree(unBalancedNums, true)
  } else throw new Error('Tree is already balanced!')
}



const buildTree = function(arr, uniquesAndSorted) {

  /* here we check if the given array is already sorted and contains only uniques. If not,
  then remove duplicates and sort */
  if (uniquesAndSorted == false) {
    // first remove duplicates in case there are any
    arr = [...new Set(arr)];
    // ..then sort them
    arr = arr.sort((a, b) => a - b)
  }

  function construct(arr, start, end) {

    if (start > end) return null

    let mid = Math.floor((start+end) / 2)
    let root = node(arr[mid])

    root.left = construct(arr, start, mid-1)
    root.right = construct(arr, mid+1, end)

    return root
  }

  let tree = construct(arr, 0, arr.length-1)
  return tree
}

function generateNums(num) {
  let numarr = []
  for (let i = 0; i < num; i++) {
    numarr.push(Math.floor(Math.random() * 100))
  }
  return numarr
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let builtTree = tree(generateNums(9), false)

prettyPrint(builtTree.root)

insert(105)
insert(101)
insert(110)
insert(100)
insert(109)
insert(109)

prettyPrint(builtTree.root)
console.log(isBalanced()) // returns false now that we inserted several numbers without balancing

rebalance()
prettyPrint(builtTree.root)
