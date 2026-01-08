function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var yearsSpan = clock.querySelector('.years');
  var monthsSpan = clock.querySelector('.months');
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  var v = moment.utc(endtime);

  function updateClock() {
    var diff = moment.preciseDiff(moment.utc(), v, true);

    function pad(n) {
      return (n < 10 ? '0' : '') + n;
    }

    yearsSpan.innerHTML = diff.years;
    monthsSpan.innerHTML = pad(diff.months);
    daysSpan.innerHTML = pad(diff.days);
    hoursSpan.innerHTML = pad(diff.hours);
    minutesSpan.innerHTML = pad(diff.minutes);
    secondsSpan.innerHTML = pad(diff.seconds);
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// 2**31 seconds is the moment of overflow for 32-bit signed integers
// (Jan 19 2038 03:14:08 UTC)
var deadline = new Date(Math.pow(2, 31) * 1000);
initializeClock('clockdiv', deadline);