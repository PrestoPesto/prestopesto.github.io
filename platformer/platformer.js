const platformsTxt = 
`

   # # #
   ### #
   # # #






            #####
            #####
            #####
            #####
   #####    #####
   #####    #####
   #####    #####
---#####----#####---
---#####----#####---
BBBBBBBBBBBBBBBBBBBB
`

/* Level gen -------------------------------------------------------------------------------------------------------------*/
const platforms = readLevel(platformsTxt);

function readLevel(level) {
  let returnLev = [];
  const r = level.split(/\r?\n|\r|\n/g);
  for (let i = 0; i < r.length; i++) {
    const c = r[i].split(/(?!$)/u);
    returnLev[i] = c;
  }
  return returnLev;
}

let tiles = document.getElementById("tiles");
spawnPlatforms();

function spawnPlatforms() {
  for (let i = 0; i < platforms.length; i++) {
    for (let j = 0; j < platforms[20].length; j++) {
      spawnTile(j, i);
    }
  }
}

function spawnTile(x,y) {
  let tile = document.createElement("div");
  tile.style.left = x * 5 + "vh";
  tile.style.top = y * 5 + "vh";
  tiles.appendChild(tile);
  tile.classList.add("tile");

  switch(platforms[y][x]) {
    case "#":
      tile.classList.add("ground");
      break;
    case "-":
      tile.classList.add("danger");
    default:
      return;
  }
}


/* Player -------------------------------------------------------------------------------------------------------------*/
let player = document.getElementById("fella");

let x = 0;
let y = 0;
let xV = 0;
let yV = 0;
let falling = true;
let bouncing = false;

/*window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowUp":
      yV = 5;
      break;
    case "ArrowLeft":
      xV -= 1;
      break;
    case "ArrowRight":
      xV += 1;
      break;
    default:
      return;
  }
}, true); */

function moveLeft() {
  xV -= 2;
}
function moveRight() {
  xV += 2;
}
let jumpSize = 0;
function jump() {
  if (!falling && jumpSize < 6) {
    yV = 3;
    jumpSize += 1;
    y -= 5;
  }
}
/* function bounce() {
  if (y > (groundPos - 5) && falling) {
    bouncing = true;
  }
} */
document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    jump();
  }
});
document.addEventListener("keyup", (e) => {
  if (e.key == "ArrowUp") {
    falling = true;
    jumpSize = 0;
  }
});

const moveControl = {  
  //"ArrowUp": {pressed: false, func: jump},  
  //"ArrowDown": {pressed: false, func: bounce},  
  "ArrowLeft": {pressed: false, func: moveLeft},  
  "ArrowRight": {pressed: false, func: moveRight}
}
document.addEventListener("keydown", (e) => {
  if(moveControl[e.key]){
    moveControl[e.key].pressed = true;
  }
});
document.addEventListener("keyup", (e) => {
  if(moveControl[e.key]){
    moveControl[e.key].pressed = false;
  }
});
const runMoves = () => {
  Object.keys(moveControl).forEach(key => {
    moveControl[key].pressed && moveControl[key].func();
  });
}

let groundPos = 90;
let bounceStr = 2;
function updatePos() {
  runMoves();
  x += xV;
  if (xV > 5) {
    xV = 4;
  }
  if (xV < -5) {
    xV = -4;
  }
  if (xV > 0) {
    xV -= 0.5;
  }
  if (xV < 0) {
    xV += 0.5;
  }

  y -= yV;
  yV -= 0.5;
  if (yV < 0) {
    falling = true;
  }
  if (y > groundPos) {
    if (bouncing && bounceStr < 5) {
      yV = 6 + bounceStr;
      bounceStr += 1;
      bouncing = false;
    } else {
      bounceStr = 2;
      bouncing = false;
      y = groundPos;
      yV = 0;
      falling = false;
    }
  }

  player.style.top = y + "vh";
  player.style.left = x + "vh";
}

setInterval(function () {
  updatePos();
}, 30);