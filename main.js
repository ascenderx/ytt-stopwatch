window.addEventListener('load', () => {
  let app = new App({
    topContainer: getByID('div-top-container'),
    canvas: getByID('cvs'),
    hoursLabel: getByID('lbl-hours'),
    minutesLabel: getByID('lbl-minutes'),
    secondsLabel: getByID('lbl-seconds'),
    millisecondsLabel: getByID('lbl-milliseconds'),
  });
  
  let divTopContainer = getByID('div-top-container');
  
  divTopContainer.addEventListener('click', (event) => {
    event.preventDefault();
    app.toggle();
  });
  
  divTopContainer.addEventListener('touchstart', (event) => {
    event.preventDefault();
    
    if (!touched) {
      touched = true;
      app.toggle();
    }
  });
  
  divTopContainer.addEventListener('touchend', (event) => {
    event.preventDefault();
    touched = false;
  });
  
  divTopContainer.addEventListener('touchcancel', (event) => {
    event.preventDefault();
    touched = false;
  });
});

