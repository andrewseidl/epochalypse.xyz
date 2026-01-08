function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const yearsSpan = clock.querySelector('.years');
  const monthsSpan = clock.querySelector('.months');
  const daysSpan = clock.querySelector('.days');
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');
  const bitRegister = document.getElementById('bit-register');
  const v = moment.utc(endtime);

  function pad(n) {
    return (n < 10 ? '0' : '') + n;
  }

  function updateClock() {
    const now = moment.utc();
    const diff = moment.preciseDiff(now, v, true);

    yearsSpan.innerHTML = diff.years;
    monthsSpan.innerHTML = pad(diff.months);
    daysSpan.innerHTML = pad(diff.days);
    hoursSpan.innerHTML = pad(diff.hours);
    minutesSpan.innerHTML = pad(diff.minutes);
    secondsSpan.innerHTML = pad(diff.seconds);

    // Update 32-bit register display
    const currentTimestamp = Math.floor(now.valueOf() / 1000);
    const binaryString = currentTimestamp.toString(2).padStart(32, '0');

    let registerHtml = '';
    for (let i = 0; i < 32; i++) {
      const bitVal = binaryString[i];
      let classes = 'bit-box ' + (bitVal === '1' ? 'one' : 'zero');
      if (i === 0) classes += ' sign-bit';

      registerHtml += `<span class="${classes}">${bitVal}</span>`;

      // Add byte separator
      if ((i + 1) % 8 === 0 && i !== 31) {
        registerHtml += '<span class="byte-sep"></span>';
      }
    }

    if (bitRegister) {
      bitRegister.innerHTML = registerHtml;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// 2**31 seconds is the moment of overflow for 32-bit signed integers
// (Jan 19 2038 03:14:08 UTC)
const deadline = new Date(Math.pow(2, 31) * 1000);
initializeClock('clockdiv', deadline);
