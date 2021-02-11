document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('2').addEventListener('mouseover', e => {
    e.target.innerText = Math.random();
  });
});

function nodeSwap(id1, id2) {
  let node1 = document.getElementById(id1);
  let node2 = document.getElementById(id2);

  if (!isInvalidSwap(node1, node2)) {
    let copy1 = node1.cloneNode(true);
    let copy2 = node2.cloneNode(true);
    node1.replaceWith(copy2);
    node2.replaceWith(copy1);
  }


  document.dispatchEvent(new Event('DOMContentLoaded'));
}

function isInvalidSwap(node1, node2) {
  return !node1 || !node2 || node1.contains(node2) || node2.contains(node1);
}

// at least one of the id attributes doesn't exist
nodeSwap(1, 20);
// undefined

// at least one of the nodes is a "child" of the other
nodeSwap(1, 4);
// undefined
nodeSwap(9, 3);
// undefined

// one swap
nodeSwap(1, 2);

// multiple swaps
nodeSwap(3, 1);
nodeSwap(7, 9);