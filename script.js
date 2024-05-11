window.onload = start()
// Défninir variable blink
let blink
// Définir variable interlock au début
var interlock = 1
// Définir door 0: ouvert 1: fermé
var door = 0
// Définir local door 0: fermé 1: ouvert
var local = 0

function start() {
  setInterval(interlockcheck, 1);
  setInterval(doorcheck, 1)
}

const interlockSwitch = document.querySelector('#ioff');

const leverSwitch = document.querySelector('.lever-switch');

leverSwitch.addEventListener('click', () => {
  leverSwitch.classList.toggle('on');
  if (local == 0) {
    local = 1
  } else { local = 0 }
});

const open1 = document.querySelector('#open1');
const open2 = document.querySelector('#open2');

open1.addEventListener('click', () => {
  if (local == 1) {
  door = 1
  console.log(door)
  }
});

open2.addEventListener('click', () => {
  if (local == 1) {
  door = 1
  console.log(door)
  }
});



// Verifie interlock pour voyant
function interlockcheck() {
  if (interlock == 0) {
    console.log("interlock off");
    interlockSwitch.classList.remove('on');
    clearInterval(blink);
    if (blink != null) {
    clearInterval(blink);
      blink = null
    }
  }
  else if (interlock == 1) {
    console.log("interlock on");
    interlockSwitch.classList.add('on');
    if (blink != null) {
    clearInterval(blink);
      blink = null
    };
  }
  else if (interlock == 2) {
    console.log("interlock blink");
    if (blink == null) {
      blinking()
    }
    /* interlockSwitch.classList.remove('off');
 /*interlockSwitch.classList.toggle('on');*/

  }
}
// Blinking functions
function blinkinterlock() {
  interlockSwitch.classList.toggle('on')
}

function blinking() {
  blink = setInterval(blinkinterlock, 500);
}

// Bouton TEST INTERLOCK
function test() {
  if (interlock == 0) {
    door = 0
    local = 0
  }
  else if (interlock == 1) {
    door = 0
    local = 1
  }
  else if (interlock == 2) {
    door = 1
    local = 1
  }
}

function doorcheck() {
  if (door == 0 && local == 0) {
    interlock = 1
  }
  else if (door == 0 && local == 1) {
    interlock = 2
  }
  else if (door == 1 && local == 1) {
    interlock = 0
  }
}