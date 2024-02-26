let ant = document.getElementById("ant");

let enemyText = document.getElementById("enemyText");
let healthText = document.getElementById("health");
let healthBar = document.getElementById("healthBar");
let levelText = document.getElementById("level");
let levelBar = document.getElementById("levelBar");

let studyButton = document.getElementById("study");

let maxHealth = 10;
let currentHealth = 10;
let level = 1;
let xp = 0;

function spawnEnemy(color) {
    enemyText.classList.remove("announceAnim");
    enemyText.classList.remove("hidden");
    void enemyText.offsetWidth;
    enemyText.classList.add("announceAnim");
    if (color == "c") {
        enemyText.style.color = "cyan";
        enemyText.innerHTML = "antC attacks!"
    } else if (color == "m") {
        enemyText.style.color = "magenta";
        enemyText.innerHTML = "antM attacks!"
    } else if (color == "y") {
        enemyText.style.color = "yellow";
        enemyText.innerHTML = "antY attacks!"
    }
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

function study() {
    ant.classList.remove("antSpawnAnim");
    void ant.offsetWidth;
    ant.classList.add("antSpawnAnim");
}

studyButton.onclick = function() {study()};

spawnEnemy("m");
updateHealth(0);
updateLevel(0);