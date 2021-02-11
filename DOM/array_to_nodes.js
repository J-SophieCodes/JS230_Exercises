// function arrayToNodes(nodes) {
//   document.body.replaceWith(createNodes(nodes));
// }

// function createNodes(nodes) {
//   if (typeof nodes[0] === 'string') {
//     let child = document.createElement(nodes[0]);
//     child.append(...createNodes(nodes[1]));
//     return child;
//   } else {
//     return nodes.map(createNodes);
//   }
// }


function arrayToNodes([nodeName, children]) {
  let parent = document.createElement(nodeName);

  children.forEach(child => {
    parent.appendChild(arrayToNodes(child));
  });

  return parent;
}