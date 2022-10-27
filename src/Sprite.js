export class Sprite {
  constructor({
    position,
    imageSrc,
    soundSrc,
    scale = 1,
    frames = 1,
    offset = { x: 0, y: 0 },
    ctx,
  }) {
    this.position = position;
    this.height = 120;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSrc;
    this.audio = new Audio();
    this.audio.src = soundSrc;
    this.ctx = ctx;
    this.scale = scale;
    this.frames = frames;
    this.frameCurrent = 0;
    this.framesAccumulation = 0;
    this.framesDelay = 7;
    this.offset = offset;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.frameCurrent * (this.image.width / this.frames),
      0,
      this.image.width / this.frames,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.frames) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrame() {
    this.framesAccumulation++;
    if (this.framesAccumulation % this.framesDelay === 0) {
      if (this.frameCurrent < this.frames - 1) {
        this.frameCurrent++;
      } else {
        this.frameCurrent = 0;
      }
    }
  }

  reverseAnimateFrame() {
    this.framesAccumulation++;
    if (this.framesAccumulation % this.framesDelay === 0) {
      if (this.frameCurrent > 0) {
        this.frameCurrent--;
      } else {
        this.frameCurrent = this.frames - 1;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrame();
  }
}
