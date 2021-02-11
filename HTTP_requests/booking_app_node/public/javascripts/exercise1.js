/* eslint-disable max-lines-per-function */
document.addEventListener('DOMContentLoaded', () => {
  let request = new XMLHttpRequest();
  request.open('GET', '/api/schedules');
  request.timeout = 5000;
  request.responseType = 'json';

  request.onload = function() {
    let schedules = request.response;
    if (schedules.length === 0) {
      alert('Currently no schedules available for booking.');
    } else {
      let staffIDs = [... new Set(schedules.map(({staff_id}) => staff_id))];

      // only one request
      staffIDs.forEach(staffID => {
        let schedule = schedules.filter(({staff_id}) => staff_id === staffID);
        alert(`Staff ${staffID}: ${schedule.length} schedules`);
      });

      // one request per staff
      // staffIDs.forEach(getSchedules);
    }
  };

  request.ontimeout = function() {
    alert('The request is taking too long. Please try again.');
  };

  request.onloadend = function() {
    alert('Request completed!');
  };

  request.send();

  function getSchedules(staff_id) {
    let request = new XMLHttpRequest();
    request.open('GET', `/api/schedules/${staff_id}`);
    request.responseType = 'json';

    request.onload = function() {
      let schedules = request.response;
      alert(`Staff ${staff_id}: ${schedules.length} schedules`);
    };

    request.send();
  }
});