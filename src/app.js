// nickname and email validation
function validateName() {
  const name = document.getElementById("name").value;
  if (name === "") {
    document.getElementById("name-error").innerHTML = "Name cannot be empty";
    return false;
  }
  document.getElementById("name-error").innerHTML = "";
  return true;
}

function validateEmail() {
  const email = document.getElementById("email").value;
  if (email === "") {
    document.getElementById("email-error").innerHTML = "Email cannot be empty";
    return false;
  }
  if (!email.includes("@") || !email.includes(".")) {
    document.getElementById("email-error").innerHTML = "Invalid email format";
    return false;
  }
  document.getElementById("email-error").innerHTML = "";
  return true;
}

document.getElementById("register").addEventListener("click", function (event) {
  event.preventDefault();

  if (validateName() && validateEmail()) {
    // hide the registration form and show the game display
    document.getElementById("registration").style.display = "none";
    document.getElementById("game-display").style.display = "block";

    // start the game with the player's name
    const name = document.getElementById("name").value;
    const game = new Game(name, levels);
  }
});

// Game functions
// enemy class for each level
class Enemy {
  constructor(name, health, image) {
    this.name = name;
    this.health = health;
    this.image = image;
  }

  // function to reduce enemy health when clicked by user
  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
    }
  }
}

// level class
class Level {
  constructor(number, targetClicks, enemy) {
    this.number = number;
    this.targetClicks = targetClicks;
    this.enemy = enemy;
  }
}

// game class
class Game {
  constructor(name, levels) {
    this.name = name;
    this.levels = levels;
    this.currentLevel = 0;
    this.score = 0;
    this.enemyDisplay = document.getElementById("enemy-display");
    this.scoreDisplay = document.getElementById("score-display");
    this.messageDisplay = document.getElementById("message-display");
    this.nameDisplay = document.getElementById("name-display");

    // set the name display
    this.nameDisplay.innerText = `Player: ${this.name}`;

    // bind event listener to monster display
    this.enemyDisplay.addEventListener("click", () => {
      this.handleMonsterClick();
    });

    // initialize the game
    this.initialize();
  }

  initialize() {
    // displaying initial score
    this.scoreDisplay.innerText = `Score: ${this.score}`;

    // displaying initial level and monster
    this.displayLevel();
    this.displayMonster();
  }

  handleMonsterClick() {
    // increment score and updating score display
    this.score++;
    this.scoreDisplay.innerText = `Score: ${this.score}`;

    // reduce enemy health and update health display
    const enemy = this.levels[this.currentLevel].enemy;
    enemy.takeDamage(5);
    const healthDisplay = document.getElementById("health-display");
    healthDisplay.innerHTML = `Health: ${enemy.health}`;

    // check if current level target has been reached or enemy has been defeated
    if (this.score >= this.levels[this.currentLevel].targetClicks) {
      // displaying message and progress to next level
      this.messageDisplay.innerText = `Congratulations! You've reached level ${
        this.levels[this.currentLevel].number + 2
      }.`;
      this.currentLevel++;
      if (this.currentLevel === this.levels.length) {
        // last level completed, player won the game
        this.enemyDisplay.innerHTML = "";
        this.messageDisplay.innerText = `Congratulations! You won! Your score: ${this.score}`;
      } else {
        // show next level monster
        this.displayLevel();
        this.displayMonster();
      }
    }
  }

  displayLevel() {
    // displaying current level
    const levelDisplay = document.getElementById("level-display");
    levelDisplay.innerText = `Level ${
      this.levels[this.currentLevel].number + 1
    }`;
  }

  displayMonster() {
    // displaying current monster
    const enemyDisplay = document.getElementById("enemy-display");
    const enemy = this.levels[this.currentLevel].enemy;
    const healthDisplay = document.getElementById("health-display");
    healthDisplay.innerHTML = `Health: ${enemy.health}`;
    enemyDisplay.innerHTML = `
      <h3>Defeat the enemy - ${enemy.name}!</h3>
      <img src="./src/img/${enemy.image}" alt="${enemy.name}">
    `;
  }
}

// levels and enemies
const levels = [
  new Level(0, 10, new Enemy("Scary Bat", 50, "enemy1.png")),
  new Level(1, 30, new Enemy("Cat", 100, "enemy2.png")),
  new Level(2, 60, new Enemy("Whale", 150, "enemy3.png")),
  new Level(3, 100, new Enemy("Goblin", 200, "enemy4.png")),
  new Level(4, 200, new Enemy("Dragon", 500, "enemy5.png")),
];
