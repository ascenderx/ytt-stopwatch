class App {
  constructor(domSet) {
    this._canvas = domSet.canvas;
    this._context = this._canvas.getContext('2d');
    this._topContainer = domSet.topContainer;
    this._labels = {
      hours: domSet.hoursLabel,
      minutes: domSet.minutesLabel,
      seconds: domSet.secondsLabel,
      milliseconds: domSet.millisecondsLabel,
    };
    this._stopwatch = new Stopwatch();
    this._interval = 10;
    this._animator = new Animator(
      this._tick.bind(this),
      this._interval
    );
    this._bgArcColor = 'black';
    this._fgArcColor = 'lime';
    this._arcThickness = 10;
    this._arcStartAngle = -Math.PI * 0.5;
    
    this._updateLabels(false);
    this._drawBGArc();
  }
  
  _updateLabels(useStopwatch = true) {
    if (useStopwatch) {
      let hours = this._stopwatch.hours;
      let minutes = this._stopwatch.minutes;
      let seconds = this._stopwatch.seconds;
      let milliseconds = Math.floor(this._stopwatch.milliseconds / 100);
      
      this._labels.hours.innerText = padZerosLeft(hours, 2);
      this._labels.minutes.innerText = padZerosLeft(minutes, 2);
      this._labels.seconds.innerText = padZerosLeft(seconds, 2);
      this._labels.milliseconds.innerText = padZerosLeft(milliseconds, 1);
    } else {
      this._labels.hours.innerText = '00';
      this._labels.minutes.innerText = '00';
      this._labels.seconds.innerText = '00';
      this._labels.milliseconds.innerText = '0';
    }
  }
  
  _update() {
    this._stopwatch.update();
  }
  
  _clearCanvas() {
    this._context.clearRect(
      0,
      0,
      this._canvas.width,
      this._canvas.height
    );
  }
  
  _drawFGArc() {
    let total = this._stopwatch.elapsedTime;
    let seconds = this._stopwatch.seconds;
    let sweepAngle;
    if (seconds !== 0) {
      sweepAngle = getSweepAngle(seconds);
    } else if (total > 1000) {
      sweepAngle = 2 * Math.PI;
    }
    
    this._context.lineWidth = this._arcThickness;
    this._context.strokeStyle = this._fgArcColor;
    this._context.beginPath();
    this._context.arc(
      this._canvas.width * 0.5,
      this._canvas.height * 0.5,
      this._canvas.width * 0.5 - this._arcThickness,
      this._arcStartAngle,
      this._arcStartAngle + sweepAngle
    );
    this._context.stroke();
  }
  
  _drawBGArc() {
    this._context.lineWidth = this._arcThickness;
    this._context.strokeStyle = this._bgArcColor;
    this._context.beginPath();
    this._context.arc(
      this._canvas.width * 0.5,
      this._canvas.height * 0.5,
      this._canvas.width * 0.5 - this._arcThickness,
      0,
      2 * Math.PI
    );
    this._context.stroke();
  }
  
  _draw() {
    if (this._stopwatch.seconds === 1) {
      this._clearCanvas();
      this._drawBGArc();
    }
    this._drawFGArc();
    this._updateLabels(true);
  }
  
  _tick() {
    this._update();
    this._draw();
  }
  
  toggle() {
    if (this._stopwatch.isRunning) {
      this._stopwatch.pause();
      this._animator.stop();
    } else {
      this._stopwatch.resume();
      this._animator.start();
    }
  }
}

