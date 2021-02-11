document.body.firstElementChild.setAttribute('id', 'container');

// document.querySelector('html').addEventListener('click', () => {
//   document.querySelector('#container').style = 'display: none';
// });

// document.querySelector('#container').addEventListener('click', event => {
//   event.stopPropagation();
// });

// refactored to:
document.querySelector('html').addEventListener('click', (event) => {
  const container = document.querySelector('#container');

  if (!container.contains(event.target)) {
    container.style = 'display: none';
  }
});