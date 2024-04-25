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
let attackEffects = document.getElementsByClassName("attackEffects");

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
/* ice cube, lemonade, lemon pie, popcorn popper, adderall, ramen, soup, sushi, kelp
ball, can, sand, eyepad, shiv
broken flashlight, mysterious potion, 8ball, this fucking thing */
let itemCounts = [5, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2];

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
let antAcc = 0;
let antMaxHealth;
let antHealth;
let antEffects = [0, 0, 0, 0, 0, 0, 0];
let antStamina = 0;
let antCaution = 0;
let antPlanning = 0;
let antGoal;

let settings = document.getElementById("settings");
let settingsOpen = document.getElementById("settingsOpen");
let settingsArrow = document.getElementById("settingsArrow");
let settingsIsOpen = false;

settingsOpen.onclick = function() {
  if (settingsIsOpen) {
    settings.style.animation = "none";
    settings.style.translate = "-101% 0";
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
  audio.volume = volume * 0.75;
  volumeDisplay.innerHTML = "x" + (Math.round(volume * 100) / 100).toFixed(2);
}

let musicSlider = document.getElementById("musicSlider");
let musicDisplay = document.getElementById("musicDisplay");
let musicVolume = 0.7;
musicSlider.oninput = function() {
  musicVolume = this.value;
  //audio.volume = volume;
  musicDisplay.innerHTML = "x" + (Math.round(music * 100) / 100).toFixed(2);
}

let saturationSlider = document.getElementById("saturationSlider");
let saturationDisplay = document.getElementById("saturationDisplay");
let saturation = 1;
saturationSlider.oninput = function() {
  saturation = this.value;
  background.style.filter = "saturate(" + saturation * 100 + "%) blur(" + (blur * 5) + "px)";
  saturationDisplay.innerHTML = "x" + (Math.round(saturation * 100) / 100).toFixed(2);
}

let blurSlider = document.getElementById("blurSlider");
let blurDisplay = document.getElementById("blurDisplay");
let blur = 0;
blurSlider.oninput = function() {
  blur = 1 - this.value;
  background.style.filter = "saturate(" + (saturation * 100) + "%) blur(" + (blur * 5) + "px)";
  blurDisplay.innerHTML = "x" + (Math.round(this.value * 100) / 100).toFixed(2);
}

let transSlider = document.getElementById("transSlider");
let transDisplay = document.getElementById("transDisplay");
let transFlag = document.getElementById("transFlag");
let transAmount = 0;
let transMirrored = 1;
transSlider.oninput = function() {
  transAmount = this.value;
  if (transAmount < 0.2) {
    transFlag.classList.add("hidden");
  } else {
    transFlag.classList.remove("hidden");
  }
  updateTransFlag();
  transDisplay.innerHTML = "x" + (Math.round(transAmount * 100) / 100).toFixed(2);
}
function updateTransFlag() {
  void transFlag.offsetWidth;
  if (antColor == 0) {
    transMirrored = -1;
    transFlag.style.left = "53%";
    transFlag.style.top = "13%";
  } else if (antColor == 1) {
    transMirrored = 1;
    transFlag.style.left = "45%";
    transFlag.style.top = "12%";
  } else if (antColor == 2) {
    transMirrored = 1;
    transFlag.style.left = "52%";
    transFlag.style.top = "8%";
  }
  transFlag.style.scale = (transMirrored * transAmount) + " " + transAmount;
}

let bumpSlider = document.getElementById("bumpSlider");
let bumpDisplay = document.getElementById("bumpDisplay");
let bump = 0;
let bumpText = "x0";
bumpSlider.oninput = function() {
  bump = this.value;
  switch (bump) {
    case "0":
      bumpText = "x0.00";
      break;
    case "1":
      bumpText = "x1.00";
      break;
    case "2":
      bumpText = "x12.0";
      break;
    case "3":
      bumpText = "x50.0";
      break;
    case "4":
      bumpText = "x76.0";
      break;
    case "5":
      bumpText = "x100.0";
      break;
    case "6":
      bumpText = "x1000.0";
      break;
    default:
      bumpText = "x0.00"
      break;
  }
  bumpDisplay.innerHTML = bumpText;
}

let audio = new Audio();
let sounds = [
  "../fight/assets/sounds/ant_hit.wav", 
  "../fight/assets/sounds/ant_bleed.wav", 
  "../fight/assets/sounds/ant_crit.wav", 
  "../fight/assets/sounds/ant_miss.wav"
]
audio.volume = volume;

//Music
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const audioElement = document.querySelector('audio');
const track = audioCtx.createMediaElementSource(audioElement);

audioElement.play();

track.connect(audioCtx.destination);

updateHealth(0);
updateLevel(0);
spawnEnemy();
closeButtons();

function loadImages() {
  let images = [
    "../fight/assets/background.png",
    "../fight/assets/swing.png",
    "../fight/assets/slash.png",
    "../fight/assets/stab.png",
    "../fight/assets/antC.png",
    "../fight/assets/antM.png",
    "../fight/assets/antY.png"
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
  currentHealth -= Math.floor(dmg);
  
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
  antHealth -= Math.floor(dmg);
  
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
  stashClose(false);
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
  updateEffects();
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
  antStamina = 0;
  document.getElementById("antStaminaTesting").innerHTML = antStamina;
  
  setTimeout(function() { //I don't know why it breaks without this
    getAntGoal();
    antMaxHealth = Math.floor(6 * antLevel);
    antHealth = antMaxHealth;
    updateAntHealth(0);
    antStats.classList.remove("hidden");
    antStats.classList.remove("menuCloseAnim");
    void antStats.offsetWidth;
    antStats.classList.add("menuOpenAnim");
    generateInfo();
    ant.style.animation = "antSpawn calc(1.5s * var(--animSpeed)) ease-in-out forwards";
    let antTypeRNG;
    /* do {
      antTypeRNG = Math.floor(Math.random() * 3);
    } while (antTypeRNG == antColor);
    
    if (antTypeRNG == 0) { 
      antColor = 0;
      ant.style.backgroundImage = "url(../fight/assets/antC.png)";
      //ant.style.backgroundImage = "url(./assets/antC.png)";
      nameColor = "cyan";
      nameText = "antC attacks!"
      studyClass.innerHTML = "class: <span style='color: cyan'>cyan</span>";
      
      antCaution = Math.abs(Math.random() + Math.random() + 1) / 3;
    } else if (antTypeRNG == 1) {
      antColor = 1;
      ant.style.backgroundImage = "url(../fight/assets/antM.png)";
      //ant.style.backgroundImage = "url(./assets/antM.png)";
      nameColor = "magenta";
      nameText = "antM attacks!"
      studyClass.innerHTML = "class: <span style='color: magenta'>magenta</span>";
      
      antCaution = Math.abs(Math.random() + Math.random()) / 2;
    } else if (antTypeRNG == 2) { */
      antColor = 2;
      ant.style.backgroundImage = "url(../fight/assets/antY.png)";
      //ant.style.backgroundImage = "url(./assets/antY.png)";
      nameColor = "yellow";
      nameText = "antY attacks!"
      studyClass.innerHTML = "class: <span style='color: yellow'>yellow</span>";
    
      antCaution = Math.abs(Math.random() + Math.random()) / 3;
    //}
    antPlanning = Math.abs(Math.random() + Math.random()) / 2;
    
    updateTransFlag();
    
    setTimeout(function() { 
      announceText(nameText, nameColor);
    }, 900 * animSpeed);
  }, 0); //Again IDK but it works so who cares
  setTimeout(function() {
    ant.style.animation = "antWiggle 2.3s ease-in-out infinite";
    buttonDisable.classList.add("hidden");
    openButtons();
  }, 1500 * animSpeed);
}

let antGoalStam;
function getAntGoal() {
  let goalNum = Math.max(0, Math.min(1, Math.random() + (antPlanning - 0.1)));
  //Yes they're strings shut up
  if (goalNum > 0.65 && antLevel >= 2) {
    antGoal = "4";
    antGoalStam = 20;
  } else if (goalNum > 0.4) {
    antGoal = "3";
    antGoalStam = 10;
  } else if (goalNum > 0.2) {
    antGoal = "2";
    antGoalStam = 6;
  } else {
    antGoal = "1";
    antGoalStam = 3;
  }
  document.getElementById("antGoalTesting").innerHTML = antGoal;
}
 
function endTurn() {
  if (antHealth > 0) {
    setTimeout(function() {
      updateEffects();
      antTurn();
    }, 600 * animSpeed);
  }
}

//Y'ever have absolutely no idea when you wrote a function
//Because I do not remember this one
function checkEffects(val) {
  return val == 0;
}

function antTurn() {
  announceText("ant's turn!", "white");
  updateStamina(5);
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
        
        //antAction("strike1");
        //antMelee(3, 4, "crush!", true);
        antAI();
        
        announceText("your turn!", "white");
        setTimeout(function() { 
          playerTurn();
        }, 1500 * animSpeed);
      }, 1400 * animSpeed);
    }
  }, 700 * animSpeed);
}

function updateStamina(amount) {
  antStamina += amount;
  if (antStamina > (antLevel * 10)) {
    antStamina = antLevel * 10;
  }
  document.getElementById("antStaminaTesting").innerHTML = antStamina;
}

function antAI() {
  if (cautionCheck() && antStamina >= 10 && antHealth <= (antMaxHealth / 3)) {
    if (antColor == 1) {
      antAction("regen");
    } else {
      antAction("heal");
    }
  } else if (antColor == 1 && cautionCheck() && antStamina >= 6 && antHealth <= (antMaxHealth / 3)) {
    antAction("heal");
  } else if (antStamina >= antGoalStam) {
      antAction("strike" + antGoal);
      getAntGoal();
  } else if (planningCheck() || antStamina < 3) {
    antAction("basic");
  } else {
    if (antStamina >= 20) {
      antAction("strike4");
    } else if (antStamina >= 10 && Math.random() > 0.3) {
      antAction("strike3");
    } else if (antStamina >= 6 && Math.random() > 0.3) {
      antAction("strike2");
    } else if (antStamina >= 3 && Math.random() > 0.3) {
      antAction("strike1");
    } else {
      antAction("basic");
    }
  }
}
function cautionCheck() {
  if ((Math.random() + Math.random()) / 2 > antCaution) {
    return false;
  }
  return true;
}
function planningCheck() {
  if ((Math.random() + Math.random()) / 2 > antPlanning) {
    return false;
  }
  return true;
}

let antCritChance = 0.33;
function antMelee(stamCost, hitDamage, hitEffect, effectAmount) {
  updateStamina(0 - stamCost);
  if (Math.random() <= (0.7 + antAcc)) {
    ant.style.animation = "antStrike calc(0.3s * var(--animSpeed)) ease forwards";
    setTimeout(function() {
      let crit = false;
      if ((Math.random() < antCritChance)) {
        crit = true;
      }
      if (crit && hitEffect == "crush!") {
        updateHealth(Math.floor(hitDamage * 1.5));
      } else {
        updateHealth(hitDamage);
      }
      if (hitEffect == "bld") {
        playerEffects[0] += effectAmount;
        showEffect(0, 0);
      }
      if (hitEffect == "bli") {
        playerEffects[1] += effectAmount;
        showEffect(0, 1);
      }
      if (hitEffect == "dst") {
        playerEffects[2] += effectAmount;
        showEffect(0, 2);
      }
      if (hitEffect == "sck") {
        playerEffects[5] += effectAmount;
        showEffect(0, 5);
      }
      if (hitEffect == "stn") {
        playerEffects[6] += effectAmount;
        showEffect(0, 6);
      }
    }, 100 * animSpeed);
    setTimeout(function() {
      void ant.offsetWidth;
      ant.style.animation = "antWiggle 2.3s ease-in-out infinite";
    }, 300 * animSpeed);
  } else {
    ant.style.animation = "antMiss calc(0.3s * var(--animSpeed)) ease forwards";
    setTimeout(function() {
      void ant.offsetWidth;
      ant.style.animation = "antWiggle 2.3s ease-in-out infinite";
    }, 300 * animSpeed);
  }
}

function antSpell(stamCost, hitEffect) {
  updateStamina(0 - stamCost);
}

function antAction(choice) {
  switch (choice) {
    case "strike4":
      switch (antColor) {
        case 0: //Cyan
          break;
        case 1: //Magenta
          break;
        case 2: //Yellow
          antMelee(20, 14, "stn", 1);
          break;
      }
      break;
    case "strike3":
      switch (antColor) {
        case 0: //Cyan
          break;
        case 1: //Magenta
          break;
        case 2: //Yellow
          antMelee(10, 8, "stn", 1);
          break;
      }
      break;
    case "strike2":
      switch (antColor) {
        case 0: //Cyan
          break;
        case 1: //Magenta
          break;
        case 2: //Yellow
          antMelee(6, 6, "dst", 1);
          break;
      }
      break;
    case "strike1":
      switch (antColor) {
        case 0: //Cyan
          break;
        case 1: //Magenta
          break;
        case 2: //Yellow
          antMelee(3, 4, "crush!", 0);
          break;
      }
      break;
    case "heal":
      ant.style.animation = "antHeal calc(0.5s * var(--animSpeed)) ease forwards";
      setTimeout(function() {
        if (antColor == 1) {
          updateStamina(-6);
        } else {
          updateStamina(-10);
        }
        updateAntHealth(0 - (antMaxHealth * 0.2));
      }, 100 * animSpeed);
      setTimeout(function() {
        void ant.offsetWidth;
        ant.style.animation = "antWiggle 2.3s ease-in-out infinite";
      }, 500 * animSpeed);
      break;
    case "basic":
      antMelee(0, 2, "crush!");
      break;
    case "regen":
      ant.style.animation = "antHeal calc(0.5s * var(--animSpeed)) ease forwards";
      setTimeout(function() {
        updateStamina(-10);
        updateAntHealth(0 - (antMaxHealth * 0.1));
        antEffects[4] += 4;
        showEffect(1, 6);
      }, 100 * animSpeed);
      setTimeout(function() {
        void ant.offsetWidth;
        ant.style.animation = "antWiggle 2.3s ease-in-out infinite";
      }, 500 * animSpeed);
      break;
  }
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

let accuracy = 0;
let damage = 0;
let critChance = 33;

function attack(hitChance, hitDamage, hitEffect, effectAmount, canCrit, critDep, hitType, endsTurn) {
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
          updateAntHealth(hitDamage);
        }
        screenshake(5);
        audio.src = sounds[2];
        audio.play();
      } else {
        updateAntHealth(hitDamage);
        screenshake(0.5);
        audio.src = sounds[0];
        audio.play();
      }
      if ((crit && critDep) || !critDep) {
        if (hitEffect == "bld") {
          antEffects[0] += effectAmount;
          showEffect(1, 0);
        }
        if (hitEffect == "bli") {
          antEffects[1] += effectAmount;
          showEffect(1, 1);
        }
        if (hitEffect == "dst") {
          antEffects[2] += effectAmount;
          showEffect(1, 2);
        }
        if (hitEffect == "sck") {
          antEffects[5] += effectAmount;
          showEffect(1, 5);
        }
        if (hitEffect == "stn") {
          antEffects[6] += effectAmount;
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
    } else {
      audio.src = sounds[3];
      audio.play();
      ant.style.animation = "antDodge calc(0.4s * var(--animSpeed)) ease forwards";
      setTimeout(function() {
        void ant.offsetWidth;
        ant.style.animation = "antWiggle 2.3s ease-in-out infinite";
      }, 400 * animSpeed);
    }
    if (hitType == "slash") {
      playEffect(1);
    } else if (hitType == "stab") {
      playEffect(2);
    } else {
      playEffect(0);
    }
    setTimeout(function() {
      if (endsTurn) {
        endTurn();
      } else {
        menuDisable.classList.add("hidden");
      }
    }, 270 * animSpeed);
  }, 300 * animSpeed);
}

function playEffect(i) {
  void attackEffects[i].offsetWidth;
  attackEffects[i].classList.remove("hidden");
  if (i == 0) {
    attackEffects[0].style.animation = "swing calc(0.4s * calc(var(--animSpeed) / 2)) ease-out forwards";
  } else if (i == 1) {
    attackEffects[1].style.animation = "slash calc(0.4s * calc(var(--animSpeed) / 2)) ease-out forwards";
  } else if (i == 2) {
    attackEffects[2].style.animation = "stab calc(0.4s * calc(var(--animSpeed) / 2)) ease-out forwards";
  }
  setTimeout(function() {
    attackEffects[i].style.animation = "none";
    attackEffects[i].classList.add("hidden");
  }, 270 * animSpeed);
}

function bleed(who) {
  if (who == 1) {
    updateAntHealth(antEffects[0]);
    antEffects[0]--;
    updateEffects();
    screenshake(0.5);
    audio.src = sounds[1];
    audio.play();
  }
}

function regen(who) {
  if (who == 0) {
    if (playerEffects[4] > 0) {
      updateHealth(-1 * playerEffects[4]);
      playerEffects[4]--;
    }
  }
  updateEffects();
}

swing.onclick = function() {
  attack(
    80 + accuracy,
    4 + damage,
    "crush!",
    0,
    true,
    false,
    "swing",
    true
  );
}
slash.onclick = function() {
  attack(
    60 + accuracy,
    5 + damage,
    "stn",
    1,
    true,
    true,
    "slash",
    true
  );
}
stab.onclick = function() {
  attack(
    70 + accuracy,
    2 + damage,
    "bld",
    2,
    true,
    true,
    "stab",
    true
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
  if (currentHealth == maxHealth) {
    itemButtons[0].classList.remove("itemClickable");
    itemButtons[0].classList.add("itemDisabled");
    itemButtons[1].classList.remove("itemClickable");
    itemButtons[1].classList.add("itemDisabled");
    itemButtons[3].classList.remove("itemClickable");
    itemButtons[3].classList.add("itemDisabled");
  } else {
    itemButtons[0].classList.remove("itemDisabled");
    itemButtons[0].classList.add("itemClickable");
    itemButtons[1].classList.remove("itemDisabled");
    itemButtons[1].classList.add("itemClickable");
    itemButtons[3].classList.remove("itemDisabled");
    itemButtons[3].classList.add("itemClickable");
    itemButtons[8].classList.remove("itemDisabled");
    itemButtons[8].classList.add("itemClickable");
  }
  if (playerEffects[0] == 0) {
    itemButtons[5].classList.remove("itemClickable");
    itemButtons[5].classList.add("itemDisabled");
  } else {
    itemButtons[5].classList.remove("itemDisabled");
    itemButtons[5].classList.add("itemClickable");
  }
  if (currentHealth == maxHealth && playerEffects[0] == 0) {
    itemButtons[8].classList.remove("itemClickable");
    itemButtons[8].classList.add("itemDisabled");
  } else {
    itemButtons[8].classList.remove("itemDisabled");
    itemButtons[8].classList.add("itemClickable");
  }
  
  if (buffsCheck.checked) {
    showCheckedItems(0, 9, true);
  } else {
    showCheckedItems(0, 9, false);
  }
  if (weaponsCheck.checked) {
    showCheckedItems(9, 14, true);
  } else {
    showCheckedItems(9, 14, false);
  }
  if (miscCheck.checked) {
    showCheckedItems(14, 17, true);
  } else {
    showCheckedItems(14, 17, false);
  }
}

const buffsCheck = document.getElementById("buffsCheck");
const weaponsCheck = document.getElementById("weaponsCheck");
const miscCheck = document.getElementById("miscCheck");

buffsCheck.onchange = function() {
  if (buffsCheck.checked) {
    showCheckedItems(0, 9, true);
  } else {
    showCheckedItems(0, 9, false);
  }
}
weaponsCheck.onchange = function() {
  if (weaponsCheck.checked) {
    showCheckedItems(9, 14, true);
  } else {
    showCheckedItems(9, 14, false);
  }
}
miscCheck.onchange = function() {
  if (miscCheck.checked) {
    showCheckedItems(14, 17, true);
  } else {
    showCheckedItems(14, 17, false);
  }
}

function showCheckedItems(min, max, checked) {
  if (checked) {
    for (let i = min; i < max; i++) {
      if (itemCounts[i] > 0) {
        itemButtons[i].classList.remove("hidden");
      }
    }
  } else {
    for (let i = min; i < max; i++) {
      itemButtons[i].classList.add("hidden");
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
    if (antHealth > 0) {
      endTurn();
    }
  }
}

function giveItem(itemNum, amount) {
  itemCounts[itemNum] += amount;
  updateItemCounts();
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
  }
  useItem(2, true);
  playerEffects[4] += 4;
  showEffect(0, 4);
}
//Popcorn
itemButtons[3].onclick = function() {
  updateHealth(-5);
  updateAntHealth(-5);
  useItem(3, true);
}
//Adderall
itemButtons[4].onclick = function() {
  playerEffects[5] += 4;
  useItem(4, false);
}
//Ramen
itemButtons[5].onclick = function() {
  if (playerEffects[0] > 0) {
    playerEffects[0] = 0;
    updateEffects();
    useItem(5, false);
  }
}
//Soup
itemButtons[6].onclick = function() {
  playerEffects[4] += 7;
  showEffect(0, 4);
  playerEffects[5] += 1;
  showEffect(0, 5);
  updateEffects();
  useItem(6, true);
}
//Sushi
itemButtons[7].onclick = function() {
  updateHealth(-10);
  giveItem(8, 2);
  useItem(7, true);
}
//Kelp
itemButtons[8].onclick = function() {
  if (playerEffects[0] > 0 || currentHealth != maxHealth) {
    playerEffects[0] = 0;
    updateEffects();
    updateHealth(-1);
    useItem(8, false);
  }
}

//(hitChance, hitDamage, hitEffect, effectAmount, canCrit, critDep, hitType)

//Ball
let ballChance = 75;
itemButtons[9].onclick = function() {
  attack(
    100,
    2 + damage,
    "none",
    0,
    false,
    false,
    "strike",
    false
  );
  if ((Math.random() * 100) >= ballChance) {
    useItem(9, false);
    ballChance = 75;
    document.getElementById("ballChanceDisplay").innerHTML = ballChance + "%";
  } else {
    useItem(9, false);
    giveItem(9, 1);
    ballChance -= 5;
    document.getElementById("ballChanceDisplay").innerHTML = ballChance + "%";
  }
}
//Can
itemButtons[10].onclick = function() {
  attack(
    80 + acc,
    1 + damage,
    "stn",
    1,
    false,
    false,
    "strike",
    false
  );
  useItem(10, false)
}
//Sand
itemButtons[11].onclick = function() {
  attack(
    70 + acc,
    0,
    "bli",
    3,
    false,
    false,
    "strike",
    false
  );
  useItem(11, true)
}
//Eyepad
itemButtons[12].onclick = function() {
  attack(
    80 + acc,
    0,
    "dst",
    3,
    false,
    false,
    "strike",
    false
  );
  useItem(12, true)
}
//Shiv
itemButtons[13].onclick = function() {
  attack(
    80 + acc,
    0,
    "bld",
    4,
    false,
    false,
    "stab",
    false
  );
  useItem(13, true)
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

let textHelp = document.getElementById("textHelp");
let textHelpLines = document.getElementsByClassName("textHelpLine");

for (let i = 0; i < textHelpLines.length; i++) {
  textHelpLines[i].addEventListener("mousemove", function(e) {
    textHelp.style.scale = 1;
    textHelp.style.left = (e.clientX - background.offsetLeft) + "px";
    textHelp.style.top = (e.clientY - background.offsetTop) + "px";
  });
  
  textHelpLines[i].addEventListener("mouseout", function(e) {
    textHelp.style.scale = 0;
  });
}
let bldHelp = document.getElementsByClassName("bldHelp");
for (let i = 0; i < bldHelp.length; i++) {
  bldHelp[i].addEventListener("mousemove", function(e) {
    textHelp.innerHTML = "<span style='color: cyan'>bleeding</span><br>-X hp/turn, X-1"
  });}
let bliHelp = document.getElementsByClassName("bliHelp");
for (let i = 0; i < bliHelp.length; i++) {
  bliHelp[i].addEventListener("mousemove", function(e) {
    textHelp.innerHTML = "<span style='color: cyan'>blinded</span><br>-70% hit chance"
  });}
let dstHelp = document.getElementsByClassName("dstHelp");
for (let i = 0; i < dstHelp.length; i++) {
  dstHelp[i].addEventListener("mousemove", function(e) {
    textHelp.innerHTML = "<span style='color: cyan'>distracted</span><br>-30% hit chance"
  });}
let focHelp = document.getElementsByClassName("focHelp");
for (let i = 0; i < focHelp.length; i++) {
  focHelp[i].addEventListener("mousemove", function(e) {
    textHelp.innerHTML = "<span style='color: cyan'>focused</span><br>+30% hit chance"
  });}
let regHelp = document.getElementsByClassName("regHelp");
for (let i = 0; i < regHelp.length; i++) {
  regHelp[i].addEventListener("mousemove", function(e) {
    textHelp.innerHTML = "<span style='color: cyan'>regen</span><br>+X hp/turn, X-1"
  });}
let sckHelp = document.getElementsByClassName("sckHelp");
for (let i = 0; i < sckHelp.length; i++) {
  sckHelp[i].addEventListener("mousemove", function(e) {
    textHelp.innerHTML = "<span style='color: cyan'>sickened</span><br>-50% max hp"
  });}
let stnHelp = document.getElementsByClassName("stnHelp");
for (let i = 0; i < stnHelp.length; i++) {
  stnHelp[i].addEventListener("mousemove", function(e) {
    textHelp.innerHTML = "<span style='color: cyan'>stunned</span><br>skip X turns"
  });}
let fastHelp = document.getElementsByClassName("fastHelp");
for (let i = 0; i < fastHelp.length; i++) {
  fastHelp[i].addEventListener("mousemove", function(e) {
    textHelp.innerHTML = "<span style='color: cyan'>fast</span><br>does not end turn"
  });}
let sushiHelp = document.getElementsByClassName("sushiHelp");
for (let i = 0; i < sushiHelp.length; i++) {
  sushiHelp[i].addEventListener("mousemove", function(e) {
    textHelp.innerHTML = "<span style='color: cyan'>kelp bandage</span><br>+1 hp, cures bld, fast"
  });}

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
  favNumber = Math.floor(Math.abs((Math.random() * 500) + (Math.random() * -500)));
}

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
