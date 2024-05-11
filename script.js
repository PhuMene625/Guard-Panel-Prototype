window.onload = start()
// Défninir variable blink
let blink
// Définir variable interlock au début
var interlock = 0
// Définir door 0: ouvert 1: fermé
var door = 0
// Définir local door 0: fermé 1: ouvert
var local = 0
// Variable buzzer
const buzzoff = document.querySelector('#boff');
//KeySwitch
var key = 0


function start() {
  setInterval(interlockcheck, 1);
  setInterval(doorcheck, 1)
  setInterval(checkbuzzer, 1)
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
  if (local == 1 && key == 1) {
    door = 1
    console.log(door)
  }
});

open2.addEventListener('click', () => {
  if (local == 1 && key == 1) {
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
interlockSwitch.classList.toggle('on');*/

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
  if (key == 0) {
    interlock = 0
  }
  else if (door == 0 && local == 0) {
    interlock = 1
  }
  else if (door == 0 && local == 1) {
    interlock = 2
  }
  else if (door == 1 && local == 1) {
    interlock = 0
  }
}

const buzzer = document.querySelector('.buzzer')
let bmaintien = false;

buzzer.addEventListener('mousedown', () => {
  if (key == 1) {
    bmaintien = 1;
    console.log("BUZZ");
  }
});

buzzer.addEventListener('mouseup', () => {
  if (key == 1) {
    bmaintien = 0;
    console.log("UNBUZZ");
  }
});

buzzer.addEventListener('touchstart', () => {
  if (key == 1) {
    bmaintien = 1;
    console.log("BUZZ");
  }
});

buzzer.addEventListener('touchend', () => {
  if (key == 1) {
    bmaintien = 0;
    console.log("UNBUZZ");
  }
});


function checkbuzzer() {
  if (bmaintien == 1) {
    buzzoff.classList.add('on');
  } else if (bmaintien == 0) {
    buzzoff.classList.remove('on');
  }
}

const close = document.querySelector('.close-button');
close.addEventListener('click', () => {
  if (key == 1) {
    door = 0
    console.log("closed")
  }
});

const keySwitch = document.querySelector('.key-switch');

keySwitch.addEventListener('click', () => {
  keySwitch.classList.toggle('on');
  if (key == 0) {
    key = 1
  } else {
    key = 0
  }
});