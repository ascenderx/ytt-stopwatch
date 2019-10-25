function getTimestamp() {
  return (new Date()).valueOf();
}

class Stopwatch {
  constructor() {
    this._runningTotal = 0;
    this._startTime = null;
    this._elapsedTime = null;
  }
  
  update() {
    this._elapsedTime = getTimestamp() - this._startTime + this._runningTotal;
  }
  
  resume() {
    this._startTime = getTimestamp();
    this._elapsedTime = this._runningTotal;
  }
  
  pause() {
    this._runningTotal = this._elapsedTime;
    this._startTime = null;
    this._elapsedTime = null;
  }
  
  reset() {
    this._runningTotal = 0;
    this._startTime = null;
    this._elapsedTime = null;
  }
  
  get elapsedTime() {
    return this._elapsedTime;
  }
  
  get milliseconds() {
    if (this._elapsedTime === null) {
      return null;
    }
    return Math.floor(this._elapsedTime % 1000);
  }
  
  get seconds() {
    if (this._elapsedTime === null) {
      return null;
    }
    return Math.floor((this._elapsedTime / 1000) % 60);
  }
  
  get minutes() {
    if (this._elapsedTime === null) {
      return null;
    }
    return Math.floor((this._elapsedTime / (1000 * 60)) % 60); 
  }
  
  get hours() {
    if (this._elapsedTime === null) {
      return null;
    }
    return Math.floor((this._elapsedTime / (1000 * 3600)) % 24);
  }
}

