class Animator {
  constructor(callback, interval) {
    this._callback = callback;
    this._interval = interval;
    this._handle = null;
    this._previous = 0;
  }
  
  _updateHandle() {
    this._handle = window.requestAnimationFrame(this._tick.bind(this));
  }
  
  _clearHandle() {
    window.cancelAnimationFrame(this._handle);
    this._handle = null;
  }
  
  _tick(timestamp) {
    let elapsed = timestamp - this._previous;
    if (elapsed >= this._interval) {
      this._callback(timestamp);
      this._previous = timestamp;
    }
    
    this._updateHandle();
  }
  
  start() {
    if (!this._handle) {
      this._updateHandle();
    }
  }
  
  stop() {
    if (this._handle) {
      this._clearHandle();
    }
  }
}

