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
let critDisplay = document.getElementById("critChance");
let accDisplay = document.getElementsByClassName("acc");
let dmgDisplay = document.getElementsByClassName("dmg");
let effDisplay = document.getElementsByClassName("eff");
let attackEffects = document.getElementById("attackEffects");

let playerEffectsList = document.getElementById("playerEffects");
let antEffectsList = document.getElementById("antEffects");
let effectIcons = document.getElementsByClassName("effectBlock");

let studyWarningButton = document.getElementById("studyWarning");
let studyYes = document.getElementById("studyYes");
let studyNo = document.getElementById("studyNo");
let studyText = document.getElementById("studyText");
let studyCloseButton = document.getElementById("studyClose");
let studyName = document.getElementById("studyName");
let studyClass = document.getElementById("studyClass");

let stashMenu = document.getElementById("stashMenu");

let maxHealth = 15;
let currentHealth = maxHealth;
let level = 1;
let xp = 0;
let turn = 0;
let playerEffects = [];

let antColor;
let antLevel = 1;
let antMaxHealth;
let antHealth;
let antEffects = [];

updateHealth(0);
updateLevel(0);
spawnEnemy();
closeButtons();

function loadImages() {
  let images = [
    "https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/background.png?raw=true",
    "https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/swing.png?raw=true",
    "https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/slash.png?raw=true",
    "https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/stab.png?raw=true",
    "https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/antC.png?raw=true",
    "https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/antM.png?raw=true",
    "https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/antY.png?raw=true"
  ]
  for (let i = 0; i < images.length; i++) {
      new Image().src = images[i];
  }
}

loadImages();

function updateHealth(dmg) {
    if (dmg > 0) {
        screenshake(1);
    }
    currentHealth -= dmg;
    if (currentHealth <= 0) {
      currentHealth = maxHealth;
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

function removeEnemy(kill) {
    void ant.offsetWidth;
    //ant.classList.remove("antIdle");
    //ant.classList.add("antKillAnim");
    ant.style.animation = "antKill 1.5s ease-in-out forwards";
    antLevel += 0.3;
    setTimeout(function() {
        spawnEnemy();
    }, 1500);
}

function spawnEnemy() {
    antEffects = [];
    antEffectsList.classList.add("hidden");
    for (let i = 0; i < effectIcons.length; i++) {
        effectIcons[i].classList.add("hidden");
    }
    let nameColor;
    let nameText;
    void ant.offsetWidth;
    setTimeout(function() { //I don't know why it breaks without this
        antHealth = Math.floor(6 * antLevel);
        antMaxHealth = antHealth;
        enemyStatsTesting.innerHTML = antHealth;
        generateInfo();
        //ant.classList.remove("antKillAnim");
        //ant.classList.add("antSpawnAnim");
        ant.style.animation = "antSpawn 1.5s ease-in-out forwards";
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
        }, 900);
    }, 0);
    setTimeout(function() {
        //ant.classList.remove("antSpawnAnim");
        //ant.classList.add("antIdle");
        ant.style.animation = "antWiggle 2.3s ease-in-out infinite";
        buttonDisable.classList.add("hidden");
        openButtons();
    }, 1500);
}

 
function endTurn() {
    if (antHealth > 0) {
        setTimeout(function() {
            antTurn();
        }, 600);
    }
}

function antTurn() {
    announceText("ant's turn!", "white");
    setTimeout(function() {
        if (antEffects.includes("bld")) {
            bleed(1, 1);
            if (antHealth > 0) {
                ant.style.animation = "antHit 0.4s ease-out forwards";
                setTimeout(function() {
                    void ant.offsetWidth;
                    ant.style.animation = "antWiggle 2.3s ease-in-out infinite";
                }, 400);
            }
        }
        if (antHealth < 1) {
            removeEnemy(true);
        } else {
            setTimeout(function() {
                if (Math.random() <= 0.7) {
                    updateHealth(3);
                }
                announceText("your turn!", "white");
                setTimeout(function() { 
                    openButtons();
                }, 1500);
            }, 1400);
        }
    }, 700);
}

function announceText(aText, aColor) {
    //enemyText.classList.remove("announceAnim");
    enemyText.classList.remove("hidden");
    void enemyText.offsetWidth;
    //enemyText.classList.add("announceAnim");
    enemyText.style.animation = "announceAnim 2s ease-in forwards";
    enemyText.style.color = aColor;
    enemyText.innerHTML = aText;
    setTimeout(function() {
        enemyText.classList.add("hidden");
    }, 2000);
}

function screenshake(amount) {
    background.style.animation = "screenshake calc(0.1s * var(--shakeAmount)) ease-out";
    background.style.setProperty('--shakeAmount', amount);
    setTimeout(function() {
        background.style.animation = "none";
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

function updateAttackStats() {
    critDisplay.innerHTML = critChance + "%";
    accDisplay[0].innerHTML = 80 + accuracy + "%";
    accDisplay[1].innerHTML = 60 + accuracy + "%";
    accDisplay[2].innerHTML = 70 + accuracy + "%";
    
    dmgDisplay[0].innerHTML = 4 + damage + "";
    dmgDisplay[1].innerHTML = 5 + damage + "";
    dmgDisplay[2].innerHTML = 2 + damage + "";
}

let accuracy = 0;
let damage = 0;
let critChance = 25;

function attack(hitChance, hitDamage, hitEffect, canCrit, critDep, hitType) {
    strikeClose(false);
    let hitRNG = Math.floor(Math.random() * 100) + 1;
    let crit;
    setTimeout(function() {
        if (canCrit && Math.floor(Math.random() * 100) + 1 <= critChance) {
            crit = true;
        }
        if (hitChance >= hitRNG) {
            if (crit) {
                antHealth -= Math.floor(hitDamage * 1.5);
                enemyStatsTesting.innerHTML = antHealth + " Crit!";
                screenshake(3);
            } else {
                antHealth -= hitDamage;
                enemyStatsTesting.innerHTML = antHealth;
                screenshake(0.5);
            }
            if ((crit && critDep) || !critDep) {
                if (hitEffect == "bld") {
                    if (!antEffects.includes("bld")) {
                        antEffectsList.classList.remove("hidden");
                        effectIcons[6].classList.remove("hidden");
                        antEffects.push("bld");
                    }
                }
            }
            if (antHealth > 0) {
                ant.style.animation = "antHit 0.4s ease-out forwards";
                setTimeout(function() {
                    void ant.offsetWidth;
                    ant.style.animation = "antWiggle 2.3s ease-in-out infinite";
                }, 400);
            } else {
                removeEnemy(true);
            }
        } /* else {
            miss();
        } */
        attackEffects.classList.remove("hidden");
            void attackEffects.offsetWidth;
            if (hitType == "slash") {
                attackEffects.style.backgroundImage = 'url("https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/slash.png?raw=true")';
                attackEffects.style.animation = "slash 0.27s ease-out forwards";
            } else if (hitType == "stab") {
                attackEffects.style.backgroundImage = 'url("https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/stab.png?raw=true")';
                attackEffects.style.animation = "stab 0.27s ease-out forwards";
            } else {
                attackEffects.style.backgroundImage = 'url("https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/swing.png?raw=true")';
                attackEffects.style.animation = "swing 0.27s ease-out forwards";
            }
            setTimeout(function() {
                attackEffects.style.animation = "none";
                attackEffects.classList.add("hidden");
                endTurn();
            }, 270);
    }, 200);
}

function bleed(who, dmg) {
    if (who = 1) {
        antHealth -= dmg;
        enemyStatsTesting.innerHTML = antHealth;
        screenshake(0.5);
    }
}

swing.onclick = function() {
    attack(
        80 + accuracy,
        4 + damage,
        "none",
        true,
        false,
        "swing"
    );
}
slash.onclick = function() {
    attack(
        60 + accuracy,
        5 + damage,
        "stn",
        true,
        true,
        "slash"
    );
}
stab.onclick = function() {
    attack(
        70 + accuracy,
        2 + damage,
        "bld",
        true,
        true,
        "stab"
    );
}

function strike() {
    closeButtons();
    updateAttackStats();
    strikeMenu.classList.remove("hidden");
    strikeMenu.classList.remove("menuCloseAnim");
    void strikeMenu.offsetWidth;
    strikeMenu.classList.add("menuOpenAnim");
}

function strikeClose(reopen) {
    strikeMenu.classList.remove("menuOpenAnim");
    void strikeMenu.offsetWidth;
    strikeMenu.classList.add("menuCloseAnim");
    if (reopen) {
        openButtons();
    }
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

function stash() {
    closeButtons();
    stashMenu.classList.remove("hidden");
    stashMenu.classList.remove("menuCloseAnim");
    void stashMenu.offsetWidth;
    stashMenu.classList.add("menuOpenAnim");
}

strikeButton.onclick = function() {strike();}
strikeCloseButton.onclick = function() {strikeClose(true);}
studyButton.onclick = function() {studyWarning();}
studyYes.onclick = function() {study();}
studyNo.onclick = function() {studyWarningClose();}
studyCloseButton.onclick = function() {studyClose();}
stashButton.onclick = function() {stash();}
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


document.getElementById("testSpawnAnt").onclick = function() {removeEnemy(false);}
document.getElementById("testDamage").onclick = function() {updateHealth(2);}
document.getElementById("testXP").onclick = function() {updateLevel(10);}
