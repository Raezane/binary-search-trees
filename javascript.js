const node = function(value) {
  let data = value;
  let left = null;
  let right = null;
  
  return {data, left, right}
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

function checkRootAndCallback(callback, root) {
  if (callback == undefined) throw new Error('Callback is required!')
  //check if binary tree is empty and if so, return
  if (root == null) return null
}

const tree = function(arr) {
  let root = buildTree(arr)
  
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
    removalRec(root, value)
  }
  
  const find = function(value) {
   
    function findRec(root, value) {
      if (value > root.data) return findRec(root.right, value)
      else if (value > root.data) return findRec(root.left, value)
      else return root
      }
     
    return findRec(root, value)
  }

  const levelOrder = function(callback) {
    checkRootAndCallback(callback, root)
    
    let q = [];
    let current = root

    //add the first single node and visit it
    q.push(current)
    current = q.shift()
    let levelOrderNodes = callback(q, current)
    return levelOrderNodes
  }
  
  const inOrder = function(callback) {
    checkRootAndCallback(callback, root)
  
    let current = root;
  
    function inOrderRec(current) {
      if (current == null) return 

      inOrderRec(current.left)
      callback(current)
      inOrderRec(current.right)
    }
    
    inOrderRec(current)
  }
  
  const preOrder = function(callback) {
    checkRootAndCallback(callback, root)
    
    let current = root;
  
    function preOrderRec(current) {
      if (current == null) return 

      callback(current)
      preOrderRec(current.left)
      preOrderRec(current.right)
    }
      
    preOrderRec(current)
  }
  
  const postOrder = function(callback) {
    checkRootAndCallback(callback, root)
    
    let current = root;
  
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
  }
  
  const isBalanced = function() {
  }
  
  const rebalance = function() {
  }
  
  return {
    root, 
    deleteItem, 
    find, 
    levelOrder, 
    inOrder, 
    preOrder, 
    postOrder, 
    height
    }
  }


  const buildTree = function(arr) {
    // first remove duplicates in case there are any
    let onlyUniques = [...new Set(arr)];
    // ..then sort them
    let sortedArr = onlyUniques.sort((a, b) => a - b)

    function construct(arr, start, end) {

      if (start > end) return null

      let mid = Math.floor((start+end) / 2)
      let root = node(arr[mid])

      root.left = construct(arr, start, mid-1)
      root.right = construct(arr, mid+1, end)

      return root
    }

    let tree = construct(sortedArr, 0, sortedArr.length-1)
    return tree
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

let builtTree = tree([19, 5, 8, 9, 2, 15, 11, 12, 99, 27, 22, 67, 1, 86, 6])
prettyPrint(builtTree.root)
builtTree.height(builtTree.root)