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

let antColor;

function spawnEnemy() {
    ant.classList.remove("antSpawnAnim");
    void ant.offsetWidth;
    ant.classList.add("antSpawnAnim");
    setTimeout(function() {
        let antTypeRNG = Math.floor(Math.random() * 3);
        if (antTypeRNG == 0) { 
            antColor = "c";
            ant.style.backgroundImage = "url(https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/antC.png?raw=true)";
            enemyText.style.color = "cyan";
            enemyText.innerHTML = "antC attacks!"
        } else if (antTypeRNG == 1) {
            antColor = "m";
            ant.style.backgroundImage = "url(https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/antM.png?raw=true)";
            enemyText.style.color = "magenta";
            enemyText.innerHTML = "antM attacks!"
        } else if (antTypeRNG == 2) {
            antColor = "y";
            ant.style.backgroundImage = "url(https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/antY.png?raw=true)";
            enemyText.style.color = "yellow";
            enemyText.innerHTML = "antY attacks!"
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

function study() {
    ant.classList.remove("antSpawnAnim");
    void ant.offsetWidth;
    ant.classList.add("antSpawnAnim");
}

studyButton.onclick = function() {spawnEnemy();}

spawnEnemy();
updateHealth(0);
updateLevel(0);
