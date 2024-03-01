@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');

body {
    background-color: black;
    font-family: "IBM Plex Mono", monospace;
    font-weight: 400;
}

.hidden {
    display: none;
}

#background {
    max-width: 800px;
    width: 80%;
    aspect-ratio: 4 / 3;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    overflow: hidden;
    border: 1px solid white;
    --shakeAmount: 1;
}

#background::before {
    z-index: -1;
    position: absolute;
    content: "";
    background-image: url("https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/background.png?raw=true");
    width: 110%;
    height: 100%;
    background-size: 100% auto;
    animation: backgroundWiggle 6s ease-in-out infinite;
}

@keyframes backgroundWiggle {
    0%, 100% {transform: skewX(1deg) skewY(1deg) rotate(-1deg) translate(-5%, 0);}
    50% {transform: skewX(-1deg) skewY(-1deg) rotate(1deg) translate(-5%, 0);}
}

#buttons {
    width: 100%;
    height: 16%;
    position: absolute;
    bottom: 2%;
    display: flex;
    justify-content: center;
    column-gap: 2%;
}

#buttonDisable {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    cursor: default;
}

.button {
    background-color: black;
    width: 22%;
    font-size: min(3.4vw, 32px);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.button:hover {
    translate: 0 -0.4em;
}

#strike {
    color: magenta;
    border: 1px solid magenta;
}
#strike:hover {
    box-shadow: 0 0.4em 0 0 magenta;
}

#study {
    color: cyan;
    border: 1px solid cyan;
}
#study:hover {
    box-shadow: 0 0.4em 0 0 cyan;
}

#stash {
    color: yellow;
    border: 1px solid yellow;
}
#stash:hover {
    box-shadow: 0 0.4em 0 0 yellow;
}

#scram {
    color: white;
    border: 1px solid white;
}
#scram:hover {
    box-shadow: 0 0.4em 0 0 white;
}

.buttonsOpenAnim {
    animation: buttonsOpen 0.3s ease forwards;
}

.buttonsCloseAnim {
    animation: buttonsOpen 0.3s ease-in reverse forwards;
}

@keyframes buttonsOpen {
    from {scale: 0.7; rotate: 2deg;}
    to {scale: 1; rotate: 0;}
}

#stats {
    width: 100%;
    position: absolute;
    height: 1.5%;
    bottom: 21%;
    display: flex;
    justify-content: center;
    column-gap: 2%;
}

.stat {
    width: calc(22% - 4px);
    height: 100%;
    border: 1px solid white;
    padding: 2px;
    background: black;
}

.statBar {
    background-color: white;
    height: 100%;
}

.statText {
    width: calc(22% - 4px);
    position: absolute;
    font-size: min(1.5vw, 15px);
    color: white;
    translate: 0px -130%;
}

#health {
    text-align: right;
}

#enemyText {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    width: auto;
    font-size: min(6vw, 60px);
    z-index: 1;
    text-align: center;
    top: 7%;
}

.announceAnim {
    animation: announceAnim 2s ease-in forwards;
}

@keyframes announceAnim {
    0% {scale: 50%;}
    10%, 90% {scale: 100%;}
    100% {scale: 0;}
}

.screenshake {
    animation: screenshake calc(0.1s * var(--shakeAmount)) ease-out;
}

@keyframes screenshake {
  0% {transform: translate(calc(1px *  var(--shakeAmount)), calc(1px *  var(--shakeAmount))) rotate(calc(-1deg *  var(--shakeAmount)));}
  50% {transform: translate(calc(-1px *  var(--shakeAmount)), 2px) rotate(calc(1deg *  var(--shakeAmount)));}
  100% {transform: translate(calc(-3px *  var(--shakeAmount)), calc(-1px *  var(--shakeAmount))) rotate(0);}
}

#ant {
    z-index: 1;
    width: 100%;
    height: 100%;
    background-size: 50% auto;
    background-position: 50% 30%;
    background-repeat: no-repeat;
}

.antIdle {
    animation: antWiggle 2.3s ease-in-out infinite;
}

@keyframes antWiggle {
    0%, 100% {transform: scaleX(0.98) scaleY(1.02);}
    50% {transform: scaleX(1.02) scaleY(0.98);}
}

.antSpawnAnim {
    animation: antSpawn 3s ease-in-out forwards;
}

@keyframes antSpawn {
    0%, 100% {transform: scaleX(0.98) scaleY(1.02) translate(0, 0) rotate(0);}
    20%, 80% {transform: scale(0.6) translate(0, 0) rotate(0);}
    35%, 49.9999999% {transform: scale(0.5) translate(-130%, 0) rotate(-20deg);}
    50% {transform: scale(0.5) translate(130%, 0) rotate(20deg);}
}

.antHitAnim {
    animation: antHit 0.4s ease-out forwards;
}

@keyframes antHit {
    from {transform: translate(2%, -7%) scale(0.8) rotate(13deg);}
    to {transform: translate(0, 0) scaleX(0.98) scaleY(1.02) rotate(0);}
}

.closeButton {
    z-index: 5;
    position: absolute;
    right: 1%;
    font-size: min(2.6vw, 25px);
    width: 1.6em;
    line-height: 1.3em;
    text-align: center;
    cursor: pointer;
    background: black;
    margin-top: 1%;
}

#strikeMenu {
    border: 1px solid magenta;
    margin: auto;
    left: 0;
    right: 0;
    width: 60%;
    position: absolute;
    padding: 0 0 1.5% 0;
    bottom: 27%;
    background-color: black;
    color: white;
    z-index: 3;
}

#strikeClose {
    border: 1px solid magenta;
    transition: all 0.2s ease;
}

#strikeClose:hover {
    translate: 0 -0.15em;
    box-shadow: 0 0.15em 0 0 magenta;
}

#strikeFlex {
    display: flex;
    justify-content: center;
    line-height: 0.3em;
    column-gap: 4%
}

#strikeTop {
    line-height: 0.8em;
    width: 100%;
    text-align: center;
    font-size: min(1.8vw, 16px);
}

#critChance {
    color: cyan;
}

.attackButton {
    background: black;
    font-size: min(1.8vw, 16px);
    border: 1px solid magenta;
    padding: 1% 4% 1% 4%;
    min-width: 20%;
    cursor: pointer;
    transition: all 0.2s ease;
}

.attackButton:hover {
    translate: 0 -0.4em;
    box-shadow: 0 0.4em 0 0 magenta;
}

.attackTitle {
    color: magenta;
    text-align: center;
    width: 100%;
    font-size: min(2.6vw, 25px);
    line-height: 1.2em;
}

.attackStat {
    color: cyan;
}

#attackEffects {
    z-index: 2;
    top: 16%;
    width: 36%;
    height: 45%;
    position: absolute;
    background-size: 100% 100%;
    transform: translate(0, 0) scale(1) rotate(0);
}

.swingAnim {
    animation: swing 0.27s ease-out forwards;
    background-image: url("https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/swing.png?raw=true");
}

@keyframes swing {
    from {transform: translate(76%, 3%) scale(1.4) rotate(-10deg)}
    to {transform: translate(76%, 3%) scale(0) rotate(20deg)}
}

.slashAnim {
    animation: slash 0.27s linear forwards;
    background-image: url("https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/slash.png?raw=true");
}

@keyframes slash {
    0% {transform: translate(0, 0) scale(0, 0)}
    20% {transform: translate(20%, 0) scale(0.5, 0.5)}
    80% {transform: translate(120%, 0) scale(1.5, 0.5)}
    100% {transform: translate(185%, 0) scale(0, 0.3)}
}

.stabAnim {
    animation: stab 0.27s ease-out forwards;
    background-image: url("https://github.com/PrestoPesto/prestopesto.github.io/blob/main/fight/assets/stab.png?raw=true");
}

@keyframes stab {
    0% {transform: translate(40%, 30%) scale(0.5)}
    40% {transform: translate(90%, -20%) scale(0.8)}
    80%, 100% {transform: translate(120%, -50%) scale(0)}
}

#studyWarning {
    border: 1px solid cyan;
    left: 25.2%;
    width: 25%;
    height: 7%;
    position: absolute;
    padding: 1% 1% 1% 1%;
    bottom: 18%;
    background-color: black;
    color: white;
    font-size: min(1.8vw, 16px);
    z-index: 3;
}

#studyWarningFlex {
    height: 100%;
    display: flex;
    justify-content: center;
    column-gap: 4%;
}

.studyOption {
    border: 1px solid cyan;
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.studyOption:hover {
    translate: 0 -0.34em;
    box-shadow: 0 0.34em 0 0 cyan;
}

#studyText {
    border: 1px solid cyan;
    margin: auto;
    left: 0;
    right: 0;
    width: 60%;
    position: absolute;
    padding: 0 10px 0 10px;
    bottom: 27%;
    background-color: black;
    color: white;
    font-size: min(1.8vw, 16px);
    z-index: 3;
}

.menuOpenAnim {
    animation: menuOpen 0.3s forwards;
}

.menuCloseAnim {
    animation: menuOpen 0.3s reverse forwards;
}

@keyframes menuOpen {
    from {scale: 0;}
    to {scale: 1;}
}

#studyClose {
    border: 1px solid cyan;
    transition: all 0.2s ease;
}

#studyClose:hover {
    translate: 0 -0.15em;
    box-shadow: 0 0.15em 0 0 cyan;
}




#testing {
    z-index: -100;
    position: absolute; 
    max-width: 800px;
    width: 80%;
    margin: auto;
    position: absolute;
    padding-top: calc(min(60%, 600px) + 10px);
    left: 0;
    right: 0;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    flex-flow: center;
    justify-content: center;
    align-content: flex-start;
    gap: 3px 30px;
}
