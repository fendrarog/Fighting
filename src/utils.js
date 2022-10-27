import { player, enemy } from "./Game.js";

export function rectCollision({ rect1, rect2 }) {
  return (
    (rect1.left
      ? rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x
      : rect1.attackBox.position.x <= rect2.position.x + rect2.width) &&
    (rect1.left
      ? rect1.attackBox.position.x + rect1.width <=
        rect2.position.x + rect2.width
      : rect1.attackBox.position.x + rect1.attackBox.width >=
        rect2.position.x + rect2.width) &&
    rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
    rect1.attackBox.position.y <= rect2.position.y + rect2.height
  );
}

export function setWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  document.querySelector("#announcement").style.display = "flex";
  if (player.health === enemy.health) {
    document.querySelector("#announcement").innerHTML = "Tie";
  } else if (player.health > enemy.health) {
    document.querySelector("#announcement").innerHTML = "Player 1 Wins";
  } else if (player.health < enemy.health) {
    document.querySelector("#announcement").innerHTML = "Player 2 Wins";
  }
}

let time = 40;
export let timerId;
export function launchTimer() {
  timerId = setTimeout(launchTimer, 1000);
  if (time > 0) {
    time--;
    document.querySelector("#timer").innerHTML = time;
  }
  if (time === 0) {
    setWinner({ player, enemy, timerId });
  }
}

export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function dinamicHealthBar({ character }) {
  document.querySelector(
    `#${["player", "enemy"][character.id]}HealthSpent`
  ).style.backgroundColor = changeColorHealthBar({ character });
}
function changeColorHealthBar({ character }) {
  switch (true) {
    case character.health <= 70 && character.health > 40:
      return "#EF4444";
    case character.health <= 40 && character.health > 20:
      return "#DC2626";
    case character.health < 20:
      return "#B91C1C";
    default:
      return "#F87171";
  }
}
