/* eslint-disable max-lines-per-function */
document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector("form");

  form.onsubmit = (event) => {
    event.preventDefault();

    let body = new URLSearchParams(new FormData(form));
    let url = form.action;
    let method = form.method;

    let request = new XMLHttpRequest();
    request.open(method, url);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    request.onload = function(event) {
      if (request.status === 400) {
        alert(request.responseText);
      } else {
        let data = JSON.parse(request.response);
        alert(`Successfully created staff with id: ${data.id}`);
        form.reset();
      }
    };

    request.send(body);
  };
});