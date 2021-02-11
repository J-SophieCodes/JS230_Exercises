function walk(node, callback) {
  callback(node);

  [].slice.call(node.childNodes).forEach(childNode => {
    walk(childNode, callback);
  });
}

function childNodes(id) {
  let startNode = document.getElementById(id);
  let directChildNodes = startNode.childNodes.length;
  let indirectChildNodes = 0;

  walk(startNode, node => {
    if (node === startNode || node.parentNode === startNode) return;
    indirectChildNodes++;
  });


  // [].slice.call(startNode.childNodes).forEach(childNode => {
  //   walk(childNode, node => {
  //     indirectChildNodes += node.childNodes.length;
  //   });
  // });

  return [directChildNodes, indirectChildNodes];
}

console.log(childNodes(1));  // [9, 12]
console.log(childNodes(4));  // [3, 1]
console.log(childNodes(9));  // [1, 1]