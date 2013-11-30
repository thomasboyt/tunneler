import {drawRegularPolygon, drawConnectingLines} from "sound-and-vision/util";

var Tunnel = function(game, settings) {
  this.game = game;
  this.sides = game.sides;
};

Tunnel.prototype.draw = function(ctx) {
  ctx.strokeStyle = '#fff';
  ctx.fillStyle = '#fff';
  ctx.lineWidth = 1;

  ctx.save();

  var rotDeg = (180 + (this.sides - 3) * 180) / this.sides / 2;
  var rot = Math.PI/180 * rotDeg;

  ctx.translate(250, 250);
  ctx.rotate(rot);
  ctx.translate(-250, -250);

  // enclosing shape
  var outerPts = drawRegularPolygon(ctx, this.sides, 240, 250, 250);

  // center shape
  var centerPts = drawRegularPolygon(ctx, this.sides, 10, 250, 250);

  // draw lines from center to outer pts
  drawConnectingLines(ctx, outerPts, centerPts, 250, 250);
  
  ctx.restore();
};

export default Tunnel;
