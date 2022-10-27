const nagasaki = {
  id: 1,
  position: { x: 850, y: 100 },
  imageSrc: "../images/nagasaki/Idle.png",
  soundSrc: "../sounds/fast-blade.mp3",
  scale: 2.5,
  frames: 4,
  offset: { x: 215, y: 170 },
  sprites: {
    idle: {
      imageSrc: "../images/nagasaki/Idle.png",
      frames: 4,
    },
    run: {
      imageSrc: "../images/nagasaki/Run.png",
      frames: 8,
    },
    jump: {
      imageSrc: "../images/nagasaki/Jump.png",
      frames: 2,
    },
    fall: {
      imageSrc: "../images/nagasaki/Fall.png",
      frames: 2,
    },
    attack1: {
      imageSrc: "../images/nagasaki/Attack1.png",
      frames: 4,
    },
    attack2: {
      imageSrc: "../images/nagasaki/Attack2.png",
      frames: 4,
    },
    takeHit: {
      imageSrc: "../images/nagasaki/Take_hit.png",
      frames: 3,
    },
    death: {
      imageSrc: "../images/nagasaki/Death.png",
      frames: 7,
    },
  },
  attackBox: { width: 160, height: 50, offset: { x: -175, y: 50 } },
  attackSpeed: 0.4,
  damage: 11,
  velocity: { x: 0, y: 0 },
  gravity,
  ctx,
  canvas,
};

const iron_maiden = {
  id: 1,
  position: { x: 850, y: 100 },
  imageSrc: "../images/iron-maiden/IdleLeft.png",
  soundSrc: "../sounds/fast-blade.mp3",
  scale: 2.5,
  frames: 4,
  offset: { x: 170, y: 135 },
  sprites: {
    idle: {
      imageSrc: "../images/iron-maiden/IdleLeft.png",
      frames: 11,
    },
    run: {
      imageSrc: "../images/iron-maiden/RunLeft.png",
      frames: 8,
    },
    jump: {
      imageSrc: "../images/iron-maiden/JumpLeft.png",
      frames: 3,
    },
    fall: {
      imageSrc: "../images/iron-maiden/FallLeft.png",
      frames: 3,
    },
    attack1: {
      imageSrc: "../images/iron-maiden/Attack1Left.png",
      frames: 7,
    },
    attack2: {
      imageSrc: "../images/iron-maiden/Attack2Left.png",
      frames: 7,
    },
    takeHit: {
      imageSrc: "../images/iron-maiden/TakeHitLeft.png",
      frames: 4,
    },
    death: {
      imageSrc: "../images/iron-maiden/Death.png",
      frames: 11,
    },
  },
  attackBox: { width: 160, height: 50, offset: { x: -175, y: 50 } },
  attackSpeed: 0.4,
  damage: 11,
  velocity: { x: 0, y: 0 },
  gravity,
  ctx,
  canvas,
}