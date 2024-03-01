let background = document.getElementById("background");

let ant = document.getElementById("ant");

let enemyText = document.getElementById("enemyText");
let healthText = document.getElementById("healthText");
let healthBar = document.getElementById("healthBar");
let levelText = document.getElementById("levelText");
let levelBar = document.getElementById("levelBar");

let buttons = document.getElementsByClassName("button");
let strikeButton = document.getElementById("strike");
let studyButton = document.getElementById("study");
let stashButton = document.getElementById("stash");
let scramButton = document.getElementById("scram");
let buttonDisable = document.getElementById("buttonDisable");

let strikeMenu = document.getElementById("strikeMenu");
let strikeCloseButton = document.getElementById("strikeClose");
let swing = document.getElementById("swing");
let slash = document.getElementById("slash");
let stab = document.getElementById("stab");
let accDisplay = document.getElementsByClassName("acc");
let dmgDisplay = document.getElementsByClassName("dmg");
let effDisplay = document.getElementsByClassName("eff");
let attackEffects = document.getElementById("attackEffects");

let studyWarningButton = document.getElementById("studyWarning");
let studyYes = document.getElementById("studyYes");
let studyNo = document.getElementById("studyNo");
let studyText = document.getElementById("studyText");
let studyCloseButton = document.getElementById("studyClose");
let studyName = document.getElementById("studyName");
let studyClass = document.getElementById("studyClass");

let maxHealth = 10;
let currentHealth = 10;
let level = 1;
let xp = 0;
let turn = 0;

let antColor;
let antLevel = 1;
let antMaxHealth;
let antHealth;

updateHealth(0);
updateLevel(0);
spawnEnemy();

function updateHealth(dmg) {
    if (dmg > 0) {
        screenshake(1);
    }
    currentHealth -= dmg;
    if (currentHealth <= 0) {
      currentHealth = 10;
    }
    healthText.innerHTML = "hp " + currentHealth + "/" + maxHealth;
    if (currentHealth / maxHealth < 0.25) {
        healthText.insertAdjacentHTML("beforeend", " (bloodied)");
    } else if (currentHealth / maxHealth < 0.5) {
        healthText.insertAdjacentHTML("beforeend", " (beaten)");
    } else if (currentHealth / maxHealth < 0.75) {
        healthText.insertAdjacentHTML("beforeend", " (bruised)");
    } else {
        healthText.insertAdjacentHTML("beforeend", " (bright)");
    }
    healthBar.style.width = (currentHealth / maxHealth) * 100 + "%";
}

function updateLevel(xpChange) {
    let xpNeeded = Math.floor(10 * Math.pow(1.2, level));
    xp += xpChange;
    if (xp >= xpNeeded) {
        level++;
        xp -= xpNeeded;
        xpNeeded = Math.floor(10 * Math.pow(1.2, level));
    }
    levelText.innerHTML = "lvl " + level + " (" + xp + "/" + xpNeeded + ")";
    levelBar.style.width = (xp / xpNeeded) * 100 + "%";
}

function spawnEnemy() {
    let nameColor;
    let nameText;
    ant.classList.remove("antSpawnAnim");
    void ant.offsetWidth;
    ant.classList.add("antSpawnAnim");
    setTimeout(function() {
        antHealth = 10;
        enemyStatsTesting.innerHTML = antHealth;
        generateInfo();
        let antTypeRNG;
        do {
            antTypeRNG = Math.floor(Math.random() * 3);
        } while (antTypeRNG == antColor);
      
        if (antTypeRNG == 0) { 
            antColor = 0;
            ant.style.backgroundImage = "url(https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/antC.png?raw=true)";
            nameColor = "cyan";
            nameText = "antC attacks!"
            studyClass.innerHTML = "class: <span style='color: cyan'>cyan</span>";
        } else if (antTypeRNG == 1) {
            antColor = 1;
            ant.style.backgroundImage = "url(https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/antM.png?raw=true)";
            nameColor = "magenta";
            nameText = "antM attacks!"
            studyClass.innerHTML = "class: <span style='color: magenta'>magenta</span>";
        } else if (antTypeRNG == 2) {
            antColor = 2;
            ant.style.backgroundImage = "url(https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/antY.png?raw=true)";
            nameColor = "yellow";
            nameText = "antY attacks!"
            studyClass.innerHTML = "class: <span style='color: yellow'>yellow</span>";
        }
        setTimeout(function() { 
            announceText(nameText, nameColor);
        }, 1460);
    }, 1000);
    setTimeout(function() {
        ant.classList.remove("antSpawnAnim");
        ant.classList.add("antIdle");
        buttonDisable.classList.add("hidden");
    }, 3000);
}

 
function endTurn() {
    setTimeout(function() {
        antTurn();
    }, 1200);
}

function antTurn() {
    announceText("ant's turn!", "white");
    if (Math.floor(Math.random()) <= 0.7) {
        updateHealth(3);
    }
    openButtons();
}

function announceText(aText, aColor) {
    enemyText.classList.remove("announceAnim");
    enemyText.classList.remove("hidden");
    void enemyText.offsetWidth;
    enemyText.classList.add("announceAnim");
    enemyText.style.color = aColor;
    enemyText.innerHTML = aText;
    setTimeout(function() {
        enemyText.classList.add("hidden");
    }, 2000);
}

function screenshake(amount) {
    background.classList.add("screenshake");
    background.style.setProperty('--shakeAmount', amount);
    setTimeout(function() {
        background.classList.remove("screenshake");
    }, 100);
}

function openButtons() {
    for (let i = 0; i < 4; i++) {
        buttons[i].classList.remove("buttonsCloseAnim");
        void buttons[i].offsetWidth;
        buttons[i].style.borderStyle = "solid";
        buttons[i].classList.add("buttonsOpenAnim");
    }
    setTimeout(function() {
        buttonDisable.classList.add("hidden");
    }, 300);
}

function closeButtons() {
    buttonDisable.classList.remove("hidden");
    for (let i = 0; i < 4; i++) {
        buttons[i].classList.remove("buttonsOpenAnim");
        void buttons[i].offsetWidth;
        buttons[i].style.borderStyle = "dashed";
        buttons[i].classList.add("buttonsCloseAnim");
    }
}

let accuracy = 1;
let damage = 1;
let critChance = 20;

function attack(hitChance, hitDamage, hitEffect, canCrit, critDep, hitType) {
    strikeClose();
    let hitRNG = Math.floor(Math.random() * 100) + 1;
    let crit;
    setTimeout(function() {
        if (canCrit && Math.floor(Math.random() * 100) + 1 <= critChance) {
            crit = true;
        }
        if (hitChance >= hitRNG) {
            if (crit) {
                antHealth -= hitDamage * 2;
                enemyStatsTesting.innerHTML = antHealth + " Crit!";
                screenshake(3);
            } else {
                antHealth -= hitDamage;
                enemyStatsTesting.innerHTML = antHealth;
                screenshake(0.5);
            }
            ant.classList.remove("antIdle");
            ant.classList.add("antHitAnim");
            setTimeout(function() {
                ant.classList.remove("antHitAnim");
                void ant.offsetWidth;
                ant.classList.add("antIdle");
            }, 400);
        } /* else {
            miss();
        } */
        attackEffects.classList.remove("hidden");
            void attackEffects.offsetWidth;
            if (hitType == "slash") {
                attackEffects.classList.add("slashAnim");
            } else if (hitType == "stab") {
                attackEffects.classList.add("stabAnim");
            } else {
                attackEffects.classList.add("swingAnim");
            }
            setTimeout(function() {
                if (hitType == "slash") {
                    attackEffects.classList.remove("slashAnim");
                } else if (hitType == "stab") {
                    attackEffects.classList.remove("stabAnim");
                } else {
                    attackEffects.classList.remove("swingAnim");
                }
                attackEffects.classList.add("hidden");
            }, 270);
    }, 200);
}

swing.onclick = function() {
    attack(
        90 * accuracy,
        4 * damage,
        "none",
        true,
        false,
        "swing"
    );
}
slash.onclick = function() {
    attack(
        65 * accuracy,
        5 * damage,
        "stn",
        true,
        true,
        "slash"
    );
}
stab.onclick = function() {
    attack(
        75 * accuracy,
        3 * damage,
        "bld",
        true,
        true,
        "stab"
    );
}

function strike() {
    closeButtons();
    strikeMenu.classList.remove("hidden");
    strikeMenu.classList.remove("menuCloseAnim");
    void strikeMenu.offsetWidth;
    strikeMenu.classList.add("menuOpenAnim");
}

function strikeClose() {
    strikeMenu.classList.remove("menuOpenAnim");
    void strikeMenu.offsetWidth;
    strikeMenu.classList.add("menuCloseAnim");
    openButtons();
}

function studyWarning() {
    closeButtons();
    buttonDisable.classList.remove("hidden");
    studyWarningButton.classList.remove("hidden");
    studyWarningButton.classList.remove("menuCloseAnim");
    void studyWarningButton.offsetWidth;
    studyWarningButton.classList.add("menuOpenAnim");
}

function studyWarningClose() {
    studyWarningButton.classList.remove("menuOpenAnim");
    void studyWarningButton.offsetWidth;
    studyWarningButton.classList.add("menuCloseAnim");
    openButtons();
    setTimeout(function() {
        studyWarningButton.classList.add("hidden");
    }, 300);
}

function study() {
    closeButtons();
    studyWarningButton.classList.remove("menuOpenAnim");
    void studyWarningButton.offsetWidth;
    studyWarningButton.classList.add("menuCloseAnim");
    studyText.classList.remove("hidden");
    studyText.classList.remove("menuCloseAnim");
    void studyText.offsetWidth;
    studyText.classList.add("menuOpenAnim");
    let studyList = [
        "favorite food: " + favFood,
        "hates: " + hates,
        "enjoys: " + enjoys,
        "favorite location: " + favLocation,
        "loves: " + loves,
        "misses: " + misses,
        "favorite word: " + favWord,
        "hunts: " + hunts,
        "fears: " + fears,
        "excited for: " + excited,
        "wonders: " + wonders,
        "favorite number: " + favNumber
    ]
    let studyLine = document.getElementsByClassName("studyLine");
    studyName.innerHTML = "name: " + antName;
    for (var i = 2; i >= 0; i--) {
        let studyRNG = Math.floor(Math.random() * studyList.length);
        studyLine[i].innerHTML = studyList[studyRNG];
        studyList.splice(studyRNG, 1);
    }
    setTimeout(function() {
        studyText.classList.remove("menuOpenAnim");
    }, 1800);
}

function studyClose() {
    studyText.classList.remove("menuOpenAnim");
    void studyText.offsetWidth;
    studyText.classList.add("menuCloseAnim");
    setTimeout(function() {
        studyText.classList.add("hidden");
    }, 300);
    endTurn();
}

strikeButton.onclick = function() {strike();}
strikeCloseButton.onclick = function() {strikeClose();}
studyButton.onclick = function() {studyWarning();}
studyYes.onclick = function() {study();}
studyNo.onclick = function() {studyWarningClose();}
studyCloseButton.onclick = function() {studyClose();}
//stashButton.onclick = function() {updateLevel(10);}
//scramButton.onclick = function() {updateHealth(2);}

function generateInfo() {
    antName = nameList[Math.floor(Math.random() * nameList.length)];
    favFood = foodList[Math.floor(Math.random() * foodList.length)];
    hates = hatesList[Math.floor(Math.random() * hatesList.length)];
    enjoys = enjoysList[Math.floor(Math.random() * enjoysList.length)];
    favLocation = locationList[Math.floor(Math.random() * locationList.length)];
    loves = nameList[Math.floor(Math.random() * nameList.length)];
    misses = missesList[Math.floor(Math.random() * missesList.length)];
    favWord = wordList[Math.floor(Math.random() * wordList.length)];
    hunts = huntsList[Math.floor(Math.random() * huntsList.length)];
    fears = fearsList[Math.floor(Math.random() * fearsList.length)];
    excited = excitedList[Math.floor(Math.random() * excitedList.length)];
    wonders = wondersList[Math.floor(Math.random() * wondersList.length)];
    favNumber = Math.floor(Math.random() * 1000);
}

let enemyStatsTesting = document.getElementById("enemyStatsTesting");
enemyStatsTesting.innerHTML = antHealth;

let antName;
let favFood;
let hates;
let enjoys;
let favLocation;
let loves;
let misses;
let favWord;
let hunts;
let fears;
let excited;
let wonders;
let favNumber;

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
    "rob",
    "senpai"
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
    "vortexes"
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
    "scrumptious",
    "sandy loam",
    "perplexing",
    "yaoi",
    "skrunkle",
    "sudo",
    "transgender",
    "impossibility",
    "conglomerate",
    "carbonate",
    "plasmoid"
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


document.getElementById("testSpawnAnt").onclick = function() {spawnEnemy();}
document.getElementById("testDamage").onclick = function() {updateHealth(2);}
document.getElementById("testXP").onclick = function() {updateLevel(10);}
