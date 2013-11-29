export function drawRegularPolygon(ctx, sides, radius, xCenter, yCenter, rot) {
  var pts = [];

  ctx.save();

  if (rot) {
    ctx.translate(xCenter, yCenter);
    ctx.rotate(rot);
    ctx.translate(-xCenter, -yCenter);
  }

  ctx.beginPath();

  // set starting position
  ctx.moveTo(xCenter + radius, yCenter);

  for (var i = 1; i <= sides; i += 1) {
    var x = xCenter + radius * Math.cos(i * 2 * Math.PI / sides);
    var y = yCenter + radius * Math.sin(i * 2 * Math.PI / sides);
    pts.push([x,y]);
    ctx.lineTo(x, y);
  }

  ctx.stroke();
  ctx.restore();

  return pts;
}

export function drawConnectingLines(ctx, aPts, bPts, xCenter, yCenter, rot) {
  ctx.save();

  if (rot) {
    ctx.translate(xCenter, yCenter);
    ctx.rotate(rot);
    ctx.translate(-xCenter, -yCenter);
  }

  for (var i=0; i < aPts.length; i++) {
    var aPt = aPts[i];
    var bPt = bPts[i];

    ctx.beginPath();
    ctx.moveTo(aPt[0], aPt[1]);
    ctx.lineTo(bPt[0], bPt[1]);
    ctx.stroke();
  }

  ctx.restore();
}