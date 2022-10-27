import { Fighter } from "./Fighter.js";
import { Sprite } from "./Sprite.js";
import { launchTimer, rectCollision, setWinner, timerId } from "./utils.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./images/background.png",
  ctx,
});

const shop = new Sprite({
  position: { x: 635, y: 159 },
  imageSrc: "./images/shop.png",
  scale: 2.5,
  frames: 6,
  ctx,
});

export const player = new Fighter({
  id: 0,
  position: { x: 50, y: 100 },
  imageSrc: "./images/samuro/Idle.png",
  soundSrc: "./sounds/slow-blade.mp3",
  scale: 2.5,
  frames: 8,
  offset: { x: 225, y: 186 },
  sprites: {
    idle: {
      imageSrc: "./images/samuro/Idle.png",
      frames: 8,
    },
    run: {
      imageSrc: "./images/samuro/Run.png",
      frames: 8,
    },
    jump: {
      imageSrc: "./images/samuro/Jump.png",
      frames: 2,
    },
    fall: {
      imageSrc: "./images/samuro/Fall.png",
      frames: 2,
    },
    attack1: {
      imageSrc: "././images/samuro/Attack1.png",
      frames: 6,
    },
    attack2: {
      imageSrc: "./images/samuro/Attack2.png",
      frames: 6,
    },
    attack3: {
      imageSrc: "./images/samuro/Attack1.png",
      frames: 6,
    },
    takeHit: {
      imageSrc: "./images/samuro/Take_hit_white_frame.png",
      frames: 4,
    },
    death: {
      imageSrc: "./images/samuro/Death.png",
      frames: 6,
    },
    idleRight: {
      imageSrc: "./images/samuro/IdleRight.png",
      frames: 8,
    },
    runRight: {
      imageSrc: "./images/samuro/RunRight.png",
      frames: 8,
    },
    jumpRight: {
      imageSrc: "./images/samuro/JumpRight.png",
      frames: 2,
    },
    fallRight: {
      imageSrc: "./images/samuro/FallRight.png",
      frames: 2,
    },
    attack1Right: {
      imageSrc: "./images/samuro/Attack1Right.png",
      frames: 6,
    },
    attack2Right: {
      imageSrc: "./images/samuro/Attack2Right.png",
      frames: 6,
    },
    attack3Right: {
      imageSrc: "./images/samuro/Attack1Right.png",
      frames: 6,
    },
    takeHitRight: {
      imageSrc: "./images/samuro/Take_hit_white_frameRight.png",
      frames: 4,
    },
    deathRight: {
      imageSrc: "./images/samuro/DeathRight.png",
      frames: 6,
    },
  },
  sounds: {
    attack: {
      soundSrc: "./sounds/slow-blade.mp3",
    },
    run: {
      soundSrc: "./sounds/run.mp3",
    },
    jump: {
      soundSrc: "./sounds/jump.mp3",
    },
  },
  attackBox: { width: 170, height: 50, offset: { x: 25, y: 25 } },
  attackSpeed: 1,
  damage: 24,
  velocity: { x: 0, y: 0 },
  color: "green",
  gravity,
  ctx,
  canvas,
});

export const enemy = new Fighter({
  id: 1,
  position: { x: 925, y: 100 },
  imageSrc: "./images/storm/Idle.png",
  soundSrc: "./sounds/grom.mp3",
  scale: 2.5,
  frames: 4,
  offset: { x: 180, y: 133 },
  sprites: {
    idle: {
      imageSrc: "./images/storm/Idle.png",
      frames: 10,
    },
    run: {
      imageSrc: "./images/storm/Run.png",
      frames: 8,
    },
    jump: {
      imageSrc: "./images/storm/Jump.png",
      frames: 3,
    },
    fall: {
      imageSrc: "./images/storm/Fall.png",
      frames: 3,
    },
    attack1: {
      imageSrc: "./images/storm/Attack1.png",
      frames: 7,
    },
    attack2: {
      imageSrc: "./images/storm/Attack2.png",
      frames: 7,
    },
    attack3: {
      imageSrc: "./images/storm/Attack3.png",
      frames: 8,
    },
    takeHit: {
      imageSrc: "./images/storm/TakeHit_with_white_frame.png",
      frames: 3,
    },
    death: {
      imageSrc: "./images/storm/Death.png",
      frames: 7,
    },
    idleRight: {
      imageSrc: "./images/storm/IdleRight.png",
      frames: 10,
    },
    runRight: {
      imageSrc: "./images/storm/RunRight.png",
      frames: 8,
    },
    jumpRight: {
      imageSrc: "./images/storm/JumpRight.png",
      frames: 3,
    },
    fallRight: {
      imageSrc: "./images/storm/FallRight.png",
      frames: 3,
    },
    attack1Right: {
      imageSrc: "./images/storm/Attack1Right.png",
      frames: 7,
    },
    attack2Right: {
      imageSrc: "./images/storm/Attack2Right.png",
      frames: 7,
    },
    attack3Right: {
      imageSrc: "./images/storm/Attack3Right.png",
      frames: 8,
    },
    takeHitRight: {
      imageSrc: "./images/storm/TakeHit_with_white_frameRight.png",
      frames: 3,
    },
    deathRight: {
      imageSrc: "./images/storm/DeathRight.png",
      frames: 7,
    },
  },
  sounds: {
    attack: {
      soundSrc: "./sounds/grom.mp3",
    },
    run: {
      soundSrc: "./sounds/run.mp3",
    },
    jump: {
      soundSrc: "./sounds/jump.mp3",
    },
  },
  attackBox: { width: 110, height: 50, offset: { x: 10, y: 25 } },
  attackSpeed: 0.4,
  damage: 11,
  velocity: { x: 0, y: 0 },
  gravity,
  ctx,
  canvas,
});

launchTimer();

function game() {
  window.requestAnimationFrame(game);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  background.update();
  shop.update();

  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.update();
  enemy.update();

  //turn character
  if (player.position.x + player.width / 2 < enemy.position.x) {
    player.left = true;
    enemy.left = false;
  } else if (player.position.x + player.width / 2 > enemy.position.x) {
    player.left = false;
    enemy.left = true;
  }

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // player movement
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -2;
    player.switchSprite("run");
    player.switchAudio("run");
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 2;
    player.switchSprite("run");
    player.switchAudio("run");
  } else {
    player.switchSprite("idle");
  }

  // player jumping
  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }

  // enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -2;
    enemy.switchSprite("run");
    enemy.switchAudio("run");
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 2;
    enemy.switchSprite("run");
    enemy.switchAudio("run");
  } else {
    enemy.switchSprite("idle");
  }

  // enemy jumping
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  }

  // detect for collision & enemy take hit
  if (
    rectCollision({ rect1: player, rect2: enemy }) &&
    player.isAttack &&
    player.frameCurrent === 4
  ) {
    enemy.takeHit({ character: player });
    player.isAttack = false;
    /* document.querySelector("#enemyHealth").style.width = `${enemy.health}%`; */
    //change to gasp
    gsap.to("#enemyHealth", { width: `${enemy.health}%` });
  }

  //miss by player
  if (player.isAttack && player.frameCurrent === 4) {
    player.isAttack = false;
  }

  // detect for collision & player take hit
  if (
    rectCollision({ rect1: enemy, rect2: player }) &&
    enemy.isAttack &&
    enemy.frameCurrent === 4
  ) {
    player.takeHit({ character: enemy });
    enemy.isAttack = false;
    /* document.querySelector("#playerHealth").style.width = `${player.health}%`; */
    //change to gasp
    gsap.to("#playerHealth", { width: `${player.health}%` });
  }

  //miss by enemy
  if (enemy.isAttack && enemy.frameCurrent === 4) {
    enemy.isAttack = false;
  }

  // end game by health
  if (enemy.health <= 0 || player.health <= 0) {
    setWinner({ player, enemy, timerId });
  }

  console.log(enemy.velocity);
}

window.requestAnimationFrame(game);

const keys = {
  a: { pressed: false },
  d: { pressed: false },
  ArrowRight: { pressed: false },
  ArrowLeft: { pressed: false },
};

window.addEventListener("keydown", (event) => {
  if (!player.dead) {
    switch (event.code) {
      case "KeyD":
        keys.d.pressed = true;
        player.lastKey = "d";
        player.run();
        break;
      case "KeyA":
        keys.a.pressed = true;
        player.lastKey = "a";
        player.run();
        break;
      case "KeyW":
        if (
          player.position.y + player.height + player.velocity.y >=
          canvas.height - 96
        ) {
          player.velocity.y = -10;
          player.jump();
        }
        break;
      case "Space":
        if (player.attackCooldown === false) {
          player.attack();
        }
        break;
    }
  }

  if (!enemy.dead) {
    switch (event.code) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        enemy.run();
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        enemy.run();
        break;
      case "ArrowUp":
        if (
          enemy.position.y + enemy.height + enemy.velocity.y >=
          canvas.height - 96
        ) {
          enemy.velocity.y = -10;
          enemy.jump();
        }
        break;
      case "Enter":
        if (enemy.attackCooldown === false) {
          enemy.attack();
        }
        break;
    }
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "KeyD":
      keys.d.pressed = false;
      player.stopAudio();
      break;
    case "KeyA":
      keys.a.pressed = false;
      player.stopAudio();
      break;

    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      enemy.stopAudio();
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      enemy.stopAudio();
      break;
  }
});
