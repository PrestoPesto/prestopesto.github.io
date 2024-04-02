let ground = document.getElementById("ground");

document.body.addEventListener("keydown", function(e){keyDown[e.key] = true;  });
document.body.addEventListener("keyup", function(e){keyDown[e.key] = false; });

let pos = 720;
let posM = 0;
let rot = 0;
let rotM = 0;
let slide = 0;
let isKeyDown = true;
let maxRot = 0;

let keyDown = {};

function move(e) {
  if (keyDown["w"] && posM < 100) {
    posM += 1;
  }
  if (keyDown["s"] && posM >= 1) {
    posM -= 1;
  }
  pos += posM / 2;
  if (pos >= 960) {
    pos = 720;
  }
  if (posM > 0) {
    posM -= 0.5;
  }

  if (keyDown["d"]) {
    rotM += 0.5;
  }
  rot += rotM / 4;

  ground.style.transform = 
    //"translateX(" + (-rot * 50) + "px) " + 
    "perspective(13em) " + 
    "rotateX(40deg) " + 
    //"rotateY(" + (rot / 5) + "rad) " + 
    "translateX(" + (-rot) + "px) " + 
    //"translateZ(" + slide + "px) " + 
    "translateY(" + (-19280 + pos) + "px) " +
    "scale(" + 1 - (posM / 1000) + ")";
}

setInterval(move, 10);

/* ground.style.transform = 
    "perspective(13em) " + 
    "rotateX(35deg) " + 
    "rotateZ(" + rot + "rad) ";
    "translateY(" + (Math.cos(rot) * pos) + "px) " +
    "translateX(" + (Math.sin(rot) * pos) + "px)"; */