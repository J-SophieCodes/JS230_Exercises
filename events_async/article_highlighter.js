document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', e => {
    e.stopPropagation();

    if (e.target.tagName === 'A') {
      addHighlight(document.querySelector(e.target.hash));
    } else if (e.target.closest('article')) {
      addHighlight(e.target.closest('article'));
    } else {
      addHighlight(document.querySelector('main'));
    }
  });

  function removeHighlights() {
    document.querySelectorAll('.highlight').forEach(node => {
      node.classList.remove('highlight');
    });
  }

  function addHighlight(node) {
    removeHighlights();
    node.classList.add('highlight');
  }
});