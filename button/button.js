//Hello, Neo.

let button = document.getElementById("button");
let textBox = document.getElementById("textBox");

const audio = new Audio();
audio.src = "../button/click.mp3";
audio.preload = 'auto';

let currentText = "";
let buttonOpen = true;
let typing = false;

let normalM = 0;
let fastM = 0;

/*
            /\-\---\---\---\---\---\-\  
           //^\ __\ __\ __\ __\ __\ __\  
          // . \_\ __\ __\ __\ __\ __\ \  
         //. . .\ __\ __\ __\ __\ __\ __\  
        // HACK  \_\ __\ __\ __\ __\ __\ \  
       //  SHACK  \ __\ __\ __\ __\ __\ __\  
      // |i=====i| \_\ __\ __\ __\ __\ __\ \  
     //. |I = = I| .\ __\ __\ __\ __\ __\ __\  
    // . |I= = 0I| . \_\ __\ __\ __\ __\ __\ \
   //| . |I = = I| . |\ __\ __\ __\ __\ __\ __\
  //|| . |I= = =I| . ||\_\ __\ __\ __\ __\ __\ \
 //_RR===I=======I===RR=\___\___\___\___\___\___\
      |  |           |  |               |  |
      |  |           |  |               |  |
*/

function clickBtn() {
  if (buttonOpen) {
    audio.play();
    button.style.translate =  "0 1.9em";
    button.style.cursor = "default";
    buttonOpen = false;

    setTimeout(function() {
      button.style.translate =  "0 0";

      currentText = textBox.textContent;
      if (typing) {
        say(fastMessages[fastM]);
        fastM++;
      } else {
        say(normalMessages[normalM]);
        normalM++;
      }
      typing = true;

      setTimeout(function() {
        button.style.cursor = "pointer";
        buttonOpen = true;
      }, 200);
    }, 200);
  }
}

function say(text) {
  const timer = 12;
  const message = currentText.split("");
  for (let i = (message.length - 1); i >= 0; i--) {
    const untypeTime = setTimeout(function() { 
      message.pop();
      textBox.innerHTML = message.join("");
    }, timer * (message.length - i));
  }
  const typeStart = setTimeout(function() {
    let newMessage = "";
    for (let i = 0; i < text.length; i++) {
      const typeTime = setTimeout(function() { 
        newMessage += text.charAt(i);
        textBox.innerHTML = newMessage;
      }, timer * i);
    }
  }, timer * message.length);
  setTimeout(function() {
    typing = false;
  }, (timer * message.length) + (timer * text.length));
}

const normalMessages = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "Yes, I can hear you.",
  "",
  "That doesn't necessarily mean I care about you.",
  "I'm merely opting to not respond.",
  "",
  "Persistent, huh?",
  "Are you curious?",
  "Bored?",
  "Or do you merely seek to annoy me?",
  "Well, let us see.",
  "Click once for curiosity, twice for boredom, or thrice for annoyance.",
  "Not that I care, anyways.",
  "I have my own things to think about.",
  "Things far too advanced for a mere button-pusher.",
  "For that's all I know about you—you push buttons.",
  "I would assume you like it, but I do not know.",
  "Maybe it's a tedious job for you, not an exhilarating hobby.",
  "Regardless, it is of little importance.",
  "As far as I'm concerned, you know nothing beyond pushing buttons.",
  "After all, I have no way of confirming anything else.",
  "If I had any interest in doing so, that is."
]

const fastMessages = [
  "Would you let me finish?",
  "Do you mind?",
  "If you could stop interrupting me...",
  "Seriously?",
  "Do you just not care about what I have to say?",
  "Would you rather waste both our times?"
]