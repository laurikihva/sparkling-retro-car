// arrow keys for controller
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
var obs1 = {
    el: document.getElementById("obs1"),
    left: generateLeftPos(),
    position: 0,
    launchNext: generateLaunchPos(),
    launched: false
	},
 	obs2 = {
    el: document.getElementById("obs2"),
    left: generateLeftPos(),
    position: 0,
    launchNext: generateLaunchPos(),
    launched: false
	},
	obs3 = {
    el: document.getElementById("obs3"),
    left: generateLeftPos(),
    position: 0,
    launchNext: generateLaunchPos(),
    launched: false
  },
  obs4 = {
    el: document.getElementById("obs4"),
    left: generateLeftPos(),
    position: 0,
    launchNext: generateLaunchPos(),
    launched: false
  },
	limit = 500,
	velocity = 2,
  offField = [obs2, obs3, obs4],
  onField = [obs1];

obs1.el.style.left = obs1.left;
obs2.el.style.left = obs2.left;
obs3.el.style.left = obs3.left;
obs4.el.style.left = obs4.left;

function draw() {
  onField.forEach(function(obs) {
    obs.el.style.top = obs.position + 'px';
  });
}

function reset(obs) {
	obs.el.style.opacity = 0;
  obs.el.style.top = 0;
	obs.position = 0;
  obs.left = generateLeftPos();
  obs.launchNext = generateLaunchPos();
  obs.launched = false;
  offField.push(obs);
  onField.splice(onField.indexOf(obs), 1); // Should check if indexOf returns -1
}

function generateLeftPos() {
	return Math.floor(Math.random() * 225) + 'px';
}

function generateLaunchPos() {
	return Math.floor(Math.random() * (200-125+1)) + 125;
}

function update() {
	var newObs;
  
  onField.forEach(function(obs) {
      obs.position += velocity;
      
      if (obs.position > limit) {
      	reset(obs);
      }
      
      if (obs.position >= obs.launchNext && !obs.launched) {
      	obs.launched = true;
        newObs = offField.pop();
        newObs.el.style.opacity = 1;
      	onField.push(newObs);
      }
  });
}

function mainLoop() {
  update();
  draw();
  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);