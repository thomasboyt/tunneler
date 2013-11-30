import {getOuterPolygonSideLength} from "sound-and-vision/util";
module c from "sound-and-vision/constants";

class Player {
  constructor(game, settings) {
    this.sides = game.sides;
    this.sector = 5;  // TODO: generalize for all polygons
    this.zindex = settings.zindex;
  }

  update(dt) {
    var max = this.sides - 1;

    var next;
    if (coq.inputter.pressed(coq.inputter.RIGHT_ARROW)) {
      next = this.sector - 1;
      this.sector = next < 0 ? max : next;
    } else if (coq.inputter.pressed(coq.inputter.LEFT_ARROW)) {
      next = this.sector + 1;
      this.sector = next > max ? 0 : next;
    }
  }

  draw(ctx) {
    ctx.save();

    ctx.strokeStyle = 'lime';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'bevel';

    // Rotate
    var rotDeg = ((180 + (this.sides - 3) * 180) / this.sides);
    
    // Rotate further based on sector
    rotDeg += (360 / this.sides) * this.sector;
    var rot = Math.PI/180 * rotDeg;

    ctx.translate(c.ORIGIN_X, c.ORIGIN_Y);
    ctx.rotate(rot);
    ctx.translate(-c.ORIGIN_X, -c.ORIGIN_Y);

    ctx.beginPath();

    var yOffset = c.OUTER_RADIUS - c.INNER_RADIUS;
    var len = getOuterPolygonSideLength(this.sides, 200, c.INNER_RADIUS);

    ctx.moveTo(c.ORIGIN_X - len/2, c.ORIGIN_Y + 200);
    ctx.lineTo(c.ORIGIN_X + len/2, c.ORIGIN_Y + 200);
    ctx.stroke();

    ctx.restore();
  }
}

export default Player;
