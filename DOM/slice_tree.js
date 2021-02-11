function sliceTree(parentId, childId) {
  let parent = document.getElementById(parentId);
  let child = document.getElementById(childId);

  if ([parent, child].every(withinBody) && child.closest(`[id="${parentId}"]`)) {
    return tagsBetween(child, parent);
  }

  return undefined;
}

function withinBody(node) {
  return node && node.closest('body');
}

function tagsBetween(node, target) {
  let list = [node.nodeName];
  return node === target ?
    list :
    tagsBetween(node.parentElement, target).concat(list);
}

sliceTree(1, 4);
// ["ARTICLE", "HEADER", "SPAN", "A"]
sliceTree(1, 76);
// undefined
sliceTree(2, 5);
// undefined
sliceTree(5, 4);
// undefined
sliceTree(1, 23);
// ["ARTICLE", "FOOTER"]
sliceTree(1, 22);
// ["ARTICLE", "MAIN", "SECTION", "P", "SPAN", "STRONG", "A"]
sliceTree(11, 19);
// ["SECTION", "P", "SPAN", "STRONG", "A"]