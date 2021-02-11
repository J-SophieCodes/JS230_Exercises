// function nodesToArr(node) {
//   node = node || document.body;
//   let childNodes = Array.from(node.children);

//   if (node.hasChildNodes()) {
//     return [node.nodeName, childNodes.map(node => nodesToArr(node))];
//   } else {
//     return [node.nodeName, childNodes];
//   }
// }

function nodesToArr(node) {
  node = node || document.body;
  return [node.nodeName, [...node.children].map(nodesToArr)];
}