(() => {
  let cvs;
  let ctx;
  let lblTime;
  let stopwatch;
  const INTERVAL = 10;
  
  function padZerosLeft(num, width) {
    let result = `${num}`.split('');
    let difference = width - result.length;
    
    for (let d = 0; d < difference; d++) {
      result.unshift('0');
    }
    
    return result.join('');
  }
  
  function tick() {
    stopwatch.update();
    
    let hours = stopwatch.hours;
    let minutes = stopwatch.minutes;
    let seconds = stopwatch.seconds;
    let milliseconds = Math.floor(stopwatch.milliseconds / 100);
    
    let hr = padZerosLeft(hours, 2);
    let mn = padZerosLeft(minutes, 2);
    let sc = padZerosLeft(seconds, 2);
    let ml = padZerosLeft(milliseconds, 1);
    
    lblTime.innerText = `${hr}:${mn}:${sc}.${ml}`;
  }
  
  function draw() {
    
  }
  
  window.addEventListener('load', () => {
    cvs = document.getElementById('cvs');
    ctx = cvs.getContext('2d');
    lblTime = document.getElementById('lbl-time');
    stopwatch = new Stopwatch();
    animator = new Animator(tick, INTERVAL);
    
    stopwatch.resume();
    animator.start();
  });
})();

