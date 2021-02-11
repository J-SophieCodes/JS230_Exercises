function delegateEvent(parentElement, selector, eventType, callback) {
  if (parentElement) {
    parentElement.addEventListener(eventType, e => {
      let descendants = [...parentElement.querySelectorAll(selector)];
      if (descendants.includes(e.target)) {
        callback(e);
      }
    });
    return true;
  }
}

// let element1 = document.querySelector('table');
// let element2 = document.querySelector('main h1');
// let element3 = document.querySelector('main');

let callback = ({target, currentTarget}) => {
  alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
};