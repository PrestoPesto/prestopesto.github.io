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
    "just a week away",
    "welcome back",
    "serving five pebsi",
    "science compels us to explode the sun",
    "we don't sell clothes",
    "mhm?",
    "...",
    "i am violently autistic",
    "order up",
    "have fun!",
    "enjoy your stay",
    "my antennas don't reach out to heaven",
    "how have you been?",
    "great gaze!",
    "we're almost out of coffee"
]

function changeText() {
    speech.innerHTML = messages[Math.floor(Math.random() * messages.length)];
    speech.classList.replace("transition", "transition");
}

changeText();

ant.onclick = function() {changeText()};