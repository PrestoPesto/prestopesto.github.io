let ant = document.getElementById("ant");

let enemyText = document.getElementById("enemyText");
let healthText = document.getElementById("health");
let healthBar = document.getElementById("healthBar");
let levelText = document.getElementById("level");
let levelBar = document.getElementById("levelBar");

let strikeButton = document.getElementById("strike");
let studyButton = document.getElementById("study");
let stashButton = document.getElementById("stash");
let scramButton = document.getElementById("scram");
let buttonDisable = document.getElementById("buttonDisable");

let studyText = document.getElementById("studyText");
let studyClose = document.getElementById("studyClose");
let studyName = document.getElementById("studyName");
let studyClass = document.getElementById("studyClass");

let name = "";
let food;
let hate;
let enjoys;
let location;
let loves;
let misses;
let word;
let hunts;
let fears;
let excited;
let wonders;

let maxHealth = 10;
let currentHealth = 10;
let level = 1;
let xp = 0;

let antColor;

function spawnEnemy() {
    ant.classList.remove("antSpawnAnim");
    void ant.offsetWidth;
    ant.classList.add("antSpawnAnim");
    setTimeout(function() {
        generateInfo();
        let antTypeRNG;
        do {
            antTypeRNG = Math.floor(Math.random() * 3);
        } while (antTypeRNG == antColor);
      
        if (antTypeRNG == 0) { 
            antColor = 0;
            ant.style.backgroundImage = "url(https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/antC.png?raw=true)";
            enemyText.style.color = "cyan";
            enemyText.innerHTML = "antC attacks!"
            studyClass.innerHTML = "class: <span style='color: cyan'>cyan</span>";
        } else if (antTypeRNG == 1) {
            antColor = 1;
            ant.style.backgroundImage = "url(https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/antM.png?raw=true)";
            enemyText.style.color = "magenta";
            enemyText.innerHTML = "antM attacks!"
            studyClass.innerHTML = "class: <span style='color: magenta'>magenta</span>";
        } else if (antTypeRNG == 2) {
            antColor = 2;
            ant.style.backgroundImage = "url(https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/antY.png?raw=true)";
            enemyText.style.color = "yellow";
            enemyText.innerHTML = "antY attacks!"
            studyClass.innerHTML = "class: <span style='color: yellow'>yellow</span>";
        }
        setTimeout(function() { 
            enemyText.classList.remove("announceAnim");
            enemyText.classList.remove("hidden");
            void enemyText.offsetWidth;
            enemyText.classList.add("announceAnim");
        }, 1460);
    }, 1000);
    setTimeout(function() {
        ant.classList.remove("antSpawnAnim");
        ant.classList.add("antIdle");
        buttonDisable.classList.add("hidden");
    }, 3000);
}

function updateHealth(dmg) {
    currentHealth -= dmg;
    healthText.innerHTML = "hp " + currentHealth + "/" + maxHealth;
    healthBar.style.width = (currentHealth / maxHealth) * 100 + "%";
}

function updateLevel(xpChange) {
    let xpNeeded = Math.floor(10 * Math.pow(1.2, level));
    xp += xpChange;
    levelText.innerHTML = "lvl " + level;
    levelBar.style.width = (xp / xpNeeded) * 100 + "%";
}

function endTurn() {
    //buttonDisable.classList.remove("hidden");
    studyText.classList.add("hidden");
    //antTurn();
    buttonDisable.classList.add("hidden");
}

function study() {
    buttonDisable.classList.remove("hidden");
    studyText.classList.remove("hidden");
    studyText.classList.add("studyTextOpenAnim");
    studyClose.classList.add("hidden");
    let studyList = [
        "favorite food: " + food,
        "hates: " + hates,
        "enjoys: " + enjoys,
        "favorite location: " + location,
        "loves: " + loves,
        "misses: " + misses,
        "favorite word: " + word,
        "hunts: " + hunts,
        "fears: " + fears,
        "excited for: " + excited,
        "wonders: " + wonders
    ]
    let studyLine = document.getElementsByClassName("studyLine");
    studyName.innerHTML = "name: " + name;
    for (var i = 2; i >= 0; i--) {
        let studyRNG = Math.floor(Math.random() * studyList.length);
        studyLine[i].innerHTML = studyList[studyRNG];
        studyList.splice(studyRNG, 1);
    }
    setTimeout(function() {
        studyText.classList.remove("studyTextOpenAnim");
        studyClose.classList.remove("hidden");
    }, 1800);
}

strikeButton.onclick = function() {spawnEnemy();}
studyClose.onclick = function() {endTurn();}
studyButton.onclick = function() {study();}

spawnEnemy();
updateHealth(0);
updateLevel(0);

let nameList = [
    "maurice",
    "gabriel",
    "michael",
    "gilgamesh",
    "zuk",
    "gneep",
    "holo",
    "minos",
    "sisyphus",
    "daedalus",
    "pebble",
    "river",
    "sam",
    "greg",
    "tim",
    "luke",
    "samantha",
    "monarch",
    "em",
    "zi",
    "spec",
    "dot",
    "ti",
    "astra",
    "zip",
    "zap",
    "rowan",
    "sebastian",
    "yuri",
    "club",
    "james",
    "andrew",
    "ash",
    "geo",
    "nat",
    "abigail",
    "leola",
    "mose",
    "florence",
    "levi",
    "ola",
    "gree",
    "binar",
    "octa",
    "hexi",
    "deci",
    "fox",
    "faux",
    "emma",
    "long",
    "short",
    "boyde",
    "boyd",
    "percy",
    "odin",
    "leon",
    "rhykard",
    "ranni",
    "corni",
    "gak",
    "kaz",
    "kay",
    "bean",
    "marcus",
    "abigail",
    "rose",
    "thorn",
    "wade",
    "deep",
    "depth",
    "ant",
    "luna",
    "moth",
    "space",
    "star",
    "uno",
    "tres",
    "eight",
    "eye",
    "honey",
    "maddie",
    "xan",
    "x",
    "sil",
    "virgil",
    "why",
    "ravin",
    "crow",
    "kai",
    "ctho",
    "alast",
    "ship",
    "sea",
    "storm",
    "gone",
    "forget",
    "leave",
    "sun",
    "moon",
    "fate",
    "strings",
    "hands",
    "mil",
    "nano",
    "ex",
    "metto",
    "ot",
    "haze",
    "britney",
    "oil",
    "under",
    "fly",
    "joseph",
    "calvin",
    "school",
    "fan",
    "robbie",
    "chase",
    "pursuit",
    "rend",
    "sample",
    "paul",
    "zoe",
    "gale",
    "birds",
    "heaven",
    "sky",
    "rhodes",
    "hughes",
    "bart",
    "alice",
    "assume",
    "bretta",
    "clark",
    "mai",
    "olivia",
    "august",
    "twice",
    "abby",
    "kim",
    "harry",
    "queer",
    "mino",
    "milo",
    "your",
    "spy",
    "angela",
    "jessie",
    "rob"
]
let foodList = [
    "apples",
    "pasta",
    "thoughts",
    "memories",
    "energy",
    "data",
    "bytes",
    "pizza",
    "ramen",
    "itself",
    "stone",
    "anything cyan",
    "anything magenta",
    "anything yellow",
    "salad",
    "molecules",
    "quarks",
    "cheese",
    "water",
    "moisture"
]
let hatesList = [
    "light",
    "shadow",
    "you",
    "you",
    "you",
    "math",
    "cells",
    "biology",
    "the laws of robotics",
    "plastic",
    "earth",
    "plants",
    "voids",
    "chasms",
    "ceilings",
    "bricks"
]
let enjoysList = [
    "running",
    "falling",
    "lounging",
    "eating",
    "hunting",
    "fighting",
    "reading",
    "mining",
    "jumping around",
    "sleeping",
    "pondering",
    "exploring",
    "climbing",
    "discovering"
]
let locationList = [
    "vector planes",
    "cubic cliffs",
    "the plazas",
    "the walls",
    "the spires",
    "caves",
    "acute angles",
    "hyperbolic spots",
    "bore tunnels",
    "bridges",
    "dens",
    "anything vast",
    "anything small",
    "geometric nulls",
    "θvortexes"
]
let missesList = [
    "the sun",
    "the stars",
    "love",
    "emotion",
    "friends",
    "hope",
    "control",
    "freedom",
    "familiarity",
    "understanding",
    "warmth",
    "life",
    "family"
]
let wordList = [
    "discombobulation",
    "icosahedron",
    "palindrome",
    "consecution",
    "osmium",
    "pulchritude",
    "schadenfreude",
    "kerfuffle",
    "wallop",
    "yoink",
    "goober",
    "understood",
    "scrumptious"
]
let huntsList = [
    "other ants",
    "you",
    "humans",
    "lesser beings",
    "mites",
    "borers",
    "gnawers",
    "angels",
    "divinity",
    "souls",
    "the truth",
    "answers",
    "the weak",
    "n/a",
    "bees",
    "mosquitos"
]
let fearsList = [
    "wasps",
    "mantises",
    "webs",
    "death",
    "the end",
    "aphids",
    "assassin bugs",
    "scorpions",
    "centipedes",
    "titans",
    "walking stones"
]
let excitedList = [
    "answers",
    "food",
    "a meal",
    "the truth",
    "a home",
    "living another day",
    "meeting new bugs",
    "new sights",
    "travel",
    "new code",
    "new words",
    "new food",
    "victory"
]
let wondersList = [
    "where we are",
    "who you are",
    "what it is",
    "what anything is",
    "what it all means",
    "who anyone is",
    "what this place is",
    "where the wind blows",
    "when it can be free again",
    "why it's hunted",
    "nothing at all"
]
function generateInfo() {
    name = nameList[Math.floor(Math.random() * nameList.length)];
    food = foodList[Math.floor(Math.random() * foodList.length)];
    hates = hatesList[Math.floor(Math.random() * hatesList.length)];
    enjoys = enjoysList[Math.floor(Math.random() * enjoysList.length)];
    location = locationList[Math.floor(Math.random() * locationList.length)];
    loves = nameList[Math.floor(Math.random() * nameList.length)];
    misses = missesList[Math.floor(Math.random() * missesList.length)];
    word = wordList[Math.floor(Math.random() * wordList.length)];
    hunts = huntsList[Math.floor(Math.random() * huntsList.length)];
    fears = fearsList[Math.floor(Math.random() * fearsList.length)];
    excited = excitedList[Math.floor(Math.random() * excitedList.length)];
    wonders = wondersList[Math.floor(Math.random() * wondersList.length)];
}

