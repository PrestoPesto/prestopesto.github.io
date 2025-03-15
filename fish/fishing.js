let dat = {
  recs: {
    k: 0,
    fish: 0,
    wood: 0,
    veg: 0,
    sed: 0,
    iron: 0,
    cop: 0
  }
}

let resourceNums = document.getElementById("resourceNums");
//resourceNums.innerHTML = "Fish: " + dat.recs.fish;


const splash0 = document.getElementById("splash");
function splash(x, y, s) {
  let clone = splash0.cloneNode(true);
  document.body.appendChild(clone);
  clone.style.display = "block";
  clone.style.left = x + "px";
  clone.style.top = y + "px";
  clone.animate([
    { transform: "translate (-50%, -50%) scale(" + s * 0.8 + ")", opacity: 1 },
    { transform: "translate (-50%, -50%) scale(" + s * 1.4 + ")", opacity: 0}
    ], {
      duration: 500
    });
  setTimeout(function() {
    clone.remove();
  }, 500);
}

document.body.onmousedown = function(e) {
  splash(e.clientX, e.clientY, (Math.random() * 0.4 + 0.8));
  dat. recs.fish++;
  //resource Nums.innerHTML = "Fish: " + dat. recs.fish;
}

let leftLoc = document.getElementById("leftLoc"), topLoc = document.getElementById("topLoc");

let ocean = document.getElementById("ocean");
ocean.onmousedown = dragOcean;
ocean.onwheel = zoomOcean;

let xPos = 0;
let yPos = 0;
let scale = 1;

function checkPos() {
  ocean.style.transform = "translate(" + xPos + "px, " + yPos + "px) scale(" + scale + ")";
}

let xDif = 0, yDif = 0, mouseX = 0, mouseY = 0;
function dragOcean(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  ocean.onmouseup = function() {
    ocean.onmouseup = null;
    ocean.onmousemove = null;
    cellHover.style.opacity = 0.2;
  };
  ocean.onmousemove = function(e) {
    xDif = mouseX - e.clientX;
    yDif = mouseY - e.clientY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    xPos -= xDif;
    yPos -= yDif;
    //ocean.style.left = (ocean.offsetLeft - xDif) + "px";
    //ocean.style.top = (ocean.offsetTop - yDif) + "px";
    checkPos();
  }
  cellHover.style.opacity = 0;
}

let cellSize = 50;
function zoomOcean(e) {
  /*const origWidth = ocean.offsetWidth;
  const origHeight = ocean.offsetHeight;
  const origX = ocean.offsetLeft;
  const origY = ocean.offsetTop;
  const mouseX = (e.clientX - ocean.offsetLeft) / origWidth;
  const mouseY = (e.clientY - ocean.offsetTop) / origHeight; */

  if (e.deltaY < 0) {
    scale += 0.05;
  } else {
    scale -= 0.05;
  }
  cellSize = scale * 50;
  //document.querySelector(':root').style.setProperty('--cellSize', cellSize + "px");

  //ocean.style.left = (mouseX * ocean.offsetWidth) + ((origX / origWidth) * ocean.offsetWidth) + "px";
  //ocean.style.top = (mouseY * ocean.offsetHeight) + ((origY / origHeight) * ocean.offsetHeight) + "px";

  //ocean.style.transformOrigin = (e.clientX - xPos) + "px " + (e.clientY - yPos) + "px";
  //xPos = (mouseX * scale) + ((origX / origScale) * scale);
  //yPos = (mouseY * scale) + ((origY / origScale) * scale);
  //[new ocean X pos] = (mouseX * [new ocean width]) + (([old ocean x pos] / [old ocean width]) * [new ocean width]);
  //xPos = e.clientX - (mouseX * scale);
  //yPos = e.clientY - (mouseY * scale);

  checkPos();
}

let cellHover = document.getElementById("hover");
document.body.onmousemove = function(e) {
  //cellHover.style.width = cellSize + "px";
  //cellHover.style.height = cellSize + "px";
  cellHover.style.transform = "translate(" + getCoords(getCell(e.clientX - xPos)) + ", " + getCoords(getCell(e.clientY - yPos)) + ")";
  leftLoc.innerHTML = getCell(e.clientX - xPos);
  topLoc.innerHTML = getCell(e.clientY - yPos);
}
const getCoords = (loc) => {
  return loc * cellSize + "px";
}
const getCell = (loc) => {
  //return Math.round(((loc * scale) - cellSize / 2) / cellSize);
  return Math.round((loc * scale));
}


/*function elementDrag(e) {
  xDif = mouseX - e.clientX;
  yDif = mouseY - e.clientY;
  mouseX = e.clientX;
  mouseY = e.clientY;
  xPos = (ocean.offsetLeft - xDif) + "px";
  yPos = (ocean.offsetTop - yDif) + "px";
  //checkPos();
} 

function closeDragElement() {
  ocean.onmouseup = null;
  ocean.onmousemove = null;
  cellHover.style.opacity = 0.2;
} */


/*let cellSize = 50;
let cellHover = document.getElementById("hover");
document.body.onmousemove = function(e) {
  cellHover.style.width = cellSize + "px";
  cellHover.style.height = cellSize + "px";
  cellHover.style.transform = "translate(" + getCoords(getCell(e.clientX - ocean.offsetLeft)) + ", " + getCoords(getCell(e.clientY - ocean.offsetTop)) + ")";
  //leftLoc.innerHTML = getCell(e.clientX - ocean.offsetLeft);
  //topLoc.innerHTML = getCell(e.clientY - ocean.offsetTop);
}
const getCoords = (loc) => {
  return loc * cellSize + "px";
}
const getCell = (loc) => {
  return Math.round((loc - cellSize / 2) / cellSize);
}

let ocean = document.getElementById("ocean");
ocean.onmousedown = dragMouseDown;
ocean.onwheel = zoom;

function zoom(e) {
  const mouseX = (e.clientX ) / ocean.offsetWidth;
  const mouseY = (e.clientY) / ocean.offsetHeight;

  if (e.deltaY < 0) {
    cellSize += 5;
  } else {
    cellSize -= 5;
  }
  document.querySelector(':root').style.setProperty('--cellSize', cellSize + "px");

  ocean.style.left = mouseX * ocean.offsetWidth + "px";
  ocean.style.top = mouseY * ocean.offsetHeight + "px";
  //checkPos();
}

var xDif = 0, yDif = 0, mouseX = 0, mouseY = 0;

function dragMouseDown(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  ocean.onmouseup = closeDragElement;
  ocean.onmousemove = elementDrag;
  cellHover.style.opacity = 0;
}

function elementDrag(e) {
  xDif = mouseX - e.clientX;
  yDif = mouseY - e.clientY;
  mouseX = e.clientX;
  mouseY = e.clientY;
  ocean.style.left = (ocean.offsetLeft - xDif) + "px";
  ocean.style.top = (ocean.offsetTop - yDif) + "px";
  //checkPos();
}

function closeDragElement() {
  ocean.onmouseup = null;
  ocean.onmousemove = null;
  cellHover.style.opacity = 0.2;
}

function checkPos() {
  if (ocean.offsetLeft > 0) {
    ocean.style.left = 0;
  } else if (ocean.offsetLeft < ((-1 * ocean.offsetWidth) + window.innerWidth)) {
    ocean.style.left = -1 * ocean.offsetWidth + window.innerWidth + "px";
  }
  if (ocean.offsetTop > 0) {
    ocean.style.top = 0;
  } else if (ocean.offsetTop < ((-1 * ocean.offsetHeight) + window.innerHeight)) {
    ocean.style.top = -1 * ocean.offsetHeight + window.innerHeight + "px";
  }
} */