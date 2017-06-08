var bmw = document.getElementById("bmw");
 
function leftArrowPressed() {
  var left = parseInt(bmw.style.left);
  if (left > 0) {
    bmw.style.left = left - 25 + 'px';
  }
}
 
function rightArrowPressed() {
  var left = parseInt(bmw.style.left);
  if (left <= 200) {
    bmw.style.left = left + 25 + 'px';
  }
}

function moveSelection(evt) {
  switch (evt.keyCode) {
    case 37:
    leftArrowPressed();
    break;
    case 39:
    rightArrowPressed();
    break;
  }
}

function timeToRace() {
  window.addEventListener('keydown', moveSelection);
}

// obstacle variables
var obs = document.getElementById("obs");
  obsPos = 5,
  boxVelocity = 2,
  limit = 525;
  
function draw() {
  obs.style.top = obsPos + 'px';
}

function update() {
  if (obsPos < limit) {
    obsPos += boxVelocity;
  } else {
    return;
  }
}

function mainLoop() {
  update();
  draw();
  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
