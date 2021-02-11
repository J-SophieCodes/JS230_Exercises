function colorGeneration(nth) {
  clearClass('generation-color');

  let nthGen = [];

  for (let gen = 1; gen <= nth; gen++) {
    nthGen = gen === 1 ? getChildren([document.body]) : getChildren(nthGen);
  }

  colorAll(nthGen);
}

function clearClass(className) {
  document.querySelectorAll(`.${className}`)
    .forEach(node => node.classList.remove(className));
}

function getChildren(gen) {
  return gen.flatMap(node => Array.from(node.children));
}

function colorAll(nodes) {
  nodes.forEach(node => node.classList.add('generation-color'));
}