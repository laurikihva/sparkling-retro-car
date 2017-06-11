// Global variables
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
  speed = 2,
  level = 1,
  score = 0,
  offField = [obs1, obs2, obs3, obs4],
  onField = [],
  animationRequest,
  levelInterval,
  obsWidth = 75,
  obsHeight = 25,
  carWidth = 75,
  carHeight = 100,
  carTop = 425,
	startGame = document.getElementById('start'),
	restart = document.getElementById('over'),
	bmw = document.getElementById("bmw"),
  finished = false;

// Arrow controllers
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

function keyController(evt) {
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
  window.addEventListener('keydown', keyController);
}

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
  obs.el.style.left = obs.left;
  obs.launchNext = generateLaunchPos();
  obs.launched = false;
  offField.push(obs);
  console.log('i:', onField.indexOf(obs));
  onField.splice(onField.indexOf(obs), 1); // Should check if indexOf returns -1
}

// Calculating numbers from min to max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Getting all numbers divided by 25 between min and max
function getRandom25(min, max) {
  return getRandomInt(min / 25, max / 25) * 25;
}

function generateLeftPos() {
  return getRandom25(0, 225) + 'px'; // 0 is position for left border and 225 for right border
}

function generateLaunchPos() {
  return getRandom25(150, 225); // Distance between 150 and 225 is 5-8 units that obstacles will randomly spawn
}

function update() {
  var newObs,
  	obsLeft,
    obsRight,
    obsBottom,
    carBottom,
    carLeft,
    carRight;
  
  onField.forEach(function(obs) {
    obs.position += speed;
    obsLeft = parseInt(obs.left);
    obsRight = obsLeft + obsWidth;
    obsBottom = obs.position + obsHeight;
    carLeft = parseInt(bmw.style.left);
    carRight = carLeft + carWidth;
    carBottom = carTop + carHeight;
      
    if (obs.position > limit) {
      reset(obs);
      score += level;
      document.getElementById('score').innerHTML = score;
    }
      
    if (obs.position >= obs.launchNext && !obs.launched) {
      obs.launched = true;
      newObs = offField.pop();
      newObs.el.style.opacity = 1;
      onField.push(newObs);
    }
  
    if (obsRight > carLeft && obsLeft < carRight
      && obsBottom >= carTop && obs.position <= carBottom
    ) {
      finish();
    }
  });
}

function mainLoop() {
	if (!finished) {
    update();
    draw();
    animationRequest = requestAnimationFrame(mainLoop);
  }
}

// Start button
function start() {
	console.log('start');
	var newObs = offField.pop();

  startGame.style.display = 'none';
  restart.style.display = 'none';
  animationRequest = requestAnimationFrame(mainLoop);
  
  newObs.el.style.opacity = 1;
  onField.push(newObs);
  
  obs1.el.style.left = obs1.left;
  obs2.el.style.left = obs2.left;
  obs3.el.style.left = obs3.left;
  obs4.el.style.left = obs4.left;
  
  finished = false;
  
  // Updating speed level after every 20sec with 1 unit
  clearInterval(levelInterval);
	levelInterval = setInterval(function() {
    speed += 1;
    level += 1;
    document.getElementById('speed').innerHTML = level;
	}, 20000);
}

function finish() {
  finished = true;
  restart.style.display = 'block';
  console.log(animationRequest);
  cancelAnimationFrame(animationRequest);
  clearInterval(levelInterval);
  
  setTimeout(function() {
  	onField.forEach(function(obs) {
  		reset(obs);
  	});
  }, 100);
    
}