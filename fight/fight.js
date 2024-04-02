let background = document.getElementById("background");

let ant = document.getElementById("ant");

let enemyText = document.getElementById("enemyText");
let healthText = document.getElementById("healthText");
let healthBar = document.getElementById("healthBar");
let levelText = document.getElementById("levelText");
let levelBar = document.getElementById("levelBar");

let antStats = document.getElementById("antStats");
let antHealthBar = document.getElementById("antHealthBar");
let antHealthText = document.getElementById("antHealthText");

let buttons = document.getElementsByClassName("button");
let strikeButton = document.getElementById("strike");
let studyButton = document.getElementById("study");
let stashButton = document.getElementById("stash");
let scramButton = document.getElementById("scram");
let buttonDisable = document.getElementById("buttonDisable");

let menuDisable = document.getElementById("menuDisable");

let spoilsMenu = document.getElementById("spoilsMenu");
let spoilsCloseButton = document.getElementById("spoilsClose");
let spoilsXp = document.getElementById("xpCount");
let victoryText = document.getElementsByClassName("victoryText");
let victoryItems = document.getElementsByClassName("victoryItem");
let spoilsTitle = document.getElementById("spoilsTitle");

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

let antEffectsList = document.getElementById("antEffects");
let playerEffectsList = document.getElementById("playerEffects");
let effectIcons = document.getElementsByClassName("effect");
let effectAmounts = document.getElementsByClassName("effectAmount");

let studyWarningButton = document.getElementById("studyWarning");
let studyYes = document.getElementById("studyYes");
let studyNo = document.getElementById("studyNo");
let studyText = document.getElementById("studyText");
let studyCloseButton = document.getElementById("studyClose");
let studyName = document.getElementById("studyName");
let studyClass = document.getElementById("studyClass");

let stashMenu = document.getElementById("stashMenu");
let stashCloseButton = document.getElementById("stashClose");
let itemButtons = document.getElementsByClassName("itemIcon");
let itemCountDisplays = document.getElementsByClassName("itemCount");
let itemCounts = [5, 3, 2];

let scramWarningButton = document.getElementById("scramWarning");
let scramYes = document.getElementById("scramYes");
let scramNo = document.getElementById("scramNo");
let scramChanceDisplay = document.getElementById("scramChance");

let maxHealth = 15;
let currentHealth = maxHealth;
let level = 1;
let xp = 0;
let turn = 0;
let playerEffects = [0, 0, 0, 0, 0, 0, 0];

let antColor;
let antLevel = 1;
let antMaxHealth;
let antHealth;
let antEffects = [0, 0, 0, 0, 0, 0, 0];

let settings = document.getElementById("settings");
let settingsOpen = document.getElementById("settingsOpen");
let settingsArrow = document.getElementById("settingsArrow");
let settingsIsOpen = false;

settingsOpen.onclick = function() {
  if (settingsIsOpen) {
    settings.style.animation = "none";
    settings.style.translate = "-87% 0";
    settingsIsOpen = false;
    settingsArrow.innerHTML = ">";
  } else {
    settings.style.animation = "none";
    settings.style.translate = "0 0";
    settingsIsOpen = true;
    settingsArrow.innerHTML = "<";
  }
}

let gameSpeedSlider = document.getElementById("gameSpeedSlider");
let gameSpeedDisplay = document.getElementById("gameSpeedDisplay");
let root = document.querySelector(":root");
let animSpeed = 1;
gameSpeedSlider.oninput = function() {
  animSpeed = 1 / this.value;
  root.style.setProperty("--animSpeed", animSpeed);
  gameSpeedDisplay.innerHTML = "x" + (Math.round(this.value * 100) / 100).toFixed(2) + "";
}

let volumeSlider = document.getElementById("volumeSlider");
let volumeDisplay = document.getElementById("volumeDisplay");
let volume = 0.7;
volumeSlider.oninput = function() {
  volume = this.value;
  audio.volume = volume;
  volumeDisplay.innerHTML = "x" + (Math.round(volume * 100) / 100).toFixed(2);
}

/* const antHit = new Audio("./assets/sounds/ant_hit.wav");
const antBleed = new Audio("./assets/sounds/ant_bleed.wav");
const antCrit = new Audio("./assets/sounds/ant_crit.wav");
const antMiss = new Audio("./assets/sounds/ant_miss.wav"); */

let audio = new Audio();
let sounds = [
  "./assets/sounds/ant_hit.wav", 
  "./assets/sounds/ant_bleed.wav", 
  "./assets/sounds/ant_crit.wav", 
  "./assets/sounds/ant_miss.wav"
]
audio.volume = volume;

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
  /* let images = [
    "./assets/background.png",
    "./assets/swing.png",
    "./assets/slash.png",
    "./assets/stab.png",
    "./assets/antC.png",
    "./assets/antM.png",
    "./assets/antY.png"
  ] */
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
  
  //Just for testing
  if (currentHealth <= 0) {
    currentHealth = maxHealth;
  }
  
  if (currentHealth > maxHealth) {
    currentHealth = maxHealth;
  }
  healthText.innerHTML = "hp " + currentHealth + "/" + maxHealth;
  healthBar.style.width = (currentHealth / maxHealth) * 100 + "%";
}

function updateLevel(xpChange) {
  let xpNeeded = Math.floor(10 * Math.pow(1.2, level));
  xp += xpChange;
  if (xp >= xpNeeded) {
    level++;
    maxHealth++;
    updateHealth(-1);
    xp -= xpNeeded;
    xpNeeded = Math.floor(10 * Math.pow(1.3, level));
  }
  levelText.innerHTML = "lvl " + level + " (" + xp + "/" + xpNeeded + ")";
  levelBar.style.width = (xp / xpNeeded) * 100 + "%";
}

function updateAntHealth(dmg) {
  antHealth -= dmg;
  
  if (antHealth > antMaxHealth) {
    antHealth = antMaxHealth;
  }
  antHealthText.innerHTML = "hp " + antHealth + "/" + antMaxHealth;
  antHealthBar.style.width = (antHealth / antMaxHealth) * 100 + "%";
}

function removeEnemy(kill) {
  antStats.classList.remove("menuOpenAnim");
  void antStats.offsetWidth;
  antStats.classList.add("menuCloseAnim");
  setTimeout(function() {
    antStats.classList.add("hidden");
  }, 300);
  for (let i = 0; i < 7; i++) {
    setTimeout(function() {
      hideEffect(1, i);
    }, i * 10);
  }
  void ant.offsetWidth;
  ant.style.animation = "antKill calc(1.5s * var(--animSpeed)) ease-in-out forwards";
  setTimeout(function() {
    if (kill) {
      updateLevel(Math.floor(antLevel * 5));
      spoilsXp.innerHTML = "+" + Math.floor(antLevel * 5) + " xp";
      antLevel += 0.3;
      menuDisable.classList.add("hidden");
      spoilsMenu.classList.remove("hidden");
      spoilsMenu.classList.remove("menuCloseAnim");
      void spoilsMenu.offsetWidth;
      spoilsMenu.classList.add("menuOpenAnim");
      spoilsTitle.innerHTML = "victory!";
      for (let i = 0; i < 4; i++) {
        victoryText[i].classList.remove("hidden");
      }
    } else {
      antLevel += 0.6;
      menuDisable.classList.add("hidden");
      spoilsMenu.classList.remove("hidden");
      spoilsMenu.classList.remove("menuCloseAnim");
      void spoilsMenu.offsetWidth;
      spoilsMenu.classList.add("menuOpenAnim");
      spoilsTitle.innerHTML = "escaped...";
      for (let i = 0; i < 4; i++) {
        victoryText[i].classList.add("hidden");
      }
    }
  }, 800 * animSpeed);
}

function spoilsClose() {
  menuDisable.classList.remove("hidden");
  spoilsMenu.classList.remove("menuOpenAnim");
  void spoilsMenu.offsetWidth;
  spoilsMenu.classList.add("menuCloseAnim");
  setTimeout(function() {
    spawnEnemy();
  }, 500 * animSpeed);
}

function showEffect(who, i) {
  if (who == 0) {
    i += 7;
  }
  effectIcons[i].style.scale = "1";
  effectIcons[i].style.width = "7%";
  if (who ==  0) {
    effectAmounts[i].innerHTML = playerEffects[i - 7];
  } else {
    effectAmounts[i].innerHTML = antEffects[i];
  }
}

function updateEffects() {
  for (let i = 0; i < 7; i++) {
    effectAmounts[i].innerHTML = antEffects[i];
    effectAmounts[i + 7].innerHTML = playerEffects[i];
    if (antEffects[i] < 1) {
      hideEffect(1, i);
    }
    if (playerEffects[i] < 1) {
      hideEffect(0, i);
    }
  }
}

function hideEffect(who, i) {
  if (who == 0) {
    i += 7;
  }
  effectIcons[i].style.scale = "0";
  effectIcons[i].style.width = "0";
}

function spawnEnemy() {
  antEffects = [0, 0, 0, 0, 0, 0, 0];
  
  let nameColor;
  let nameText;
  void ant.offsetWidth;
  setTimeout(function() { //I don't know why it breaks without this
    antMaxHealth = Math.floor(6 * antLevel);
    antHealth = antMaxHealth;
    updateAntHealth(0);
    antStats.classList.remove("hidden");
    antStats.classList.remove("menuCloseAnim");
    void antStats.offsetWidth;
    antStats.classList.add("menuOpenAnim");
    enemyStatsTesting.innerHTML = antHealth;
    generateInfo();
    ant.style.animation = "antSpawn calc(1.5s * var(--animSpeed)) ease-in-out forwards";
    let antTypeRNG;
    do {
      antTypeRNG = Math.floor(Math.random() * 3);
    } while (antTypeRNG == antColor);
    
    if (antTypeRNG == 0) { 
      antColor = 0;
      ant.style.backgroundImage = "url(https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/antC.png?raw=true)";
      //ant.style.backgroundImage = "url(./assets/antC.png)";
      nameColor = "cyan";
      nameText = "antC attacks!"
      studyClass.innerHTML = "class: <span style='color: cyan'>cyan</span>";
    } else if (antTypeRNG == 1) {
      //antColor = 1;
      ant.style.backgroundImage = "url(https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/antM.png?raw=true)";
      //ant.style.backgroundImage = "url(./assets/antM.png)";
      nameColor = "magenta";
      nameText = "antM attacks!"
      studyClass.innerHTML = "class: <span style='color: magenta'>magenta</span>";
    } else if (antTypeRNG == 2) {
      antColor = 2;
      ant.style.backgroundImage = "url(https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/antY.png?raw=true)";
      //ant.style.backgroundImage = "url(./assets/antY.png)";
      nameColor = "yellow";
      nameText = "antY attacks!"
      studyClass.innerHTML = "class: <span style='color: yellow'>yellow</span>";
    }
    setTimeout(function() { 
      announceText(nameText, nameColor);
    }, 900 * animSpeed);
  }, 0);
  setTimeout(function() {
    ant.style.animation = "antWiggle 2.3s ease-in-out infinite";
    buttonDisable.classList.add("hidden");
    openButtons();
  }, 1500 * animSpeed);
}
 
function endTurn() {
  if (antHealth > 0) {
    setTimeout(function() {
      updateEffects();
      antTurn();
    }, 600 * animSpeed);
  }
}

function checkEffects(val) {
  return val == 0;
}

function antTurn() {
  announceText("ant's turn!", "white");
  setTimeout(function() {
    if (antEffects[0] > 0) {
      bleed(1, 1);
      if (antHealth > 0) {
        ant.style.animation = "antHit calc(0.4s * var(--animSpeed)) ease-out forwards";
        setTimeout(function() {
          void ant.offsetWidth;
          ant.style.animation = "antWiggle 2.3s ease-in-out infinite";
        }, 400 * animSpeed);
      }
    }
    if (antHealth < 1) {
      removeEnemy(true);
    } else if (antEffects[6] > 0) {
      antEffects[6]--;
      setTimeout(function() {
        updateEffects(1);
        announceText("your turn!", "white");
        setTimeout(function() { 
          openButtons();
        }, 1500 * animSpeed);
      }, 1400 * animSpeed);
    } else {
      setTimeout(function() {
        if (Math.random() <= 0.7) {
          updateHealth(3);
        }
        announceText("your turn!", "white");
        setTimeout(function() { 
          playerTurn();
        }, 1500 * animSpeed);
      }, 1400 * animSpeed);
    }
  }, 700 * animSpeed);
}

function playerTurn() {
  openButtons();
  regen(0);
}

function announceText(aText, aColor) {
  enemyText.classList.remove("hidden");
  void enemyText.offsetWidth;
  enemyText.style.animation = "announceAnim calc(1.6s * var(--animSpeed)) ease-in forwards";
  enemyText.style.color = aColor;
  enemyText.innerHTML = aText;
  setTimeout(function() {
    enemyText.classList.add("hidden");
  }, 1600 * animSpeed);
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
    menuDisable.classList.add("hidden");
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

let accuracy = 40;
let damage = 0;
let critChance = 100;

function attack(hitChance, hitDamage, hitEffect, canCrit, critDep, hitType) {
  menuDisable.classList.remove("hidden");
  strikeClose(false);
  let hitRNG = Math.floor(Math.random() * 100) + 1;
  let crit;
  setTimeout(function() {
    if (canCrit && Math.floor(Math.random() * 100) + 1 <= critChance) {
      crit = true;
    }
    if (hitChance >= hitRNG) {
      if (crit) {
        if (hitEffect == "crush!") {
          updateAntHealth(Math.floor(hitDamage * 1.5));
        } else {
          updateAntHealth(hitDamage)
        }
        enemyStatsTesting.innerHTML = antHealth + " Crit!";
        screenshake(3);
        audio.src = sounds[2];
        audio.play();
      } else {
        updateAntHealth(hitDamage);
        enemyStatsTesting.innerHTML = antHealth;
        screenshake(0.5);
        audio.src = sounds[0];
        audio.play();
      }
      if ((crit && critDep) || !critDep) {
        if (hitEffect == "bld") {
          antEffects[0]++;
          showEffect(1, 0);
        }
        if (hitEffect == "stn") {
          antEffects[6]++;
          showEffect(1, 6);
        }
      }
      if (antHealth > 0) {
        ant.style.animation = "antHit calc(0.4s * var(--animSpeed)) ease-out forwards";
        setTimeout(function() {
          void ant.offsetWidth;
          ant.style.animation = "antWiggle 2.3s ease-in-out infinite";
        }, 400 * animSpeed);
      } else {
        removeEnemy(true);
      }
    }  else {
      audio.src = sounds[3];
      audio.play();
    }
    attackEffects.classList.remove("hidden");
      void attackEffects.offsetWidth;
      if (hitType == "slash") {
        attackEffects.style.backgroundImage = 'url("https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/slash.png?raw=true")';
        //attackEffects.style.backgroundImage = 'url("./assets/slash.png")';
        attackEffects.style.animation = "slash calc(0.4s * calc(var(--animSpeed) / 2)) ease-out forwards";
      } else if (hitType == "stab") {
        attackEffects.style.backgroundImage = 'url("https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/stab.png?raw=true")';
        //attackEffects.style.backgroundImage = 'url("./assets/stab.png")';
        attackEffects.style.animation = "stab calc(0.4s * calc(var(--animSpeed) / 2)) ease-out forwards";
      } else {
        attackEffects.style.backgroundImage = 'url("https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/swing.png?raw=true")';
        //attackEffects.style.backgroundImage = 'url("./assets/swing.png")';
        attackEffects.style.animation = "swing calc(0.4s * calc(var(--animSpeed) / 2)) ease-out forwards";
      }
      setTimeout(function() {
        attackEffects.style.animation = "none";
        attackEffects.classList.add("hidden");
        endTurn();
      }, 270 * animSpeed);
  }, 200 * animSpeed);
}

function bleed(who) {
  if (who == 1) {
    updateAntHealth(antEffects[0]);
    enemyStatsTesting.innerHTML = antHealth;
    screenshake(0.5);
    audio.src = sounds[1];
    audio.play();
  }
}

function regen(who) {
  if (who == 0) {
    if (playerEffects[5] > 0) {
      updateHealth(-1 * playerEffects[5]);
      playerEffects[5]--;
      effectAmountsDisplay[5].innerHTML = playerEffects[5] + "";
    }
  }
}

swing.onclick = function() {
  attack(
    80 + accuracy,
    4 + damage,
    "crush!",
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
  menuDisable.classList.add("hidden");
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
  } else {
    menuDisable.classList.remove("hidden");
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
  menuDisable.classList.add("hidden");
  closeButtons();
  stashMenu.classList.remove("hidden");
  stashMenu.classList.remove("menuCloseAnim");
  void stashMenu.offsetWidth;
  stashMenu.classList.add("menuOpenAnim");
  updateItemCounts();
}

function updateItemCounts() {
  for (let i = 0; i < itemCountDisplays.length; i++) {
    itemCountDisplays[i].innerHTML = "x" + itemCounts[i] + "";
  }
  for (let i = 0; i < itemCounts.length; i++) {
    if (itemCounts[i] == 0) {
      itemButtons[i].classList.add("hidden");
    } else {
      itemButtons[i].classList.remove("hidden");
    }
  }
  for (let i = 0; i < 2; i++) {
    if (currentHealth == maxHealth) {
      itemButtons[i].classList.remove("itemClickable");
      itemButtons[i].classList.add("itemDisabled");
    } else {
      itemButtons[i].classList.remove("itemDisabled");
      itemButtons[i].classList.add("itemClickable");
    }
  }
}

function stashClose(reopen) {
  stashMenu.classList.remove("menuOpenAnim");
  void stashMenu.offsetWidth;
  stashMenu.classList.add("menuCloseAnim");
  if (reopen) {
    openButtons();
  } else {
    menuDisable.classList.remove("hidden");
  }
}

function useItem(itemNum, endsTurn) {
  itemCounts[itemNum]--;
  updateItemCounts();
  if (endsTurn) {
    stashClose(false);
    setTimeout(function() {
      stashMenu.classList.add("hidden");
    }, 300);
    endTurn();
  }
}

//Ice cube
itemButtons[0].onclick = function() {
  if (currentHealth != maxHealth) {
    updateHealth(-2);
    useItem(0, false);
  }
}
//Lemonade
itemButtons[1].onclick = function() {
  if (currentHealth != maxHealth) {
    updateHealth(-6);
    useItem(1, true);
  }
}
//Lemon pie
itemButtons[2].onclick = function() {
  if (currentHealth != maxHealth) {
    updateHealth(-1000000);
    useItem(2, true);
  }
  antEffectsList.classList.remove("hidden");
  effectIcons[5].classList.remove("hidden");
  playerEffectsList.classList.remove("hidden");
  effectIcons[5].style.scale = 1;
  playerEffects[5] += 3;
  effectAmountsDisplay[5].innerHTML = playerEffects[5] + "";
}

let scramChance = 60 + accuracy;

function scramWarning() {
  closeButtons();
  buttonDisable.classList.remove("hidden");
  scramWarningButton.classList.remove("hidden");
  scramWarningButton.classList.remove("menuCloseAnim");
  void scramWarningButton.offsetWidth;
  scramWarningButton.classList.add("menuOpenAnim");
  scramChance = 60 + accuracy * 10;
  scramChanceDisplay.innerHTML = scramChance + "%";
  
}

function scramWarningClose(reOpen) {
  scramWarningButton.classList.remove("menuOpenAnim");
  void scramWarningButton.offsetWidth;
  scramWarningButton.classList.add("menuCloseAnim");
  if (reOpen) {
    openButtons();
  }
  setTimeout(function() {
    scramWarningButton.classList.add("hidden");
  }, 300);
}

function scram() {
  if (Math.floor(Math.random() * 100 ) <= scramChance) {
    scramWarningClose(false);
    removeEnemy(false);
  } else {
    scramWarningClose(false);
    endTurn();
  }
}

spoilsCloseButton.onclick = function() {spoilsClose();}
strikeButton.onclick = function() {strike();}
strikeCloseButton.onclick = function() {strikeClose(true);}
studyButton.onclick = function() {studyWarning();}
studyYes.onclick = function() {study();}
studyNo.onclick = function() {studyWarningClose();}
studyCloseButton.onclick = function() {studyClose();}
stashButton.onclick = function() {stash();}
stashCloseButton.onclick = function() {stashClose(true);}
scramButton.onclick = function() {scramWarning();}
scramYes.onclick = function() {scram();}
scramNo.onclick = function() {scramWarningClose(true);}

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


document.getElementById("testSpawnAnt").onclick = function() {removeEnemy(true);}
document.getElementById("testDamage").onclick = function() {updateHealth(2);}
document.getElementById("testXP").onclick = function() {updateLevel(10);}
