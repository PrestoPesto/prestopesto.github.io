let speech = document.getElementById("speech");
let ant = document.getElementById("ant");

const messages = [
    "but what exactly *is* money?", "question",
    "welcome!", "wave0",
    "heya!", "wave1",
    "how's it going?", "wave0",
    "may I take your order?", "wave1",
    "come here often?", "cloth0",
    "have a seat!", "wave0",
    "what is a spoon but a wide chopstick?", "question",
    "hello!", "wave0",
    "now with more homosexuality", "smug",
    "i have every gender", "smug",
    "what'll it be?", "wave1",
    "take a seat!", "wave0",
    "what can i get you?", "wave1",
    "how's your day been?", "wave1",
    "welcome to the café!", "wave0",
    "you gonna pay for that?", "serious",
    "hiiii!", "wave0",
    "holy bingle", "cloth0",
    ":3", "smug",
    "at the end of everything...", "stretch",
    "...hold on to anything", "serious",
    "meow", "stretch",
    "your guess is as good as mine", "cloth0",
    "am i real?", "question",
    "i'd like to dream of so many things", "cloth1",
    "i'm but a mere concept", "smug",
    "what's up?", "wave1",
    "unbelievable", "cloth1",
    "it is simply that easy", "stretch",
    "you're telling me a queer coded this?", "serious",
    "such is the way of the world", "cloth0",
    "no idea", "stretch",
    "may your days be many", "stretch",
    "what'd you do now", "cloth1",
    "uhhhhh", "cloth0",
    "uhh", "cloth1",
    "scientists are baffled", "cloth0",
    "just a week away!", "wave1",
    "welcome back!", "wave0",
    "serving five pebbsi", "cloth1",
    "science compels us to explode the sun", "question",
    "we don't sell clothes here", "cloth0",
    "mhm?", "smug",
    "...", "cloth0",
    "i am violently autistic", "smug",
    "order up", "wave1",
    "have fun!", "wave0",
    "enjoy your stay", "wave1",
    "my antennas don't reach out to heaven", "question",
    "how have you been?", "question",
    "great gaze!", "wave0",
    "we're almost out of coffee", "cloth0",
    "hi~", "smug",
    "hey there~", "smug",
    "it looks like you're trying to see new dialogue. would you like help?", "cloth1",
    "good, good, keep clicking", "serious",
    "get me out of this cyberscape", "serious",
    "made by bugs, for bugs, with bugs!", "wave0"
]

const antTalk0 = new Audio("./assets/ant_talk0.mp3");
const antTalk1 = new Audio("./assets/ant_talk1.mp3");
const antTalk2 = new Audio("./assets/ant_talk2.mp3");
const antTalk3 = new Audio("./assets/ant_talk3.mp3");
let soundIndex = 0;

function changeText() {
    ant.classList.remove("antAnim");
    void ant.offsetWidth;
    ant.classList.add("antAnim");
    let message = "";
    speech.classList.remove("speechAnim");
    speech.classList.remove("hidden");
    void speech.offsetWidth;
    speech.classList.add("speechAnim");
    let messageIndex = Math.floor(Math.random() * messages.length /2) * 2;
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

    ant.src = "./assets/ant_" + messages[messageIndex + 1] + ".png";

    for (let i = 0; i < messages[messageIndex].length; i++) {
        setTimeout(function() { 
            message += messages[messageIndex].charAt(i);
            speech.innerHTML = message;
        }, 20 * i);
    }
}

ant.onclick = function() {changeText()};