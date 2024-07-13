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
// Etat du train
let state


function start() {
  setInterval(interlockcheck, 1);
  setInterval(doorcheck, 1);
  setInterval(checkbuzzer, 1);
  portrait();
  
}

function portrait(){
  function getScreenOrientation() {
    return window.screen.orientation.type;
  }

  function isPortraitMode() {
    return getScreenOrientation() === "portrait-primary" || getScreenOrientation() === "portrait-secondary";
  }

  function blockPage() {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "1000";
    document.body.appendChild(overlay);

    const message = document.createElement("p");
    message.style.color = "white";
    message.style.fontSize = "24px";
    message.style.textAlign = "center";
    message.style.padding = "20px";
    message.innerHTML = "Veuillez tourner votre appareil en mode paysage pour utiliser cette page.";
    overlay.appendChild(message);
  }

  window.addEventListener("orientationchange", function() {
    if (isPortraitMode()) {
      blockPage();
    } else {
      const overlay = document.querySelector("div[style*='position: fixed;']");
      if (overlay) {
        overlay.remove();
      }
    }
  });

  if (isPortraitMode()) {
    blockPage();
  }
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
    //console.log("interlock off");
    interlockSwitch.classList.remove('on');
    clearInterval(blink);
    if (blink != null) {
      clearInterval(blink);
      blink = null
    }
  }
  else if (interlock == 1) {
    //console.log("interlock on");
    interlockSwitch.classList.add('on');
    if (blink != null) {
      clearInterval(blink);
      blink = null
    };
  }
  else if (interlock == 2) {
   // console.log("interlock blink");
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
/*function test() {
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
}*/

function doorcheck() {
  if (key == 0) {
    interlock = 0
    cs("Panel HS")
  }
  else if (door == 0 && local == 0) {
    interlock = 1
    cs("Portes Fermées")
  }
  else if (door == 0 && local == 1) {
    interlock = 2
    cs("Local Ouvert")
  }
  else if (door == 1 && local == 1) {
    interlock = 0
    cs("Portes Ouvertes")
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


function cs(state){
document.getElementById("ts").innerHTML = state;
}