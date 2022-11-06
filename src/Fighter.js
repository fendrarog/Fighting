import { Sprite } from "./Sprite.js";
import { dinamicHealthBar, getRndInteger } from "./utils.js";

export class Fighter extends Sprite {
  constructor({
    id,
    position,
    imageSrc,
    soundSrc,
    scale,
    frames,
    offset = { x: 0, y: 0 },
    sprites,
    sounds,
    attackBox = { width: undefined, height: undefined, offset: {} },
    attackSpeed = 1,
    damage,
    velocity,
    color = "red",
    gravity,
    ctx,
    canvas,
  }) {
    super({ position, imageSrc, soundSrc, scale, frames, offset });
    this.id = id;
    this.velocity = velocity;
    this.lastKey;
    this.attackBox = {
      position: { x: this.position.x, y: this.position.y },
      width: attackBox.width,
      height: attackBox.height,
      offset: attackBox.offset,
    };
    this.color = color;
    this.isAttack;
    this.health = 100;
    this.ctx = ctx;
    this.canvas = canvas;
    this.gravity = gravity;
    this.sprites = sprites;

    this.sounds = sounds;
    this.attackCooldown = false;
    this.attackSpeed = attackSpeed * 1000;
    this.damage = damage;
    this.dead = false;
    this.left = false;

    for (const sprite in sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }

    for (const sound in sounds) {
      sounds[sound].audio = new Audio();
      sounds[sound].audio.src = sounds[sound].soundSrc;
    }

    console.log(sprites);
    console.log(sounds);
  }

  update() {
    this.draw();

    if (!this.dead) {
      if (this.left) {
        this.animateFrame();
      } else {
        this.reverseAnimateFrame();
      }
    }

    //turn attack box
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
    if (this.left) {
      this.attackBox.position.x =
        this.position.x + this.width + this.attackBox.offset.x;
    } else {
      this.attackBox.position.x =
        this.position.x - this.attackBox.offset.x - this.attackBox.width;
    }

    //hit box
    /* this.ctx.fillStyle = "black";
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    ); */

    //attack box
    /* this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    ); */

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (
      this.position.y + this.height + this.velocity.y >=
      this.canvas.height - 96
    ) {
      this.velocity.y = 0;
      this.position.y = 360;
    } else {
      this.velocity.y += this.gravity;
    }
  }

  attack() {
    this.switchAudio("attack");
    this.audio.volume = 0.5;
    this.audio.currentTime = 0;
    this.audio.play();
    this.switchSprite(["attack1", "attack2", "attack3"][getRndInteger(0, 2)]);
    this.isAttack = true;
    this.attackCooldown = true;
    setTimeout(() => {
      this.attackCooldown = false;
    }, this.attackSpeed);
    console.log(["attack1", "attack2", "attack3"][getRndInteger(0, 2)]);
  }

  run() {
    if (!this.velocity.y) {
      this.switchAudio("run");
      this.audio.volume = 1;
      this.audio.play();
    }
  }

  jump() {
    this.stopAudio();
    this.switchAudio("jump");
    this.audio.volume = 1;
    this.audio.play();
  }

  takeHit({ character }) {
    character.switchAudio("hit");
    character.audio.volume = 0.5;
    character.stopAudio();
    character.audio.play();

    this.switchAudio("scream");
    this.audio.volume = 0.6;
    this.stopAudio();
    this.audio.play();

    this.health -= character.damage;

    dinamicHealthBar({ character: this });

    if (this.health <= 0) {
      this.switchSprite("death");
      this.health = 0;
    } else {
      this.switchSprite("takeHit");
    }
  }

  stopAudio() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  switchAudio(audio) {
    switch (audio) {
      case "attack":
        if (this.audio !== this.sounds.attack.audio) {
          this.audio = this.sounds.attack.audio;
        }
        break;
      case "run":
        if (this.audio !== this.sounds.run.audio) {
          this.audio = this.sounds.run.audio;
        }
        break;
      case "jump":
        if (this.audio !== this.sounds.jump.audio) {
          this.audio = this.sounds.jump.audio;
        }
        break;
      case "hit":
        if (this.audio !== this.sounds.hit.audio) {
          this.audio = this.sounds.hit.audio;
        }
        break;
      case "scream":
        if (this.audio !== this.sounds.scream.audio) {
          this.audio = this.sounds.scream.audio;
        }
        break;
    }
  }

  switchSprite(sprite) {
    //override when fighter dead
    if (this.image === this.sprites.death.image) {
      if (this.frameCurrent === this.frames - 1) {
        this.dead = true;
      }
      return;
    } else if (this.image === this.sprites.deathRight.image) {
      if (this.frameCurrent === 0) {
        this.dead = true;
      }
      return;
    }

    //override when fighter attack
    if (
      (this.image === this.sprites.attack1?.image &&
        this.frameCurrent < this.sprites.attack1.frames - 1) ||
      (this.image === this.sprites.attack2?.image &&
        this.frameCurrent < this.sprites.attack2.frames - 1) ||
      (this.image === this.sprites.attack3?.image &&
        this.frameCurrent < this.sprites.attack3.frames - 1) ||
      (this.image === this.sprites.attack1Right?.image &&
        this.frameCurrent > 0) ||
      (this.image === this.sprites.attack2Right?.image &&
        this.frameCurrent > 0) ||
      (this.image === this.sprites.attack3Right?.image && this.frameCurrent > 0)
    )
      return;

    //override when fighter gets hit
    if (
      (this.image === this.sprites.takeHit.image &&
        this.frameCurrent < this.sprites.takeHit.frames - 1) ||
      (this.image === this.sprites.takeHitRight.image && this.frameCurrent > 0)
    )
      return;

    switch (sprite) {
      case "idle":
        if (this.left) {
          if (this.image !== this.sprites.idle.image) {
            this.image = this.sprites.idle.image;
            this.frames = this.sprites.idle.frames;
            this.frameCurrent = 0;
          }
          break;
        } else {
          if (this.image !== this.sprites.idleRight.image) {
            this.image = this.sprites.idleRight.image;
            this.frames = this.sprites.idleRight.frames;
            this.frameCurrent = this.frames - 1;
          }
          break;
        }
      case "run":
        if (this.left) {
          if (this.image !== this.sprites.run.image) {
            this.image = this.sprites.run.image;
            this.frames = this.sprites.run.frames;
            this.frameCurrent = 0;
          }
          break;
        } else {
          if (this.image !== this.sprites.runRight.image) {
            this.image = this.sprites.runRight.image;
            this.frames = this.sprites.runRight.frames;
            this.frameCurrent = this.frames - 1;
          }
          break;
        }
      case "jump":
        if (this.left) {
          if (this.image !== this.sprites.jump.image) {
            this.image = this.sprites.jump.image;
            this.frames = this.sprites.jump.frames;
            this.frameCurrent = 0;
          }
          break;
        } else {
          if (this.image !== this.sprites.jumpRight.image) {
            this.image = this.sprites.jumpRight.image;
            this.frames = this.sprites.jumpRight.frames;
            this.frameCurrent = this.frames - 1;
          }
          break;
        }
      case "fall":
        if (this.left) {
          if (this.image !== this.sprites.fall.image) {
            this.image = this.sprites.fall.image;
            this.frames = this.sprites.fall.frames;
            this.frameCurrent = 0;
          }
          break;
        } else {
          if (this.image !== this.sprites.fallRight.image) {
            this.image = this.sprites.fallRight.image;
            this.frames = this.sprites.fallRight.frames;
            this.frameCurrent = this.frames - 1;
          }
          break;
        }
      case "attack1":
        if (this.left) {
          if (this.image !== this.sprites.attack1.image) {
            this.image = this.sprites.attack1.image;
            this.frames = this.sprites.attack1.frames;
            this.frameCurrent = 0;
          }
          break;
        } else {
          if (this.image !== this.sprites.attack1Right.image) {
            this.image = this.sprites.attack1Right.image;
            this.frames = this.sprites.attack1Right.frames;
            this.frameCurrent = this.frames - 1;
          }
          break;
        }
      case "attack2":
        if (this.left) {
          if (this.image !== this.sprites.attack2.image) {
            this.image = this.sprites.attack2.image;
            this.frames = this.sprites.attack2.frames;
            this.frameCurrent = 0;
          }
          break;
        } else {
          if (this.image !== this.sprites.attack2Right.image) {
            this.image = this.sprites.attack2Right.image;
            this.frames = this.sprites.attack2Right.frames;
            this.frameCurrent = this.frames - 1;
          }
          break;
        }
      case "attack3":
        if (this.left) {
          if (this.image !== this.sprites.attack3.image) {
            this.image = this.sprites.attack3.image;
            this.frames = this.sprites.attack3.frames;
            this.frameCurrent = 0;
          }
          break;
        } else {
          if (this.image !== this.sprites.attack3Right.image) {
            this.image = this.sprites.attack3Right.image;
            this.frames = this.sprites.attack3Right.frames;
            this.frameCurrent = this.frames - 1;
          }
          break;
        }
      case "takeHit":
        if (this.left) {
          if (this.image !== this.sprites.takeHit.image) {
            this.image = this.sprites.takeHit.image;
            this.frames = this.sprites.takeHit.frames;
            this.frameCurrent = 0;
          }
          break;
        } else {
          if (this.image !== this.sprites.takeHitRight.image) {
            this.image = this.sprites.takeHitRight.image;
            this.frames = this.sprites.takeHitRight.frames;
            this.frameCurrent = this.frames - 1;
          }
          break;
        }
      case "death":
        if (this.left) {
          if (this.image !== this.sprites.death.image) {
            this.image = this.sprites.death.image;
            this.frames = this.sprites.death.frames;
            this.frameCurrent = 0;
          }
          break;
        } else {
          if (this.image !== this.sprites.deathRight.image) {
            this.image = this.sprites.deathRight.image;
            this.frames = this.sprites.deathRight.frames;
            this.frameCurrent = this.frames - 1;
          }
          break;
        }
    }
  }
}
