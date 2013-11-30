import {getOuterPolygonSideLength} from "sound-and-vision/util";

module c from "sound-and-vision/constants";

export default class Line {
  constructor(game, settings) {
    this.sides = game.sides;
    this.sector = settings.sector;
    this.pos = 0;

    this.color = settings.color || 'red';
    this.width = settings.width || 1;
    this.zindex = settings.zindex;

    this.yOffset = 0;
  }

  update(dt) {
    var step = (dt / 15);

    // increase step faster as the yOffset increases to maintain illusion of constant speed
    this.yOffset += step + this.yOffset * 0.015;

    if (this.yOffset >= 220) {
      coq.entities.destroy(this);
    }
  }

  draw(ctx) {
    ctx.save();

    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;

    // Rotate
    var rotDeg = ((180 + (this.sides - 3) * 180) / this.sides);
    
    // Rotate further based on sector
    rotDeg += (360 / this.sides) * this.sector;
    var rot = Math.PI/180 * rotDeg;

    ctx.translate(250, 250);
    ctx.rotate(rot);
    ctx.translate(-250, -250);

    var len = getOuterPolygonSideLength(this.sides, this.yOffset, c.INNER_RADIUS);

    // Draw line
    ctx.beginPath();
    ctx.moveTo(250 - len/2, 250 + this.yOffset);
    ctx.lineTo(250 + len/2, 250 + this.yOffset);
    ctx.stroke();

    ctx.restore();
  }
}
