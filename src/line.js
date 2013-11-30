module c from "sound-and-vision/constants";

class Line {
  constructor(game, settings) {
    this.sides = game.sides;
    this.sector = settings.sector;
    this.pos = 0;

    this.color = settings.color || 'red';
    this.width = settings.width || 1;

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

    // Get bottom angle and top angle of trapezoid
    var botAngle = getRegularAngle(this.sides) / 2;
    var topAngle = 90 - botAngle;

    // Get top length of trapezoid of and the offset between the bottom and top
    // edges
    var innerRadius = 10;
    var topLength = 2 * innerRadius * Math.sin(180/this.sides);
    var offset = (innerRadius - topLength)/2;

    // Get the actual x coord of the line
    var x = 250 - offset/2;

    // Offsets on either side of the line
    var dist = this.yOffset / Math.tan(botAngle / (180/Math.PI));

    // Draw line
    ctx.beginPath();
    ctx.moveTo(250 - dist, 250 + this.yOffset);
    ctx.lineTo(250 + dist, 250 + this.yOffset);
    ctx.stroke();

    ctx.restore();
  }
}

function getRegularAngle(sides) {
  return (180 + (sides - 3) * 180) / sides;
}

export default Line;
