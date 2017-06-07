var bmw = document.getElementById("bmw");

function leftArrowPressed() {
  bmw.style.left = parseInt(bmw.style.left) - 25 + 'px';
}

function rightArrowPressed() {
  bmw.style.left = parseInt(bmw.style.left) + 25 + 'px';
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
