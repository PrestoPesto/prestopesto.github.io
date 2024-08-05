let board = document.getElementById("board");

let mouseX = 0, mouseY = 0;
let oldRotX = 0, rotX = 0, oldRotY = -140, rotY = 0, newRotX = 0, newRotY = 0;

document.onmousedown = function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  rotX = 0;
  rotY = 0;

  document.onmouseup = function() {
    oldRotX += rotX;
    rotX = 0;
    oldRotY += rotY;
    rotY = 0;
    document.onmouseup = null;
    document.onmousemove = null;
  }

  document.onmousemove = function(e) {
    rotX = e.clientX - mouseX;
    rotY = e.clientY - mouseY;

    newRotX = (oldRotX + rotX) / -2;
    newRotY = (oldRotY + rotY) / -2;

    /* if (newRotY > 120) {
      newRotY = 120;
    } else if (newRotY < 0) {
      newRotY = 0;
    } */

    board.style.transform = "rotateX(" + newRotY + "deg) rotateZ(" + newRotX + "deg)";
  }
}
