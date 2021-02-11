function walk(node, callback) {
  callback(node);

  [].slice.call(node.childNodes).forEach(childNode => {
    walk(childNode, callback);
  });
}

let count = 0;

walk(document.querySelector('html'), node => {
  console.log(node.nodeName);
  count++;
});

console.log(count);