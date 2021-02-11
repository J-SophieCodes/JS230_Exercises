function domTreeTracer(id) {
  let element = document.getElementById(id);
  let parent = element.parentElement;
  let tree = [childrenNames(parent)];

  return parent.id ? tree.concat(domTreeTracer(parent.id)) : tree;
}

function childrenNames(parent) {
  return Array.from(parent.children).map(({nodeName}) => nodeName);
}


domTreeTracer(1);
// [["ARTICLE"]]
domTreeTracer(2);
// [["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]
domTreeTracer(22);
// [ ["A"],
//   ["STRONG"],
//   ["SPAN", "SPAN"],
//   ["P", "P"],
//   ["SECTION", "SECTION"],
//   ["HEADER", "MAIN", "FOOTER"],
//   ["ARTICLE"]
// ]