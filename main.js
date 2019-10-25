(() => {
  let cvs;
  let ctx;
  let lblHours;
  let lblMinutes;
  let lblSeconds;
  let lblMilliseconds;
  let stopwatch;
  const INTERVAL = 10;
  const START_ANGLE = -Math.PI * 0.5;
  const ARC_THICKNESS = 10;
  
  function padZerosLeft(num, width) {
    let result = `${num}`.split('');
    let difference = width - result.length;
    
    for (let d = 0; d < difference; d++) {
      result.unshift('0');
    }
    
    return result.join('');
  }
  
  function update() {
    stopwatch.update();
    
    let hours = stopwatch.hours;
    let minutes = stopwatch.minutes;
    let seconds = stopwatch.seconds;
    let milliseconds = Math.floor(stopwatch.milliseconds / 100);
    
    let hr = padZerosLeft(hours, 2);
    let mn = padZerosLeft(minutes, 2);
    let sc = padZerosLeft(seconds, 2);
    let ml = padZerosLeft(milliseconds, 1);
    
    lblHours.innerText = hr;
    lblMinutes.innerText = mn;
    lblSeconds.innerText = sc;
    lblMilliseconds.innerText = ml;
  }
  
  function getElapsedAngle() {
    return 2 * Math.PI * (stopwatch.seconds / 60);
  }
  
  function draw() {
    ctx.lineWidth = ARC_THICKNESS;
    
    if (stopwatch.seconds === 0) {
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      
      // draw a black circle
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.arc(
        cvs.width * 0.5,
        cvs.height * 0.5,
        cvs.width * 0.5 - ARC_THICKNESS,
        0,
        2 * Math.PI
      );
      ctx.stroke();
    } else {
      // draw a green arc
      ctx.strokeStyle = '#0f0';
      ctx.beginPath();
      ctx.arc(
        cvs.width * 0.5,
        cvs.height * 0.5,
        cvs.width * 0.5 - ARC_THICKNESS,
        START_ANGLE,
        START_ANGLE + getElapsedAngle()
      );
      ctx.stroke();
    }
  }
  
  function tick() {
    update();
    draw();
  }
  
  window.addEventListener('load', () => {
    cvs = document.getElementById('cvs');
    ctx = cvs.getContext('2d');
    
    lblHours = document.getElementById('lbl-hours');
    lblMinutes = document.getElementById('lbl-minutes');
    lblSeconds = document.getElementById('lbl-seconds');
    lblMilliseconds = document.getElementById('lbl-milliseconds');
    
    stopwatch = new Stopwatch();
    animator = new Animator(tick, INTERVAL);
    
    stopwatch.resume();
    animator.start();
  });
})();

