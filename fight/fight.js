let enemyText = document.getElementById("enemyText");
let healthText = document.getElementById("health");
let healthBar = document.getElementById("healthBar");
let levelText = document.getElementById("level");
let levelBar = document.getElementById("levelBar");

let maxHealth = 10;
let currentHealth = 10;
let level = 1;
let xp = 0;

function announceEnemy(color) {
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
    healthText.innerHTML = currentHealth + "/" + maxHealth;
    healthBar.style.width = (currentHealth / maxHealth) * 27.6 + "%";
}

function updateLevel(xpChange) {
    let xpNeeded = Math.floor(10 * Math.pow(1.2, level));
    xp += xpChange;
    levelText.innerHTML = "lvl " + level;
    levelBar.style.width = (xp / xpNeeded) * 27.6 + "%";
}

announceEnemy("m");
updateHealth(3);
updateLevel(5);