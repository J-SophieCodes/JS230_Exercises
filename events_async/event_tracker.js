/* eslint-disable max-lines-per-function */
/* eslint-disable no-unused-expressions */
/*
Implement a function that tracks events on a web page by wrapping a
callback function in a function that adds each event to a tracker object
before invoking the callback. In other words, your function should take a
callback function as an argument and return a new function that:
  - Records the event.
  - Executes the original callback function.
*/

let tracker = (() => {
  const events = [];
  return {
    add(event) {
      events.push(event);
    },
    list() {
      return events.slice();
    },
    elements() {
      return events.map(e => e.target);
    },
    clear() {
      events.length = 0;
      return events.length;
    }
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  function track(callback) {
    function isEventTracked(events, event) {
      return events.includes(event);
    }

    return event => {
      if (!isEventTracked(tracker.list(), event)) {
        tracker.add(event);
      }

      callback(event);
    };
  }

  let divRed = document.querySelector('#red');
  let divBlue = document.querySelector('#blue');
  let divOrange = document.querySelector('#orange');
  let divGreen = document.querySelector('#green');

  divRed.addEventListener('click', track(event => {
    document.body.style.background = 'red';
  }));

  divBlue.addEventListener('click', track(event => {
    event.stopPropagation();
    document.body.style.background = 'blue';
  }));

  divOrange.addEventListener('click', track(event => {
    document.body.style.background = 'orange';
  }));

  divGreen.addEventListener('click', track(event => {
    document.body.style.background = 'green';
  }));
});


// tracker.list().length;
// // 4
// tracker.elements();
// // [div#blue, div#red, div#orange, div#green]
// tracker.elements()[0] === document.querySelector('#blue');
// // true
// tracker.elements()[3] === document.querySelector('#green');
// // true
// tracker.clear();
// // 0
// tracker.list();
// // []
// tracker.list()[0] = 'abc';
// tracker.list().length;
// // 0