/* eslint-disable max-lines-per-function */
function createTemplates() {
  let templates = {};

  let nodeList = document.querySelectorAll('[type="text/x-handlebars"]');
  nodeList.forEach(node => {
    templates[node.id] = Handlebars.compile(node.innerHTML);

    if (node.classList.contains('partial')) {
      Handlebars.registerPartial(node.id, node.innerHTML);
    }
  });

  nodeList.forEach(node => node.remove());

  return templates;
}

document.addEventListener('DOMContentLoaded', () => {
  const templates = createTemplates();
  const addScheduleBtn = document.querySelector('#btnAdd');
  const form = document.querySelector('form');
  const schedules = document.querySelector('#schedules');
  let staffs = [];
  let set = 0;

  (() => {
    let request = new XMLHttpRequest();
    request.open('GET', '/api/staff_members');
    request.responseType = 'json';
    request.onload = function() {
      staffs = request.response;
    };
    request.send();
  })();

  function getJSONifySchedules() {
    let schedules = [];

    for (let i = 1; i <= set; i++) {
      schedules.push({
        staff_id: form[`staff_${i}`].value,
        date: form[`date_${i}`].value,
        time: form[`time_${i}`].value,
      });
    }

    return JSON.stringify({schedules});
  }

  addScheduleBtn.onclick = function (event) {
    event.preventDefault();
    set++;
    schedules.insertAdjacentHTML('beforeend', templates.schedule({staffs, set}));
  };

  form.onsubmit = function(event) {
    event.preventDefault();

    let url = form.action;
    let method = form.method;
    let body = getJSONifySchedules();

    let request = new XMLHttpRequest();
    request.open(method, url);
    request.setRequestHeader("Content-Type", "application/json; charset=utf-8");

    request.onload = function(event) {
      alert(request.responseText);
      if (request.status === 201) {
        schedules.innerHTML = '';
      }
    };

    request.send(body);
  };

});