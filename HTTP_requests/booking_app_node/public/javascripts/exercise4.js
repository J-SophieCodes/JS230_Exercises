/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */

document.addEventListener('DOMContentLoaded', () => {
  function makeRequest(method, url, body) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      request.open(method, url);
      request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      request.timeout = 5000;
      request.ontimeout = event => reject(event.type);
      request.onerror = () => reject(request.responseText);

      request.onload = event => {
        event.preventDefault();
        switch (request.status) {
          case 200: resolve(JSON.parse(request.response));
            break;
          case 201: resolve(request.response);
            break;
          case 204: resolve();
            break;
          default: reject(request.response);
        }
      };

      request.send(body);
    });
  }

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

  function loadSchedules() {
    let promise1 = makeRequest('GET', '/api/schedules', null);
    let promise2 = makeRequest('GET', '/api/staff_members', null);

    Promise.all([promise1, promise2])
      .then(([schedules, staffs]) => {
        return availableStaffSchedules(schedules, staffs);
      })
      .then(schedules => {
        scheduleSelector.innerHTML = templates.options({schedules});
      })
      .catch(errorMsg => alert(errorMsg));
  }

  function availableStaffSchedules(schedules, staffs) {
    return schedules.filter(({student_email}) => student_email === null)
      .map(schedule => {
        let staff = staffs.find(({id}) => id === schedule.staff_id);
        schedule.staff_name = staff ? staff.name : "???";
        return schedule;
      });
  }

  function formDataObject(form) {
    let formData = new FormData(form);
    if (formData.has('email')) {
      formData.set('student_email', formData.get('email'));
    }
    return Object.fromEntries(formData);
  }

  function getBookingSequence(message) {
    return message.match(/\d+/)[0];
  }

  function handleSignup(event) {
    event.preventDefault();
    let signup = this.closest('fieldset');
    let form = this.closest('form');
    let url = this.formAction;
    let body = formDataObject(form);

    makeRequest('POST', url, JSON.stringify(body))
      .then(successMsg => {
        alert(successMsg);
        signup.remove();
      })
      .then(() => form.requestSubmit())
      .catch(errorMsg => alert(errorMsg));
  }

  let templates = createTemplates();
  let scheduleSelector = document.querySelector('#schedule_selector');
  let bookingForm = document.querySelector('#bookingForm');
  let signupForm = document.querySelector('#signupForm');

  loadSchedules();

  bookingForm.addEventListener('submit', event => {
    event.preventDefault();
    let body = formDataObject(bookingForm);
    let url = bookingForm.action;
    let method = bookingForm.method;

    makeRequest(method, url, JSON.stringify(body))
      .then(() => {
        alert('Booked!');
        bookingForm.reset();
        loadSchedules();
      })
      .catch(errorMsg => {
        alert(errorMsg);

        let data = {
          email: body.student_email,
          booking_sequence: getBookingSequence(errorMsg),
        };

        signupForm.innerHTML = templates.signup(data);
        signupForm.querySelector('#btnSignup').onclick = handleSignup;
      });
  });
});
