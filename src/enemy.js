var Enemy = function(game, settings) {
  this.sides = game.sides;
  this.sector = settings.sector;
  this.pos = 0;

  this.yOffset = 0;
};

Enemy.prototype.update = function(dt) {
  this.yOffset += (dt / 15);

  if (this.yOffset >= 220) {
    coq.entities.destroy(this);
  }
};

Enemy.prototype.draw = function(ctx) {
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 3;

  ctx.save();

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
  ctx.moveTo(250 - dist, 250 + this.yOffset);
  ctx.lineTo(250 + dist, 250 + this.yOffset);
  ctx.stroke();

  ctx.restore();
};

function getRegularAngle(sides) {
  return (180 + (sides - 3) * 180) / sides;
}

export default Enemy;
