import {drawRegularPolygon, drawConnectingLines} from "sound-and-vision/util";
import TunnelLine from 'sound-and-vision/line';

module c from "sound-and-vision/constants";

var Tunnel = function(game, settings) {
  this.game = game;
  this.sides = game.sides;

  this.generateGridlineTimer = 0;
};

Tunnel.prototype.update = function(dt) {
  this.generateGridlineTimer += dt;

  if (this.generateGridlineTimer > 1000) {
    this.generateGridlineTimer = 0;

    // generate a tunnel line for each side
    for (var i = 0; i < this.sides; i++) {
      coq.entities.create(TunnelLine, {
        color: 'white',
        sector: i
      });
    }
  }
};

Tunnel.prototype.draw = function(ctx) {
  ctx.strokeStyle = '#fff';
  ctx.fillStyle = '#fff';
  ctx.lineWidth = 1;

  ctx.save();

  var rotDeg = (180 + (this.sides - 3) * 180) / this.sides / 2;
  var rot = Math.PI/180 * rotDeg;

  ctx.translate(c.ORIGIN_X, c.ORIGIN_Y);
  ctx.rotate(rot);
  ctx.translate(-c.ORIGIN_X, -c.ORIGIN_Y);

  // enclosing shape
  this.outerPts = drawRegularPolygon(ctx, this.sides, c.OUTER_RADIUS, c.ORIGIN_X, c.ORIGIN_Y);

  // center shape
  this.centerPts = drawRegularPolygon(ctx, this.sides, c.INNER_RADIUS, c.ORIGIN_X, c.ORIGIN_Y);

  // draw lines from center to outer pts
  drawConnectingLines(ctx, this.outerPts, this.centerPts);
  
  ctx.restore();
};

export default Tunnel;
