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
    var now = moment.utc();
    var diff = moment.preciseDiff(now, v, true);

    function pad(n) {
      return (n < 10 ? '0' : '') + n;
    }

    yearsSpan.innerHTML = diff.years;
    monthsSpan.innerHTML = pad(diff.months);
    daysSpan.innerHTML = pad(diff.days);
    hoursSpan.innerHTML = pad(diff.hours);
    minutesSpan.innerHTML = pad(diff.minutes);
    secondsSpan.innerHTML = pad(diff.seconds);

    // Update binary display
    // Get current Unix timestamp in seconds
    var currentTimestamp = Math.floor(now.valueOf() / 1000);
    // Convert to binary string
    var binaryString = currentTimestamp.toString(2);
    // Pad to 32 bits for consistency (though it's currently 31 bits until 2038)
    binaryString = "0".repeat(32 - binaryString.length) + binaryString;
    
    // Render bits
    var registerHtml = '';
    for (var i = 0; i < binaryString.length; i++) {
      var bitVal = binaryString[i];
      var classes = 'bit-box ' + (bitVal === '1' ? 'one' : 'zero');
      if (i === 0) classes += ' sign-bit'; // Highlight the sign bit
      registerHtml += '<span class="' + classes + '">' + bitVal + '</span>';
      
      // Add a separator every 8 bits for readability, but not after the last one
      if ((i + 1) % 8 === 0 && i !== 31) {
        registerHtml += '<span class="byte-sep"></span>';
      }
    }
    
    var bitRegister = document.getElementById('bit-register');
    if (bitRegister) {
      bitRegister.innerHTML = registerHtml;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// 2**31 seconds is the moment of overflow for 32-bit signed integers
// (Jan 19 2038 03:14:08 UTC)
var deadline = new Date(Math.pow(2, 31) * 1000);
initializeClock('clockdiv', deadline);