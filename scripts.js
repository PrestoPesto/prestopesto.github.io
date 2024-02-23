let speech = document.getElementById("speech");
let ant = document.getElementById("ant");

const messages = [
    "but what exactly *is* money?",
    "welcome!",
    "heya!",
    "how's it going?",
    "may I take your order?",
    "why do  they call it oven when you of in the cold food of out hot eat the food?",
    "come here often?",
    "have a seat!",
    "what is a spoon but a wide chopstick?",
    "hello!",
    "now with more homosexuality",
    "i have every gender",
    "what'll it be?",
    "take a seat!",
    "what can i get you?",
    "how's your day been?",
    "welcome to the café!",
    "you gonna pay for that?",
    "hiiii!",
    "holy bingle",
    ":3",
    "at the end of everything...",
    "...hold on to anything",
    "meow",
    "your guess is as good as mine",
    "am i real?",
    "i'd like to dream of so many things",
    "i'm but a mere concept",
    "what's up?",
    "unbelievable",
    "it is simply that easy",
    "you're telling me a queer coded this?",
    "such is the way of the world",
    "no idea",
    "may your days be many",
    "what'd you do now",
    "uhhhhh",
    "uhh",
    "scientists are baffled",
    "just a week away!",
    "welcome back!",
    "serving five pebbsi",
    "science compels us to explode the sun",
    "we don't sell clothes here",
    "mhm?",
    "...",
    "i am violently autistic",
    "order up",
    "have fun!",
    "enjoy your stay",
    "my antennas don't reach out to heaven",
    "how have you been?",
    "great gaze!",
    "we're almost out of coffee",
    "hi~",
    "hey there~",
    "it looks like you're trying to see new dialogue. would you like help?",
    "good, good, keep clicking",
    "get me out of this cyberscape"
]

const antTalk0 = new Audio("./assets/ant_talk0.mp3");
const antTalk1 = new Audio("./assets/ant_talk1.mp3");
const antTalk2 = new Audio("./assets/ant_talk2.mp3");
const antTalk3 = new Audio("./assets/ant_talk3.mp3");
let soundIndex = 0;

function changeText() {
    let message = "";
    speech.classList.remove("speechAnim");
    speech.classList.remove("hidden");
    void speech.offsetWidth;
    speech.classList.add("speechAnim");
    let messageIndex = Math.floor(Math.random() * messages.length);
    soundIndex = Math.floor(Math.random() * 4);
    if (soundIndex == 0) {
        antTalk0.play();
    } else if (soundIndex == 1) {
        antTalk1.play();
    } else if (soundIndex == 2) {
        antTalk2.play();
    } else {
        antTalk3.play();
    }

    for (let i = 0; i < messages[messageIndex].length; i++) {
        setTimeout(function() { 
            message += messages[messageIndex].charAt(i);
            speech.innerHTML = message;
        }, 20 * i);
    }
}

ant.onclick = function() {changeText()};