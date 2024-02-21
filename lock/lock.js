let nums1 = [7, 12, 8, 6, 8, 10, 3, 10, 12, 1, 5, 9];
let nums2 = [8, 12, 22, 26, 16, 14, 9, 13, 5, 9, 10, 19];
let nums3 = [4, 14, 7, 15, 13, 21, 14, 15, 9, 9, 12, 11];
let nums4 = [6, 8, 10, 11, 7, 11, 15, 6, 8, 7, 3, 14];


/*
10, 03, 10, 12, 01, 05, 09, 07, 12, 08, 06, 08
10, 19, 08, 12, 22, 26, 16, 14, 09, 13, 05, 09
15, 09, 09, 12, 11, 04, 14, 07, 15, 13, 21, 14
07, 11, 15, 06, 08, 07, 03, 14, 06, 08, 10, 11
*/


let auto = false;


update();


function move(lineNum, direction, times) {
   if (auto == false) {
   let tempArray = [];
   if (lineNum == 1) {
       tempArray = nums1.slice();
   } else if (lineNum == 2) {
       tempArray = nums2.slice();
   } else if (lineNum == 3) {
       tempArray = nums3.slice();
   } else if (lineNum == 4) {
       tempArray = nums4.slice();
   }


   for (let j = 0; j < times; j++) {
   if (direction == 1) {
       let last = tempArray[11];
       for(var i = 10; i >= 0 ; i--) {
           tempArray[i + 1] = tempArray[i];
       }
       tempArray[0] = last;
   } else if (direction == 0) {
       let last = tempArray[0];
       for(var i = 0; i <= 10 ; i++) {
           tempArray[i] = tempArray[i + 1];
       }
       tempArray[11] = last;
   }
   }


   if (lineNum == 1) {
       nums1 = tempArray.slice();
   } else if (lineNum == 2) {
       nums2 = tempArray.slice();
   } else if (lineNum == 3) {
       nums3 = tempArray.slice();
   } else if (lineNum == 4) {
       nums4 = tempArray.slice();
   }
   update();
   winCheck();
   }
}


let win = document.getElementById("win");
let container = document.getElementById("container");
let check = 0;
function winCheck() {
   let check = 0;
   for (let i = 0; i < 12; i++) {
       if (nums1[i] + nums2[i] + nums3[i] + nums4[i] == 42) {
           check++;
       }
   }
   if (check == 12) {
       win.classList.remove("hidden");
       container.classList.add("glow");
   } else {
       win.classList.add("hidden");
       container.classList.remove("glow");
   }
}


function update() {
   let row1 = document.getElementsByClassName("row1");
   for (let i = 0; i < row1.length; i++) {
       row1[i].innerHTML = nums1[i].toString();
   }
  
   let row2 = document.getElementsByClassName("row2");
   for (let i = 0; i < row2.length; i++) {
       row2[i].innerHTML = nums2[i].toString();
   }


   let row3 = document.getElementsByClassName("row3");
   for (let i = 0; i < row3.length; i++) {
       row3[i].innerHTML = nums3[i].toString();
   }


   let row4 = document.getElementsByClassName("row4");
   for (let i = 0; i < row4.length; i++) {
       row4[i].innerHTML = nums4[i].toString();
   }
}


function autoSolve() {
   nums1 = [7, 12, 8, 6, 8, 10, 3, 10, 12, 1, 5, 9];
   nums2 = [8, 12, 22, 26, 16, 14, 9, 13, 5, 9, 10, 19];
   nums3 = [4, 14, 7, 15, 13, 21, 14, 15, 9, 9, 12, 11];
   nums4 = [6, 8, 10, 11, 7, 11, 15, 6, 8, 7, 3, 14];
   move(1, 0, 5);
   move(2, 1, 2);
   move(3, 1, 5);
   move(4, 0, 4);
   let row1 = document.getElementsByClassName("row1");
   for (let i = 0; i < row1.length; i++) {
       row1[i].innerHTML = "S";
   }
  
   let row2 = document.getElementsByClassName("row2");
   for (let i = 0; i < row2.length; i++) {
       row2[i].innerHTML = "O";
   }


   let row3 = document.getElementsByClassName("row3");
   for (let i = 0; i < row3.length; i++) {
       row3[i].innerHTML = "U";
   }


   let row4 = document.getElementsByClassName("row4");
   for (let i = 0; i < row4.length; i++) {
       row4[i].innerHTML = "P";
   }


   auto = true;
}
