import {drawRegularPolygon, drawConnectingLines} from "sound-and-vision/util";

var Tunnel = function(game, settings) {
  this.game = game;
};

Tunnel.prototype.draw = function(ctx) {
  ctx.strokeStyle = '#fff';
  ctx.fillStyle = '#fff';

  // enclosing octagon
  var outerPts = drawRegularPolygon(ctx, 8, 240, 250, 250, Math.PI/8);

  // center octagon
  var centerPts = drawRegularPolygon(ctx, 8, 10, 250, 250, Math.PI/8);

  // draw lines from center to outer pts
  drawConnectingLines(ctx, outerPts, centerPts, 250, 250, Math.PI/8);
};

export default Tunnel;
