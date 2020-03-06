function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var yearsSpan = clock.querySelector('.years');
  var monthsSpan = clock.querySelector('.months');
  var weeksSpan = clock.querySelector('.weeks');
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  var v = moment.utc(endtime);

  function updateClock() {
    var duration = moment.duration(v.diff(moment.utc()));

    //yearsSpan.innerHTML = Number(duration.as('years').toFixed(3));
    yearsSpan.innerHTML = Number(duration.years());
    //monthsSpan.innerHTML =   Number(duration.as('months').toFixed(3));
    monthsSpan.innerHTML =   Number(duration.months());
    //daysSpan.innerHTML =   Number(duration.as('days').toFixed(3));
    daysSpan.innerHTML =   Number(duration.days());
    //hoursSpan.innerHTML = Number(duration.as('hours').toFixed(3));
    hoursSpan.innerHTML = Number(duration.hours());
    //minutesSpan.innerHTML = Number(duration.as('minutes').toFixed(3));
    minutesSpan.innerHTML = Number(duration.minutes());
    //secondsSpan.innerHTML = Number(duration.as('seconds').toFixed(0));
    secondsSpan.innerHTML = Number(duration.seconds());
  }

  updateClock();
}

var deadline = new Date(4294967296000/2);
initializeClock('clockdiv', deadline);
