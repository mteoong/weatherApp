/**
 * Updates the clock in real time
 */
function clock() {
  const today = new Date();
  const set = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

  const dateObject = document.querySelector('p.date');
  dateObject.innerText = today.toLocaleDateString('en-US', set);

  let hour = today.getHours();
  let min = today.getMinutes();
  min = min < 10 ? `0${min}` : min;

  let period = 'AM';
  if (hour == 0) {
    hour = 12;
  } else if (hour == 12) {
    period = 'PM';
  } else if (hour > 12) {
    hour = hour - 12;
    period = 'PM';
  }

  const time = document.querySelector('p.time');
  time.innerText = `${hour}:${min} ${period}`;

  setTimeout(clock, 1000);
}

export default clock;
