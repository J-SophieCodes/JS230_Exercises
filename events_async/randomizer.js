function randomizer(...callbacks) {
  if (callbacks.length < 1) {
    return;
  }

  let timeSlots = [...Array(callbacks.length * 2).keys()].map(n => n + 1);

  countTo(timeSlots.length);

  callbacks.forEach(callback => {
    let time = pickFrom(timeSlots) * 1000;
    setTimeout(callback, time);
  });
}

function pickFrom(slots) {
  let idx = Math.floor(Math.random() * slots.length);
  return slots.splice(idx, 1)[0];
}

function countTo(n) {
  let count = 1;
  let repeat = setInterval(() => console.log(count++), 1000);

  setTimeout(clearInterval, (n + 1) * 1000, repeat);
}

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

randomizer(callback1, callback2, callback3);
