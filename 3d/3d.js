let ground = document.getElementById("ground");
let borders = document.getElementById("borders");
let ouch = document.getElementById("ouch");

document.body.addEventListener("keydown", function(e){keyDown[e.key] = true;  });
document.body.addEventListener("keyup", function(e){keyDown[e.key] = false; });

let pos = 720;
let posM = 0;
let rot = 0;
let rotM = 0;
let slide = 0;
let isKeyDown = true;
let maxRot = 0;
let onGround = true;
let air = 0;
let airM = 0;
let ouchPos = -20000;
let isAlive = true;

let keyDown = {};

function move(e) {
  if (keyDown["w"] && posM < 100 && onGround) {
    posM++;
  }
  if (keyDown["s"] && posM >= 1) {
    posM--;
  }
  pos += posM / 2;
  ouchPos += posM / 2;

  if (pos >= 960) {
    pos = 720;
  }
  if (posM > 0 && onGround) {
    posM -= 0.5;
  }

  if (ouchPos >= 0) {
    ouchPos = -20000;
  }

  if (ouchPos >= -2400 && onGround) {
    isAlive = false;
  }

  if (keyDown["d"]) {
    rotM += 0.5;
  }
  if (keyDown["a"]) {
    rotM -= 0.5;
  }
  rot += rotM / 4;

  if (rotM > 0) {
    rotM -= 0.03;
  }
  if (rotM < 0) {
    rotM += 0.03;
  }

  if (rot > 360) {
    rot = 360;
    rotM = 0;
  }
  if (rot < -360) {
    rot = -360;
    rotM = 0;
  }

  if (keyDown[" "] && onGround && isAlive) {
    airM += 40;
    onGround = false;
  }

  air += airM / 4;

  if (air > 0 || !isAlive) {
    airM--;
    onGround = false;
  } else {
    onGround = true;
  }

  if (onGround) {
    airM = 0;
  }

  ground.style.transform = 
    "scale(2) " +
    "translateX(" + (-rot / 10) + "px) " + 
    "perspective(13em) " + 
    "rotateX(48deg) " + 
    "rotateY(" + (rot / 900) + "rad) " + 
    "translateX(" + (-rot) + "px) " + 
    "translateY(" + (-19280 + pos) + "px) " +
    "translateZ(" + -air + "px) " +
    "scale(" + (1 - (posM / 6000)) + ")";

  borders.style.transform = 
    "scale(2) " +
    "translateX(" + (-rot / 10) + "px) " + 
    "perspective(13em) " + 
    "rotateX(48deg) " + 
    "rotateY(" + (rot / 900) + "rad) " + 
    "translateX(" + (-rot) + "px) " + 
    "translateY(" + (-19280 + pos) + "px) " +
    "translateZ(" + -air + "px) " +
    "scale(" + (1 - (posM / 6000)) + ")";

  ouch.style.transform = 
    "scale(2) " +
    "translateX(" + (-rot / 10) + "px) " + 
    "perspective(13em) " + 
    "rotateX(48deg) " + 
    "rotateY(" + (rot / 900) + "rad) " + 
    "translateX(" + (-rot) + "px) " + 
    "translateY(" + (ouchPos) + "px) " +
    "translateZ(" + -air + "px) " +
    "scale(" + (1 - (posM / 6000)) + ")";
}

setInterval(move, 10);

/* ground.style.transform = 
    "perspective(13em) " + 
    "rotateX(35deg) " + 
    "rotateZ(" + rot + "rad) ";
    "translateY(" + (Math.cos(rot) * pos) + "px) " +
    "translateX(" + (Math.sin(rot) * pos) + "px)"; */