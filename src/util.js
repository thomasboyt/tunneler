export function getRegularPolygonPts(sides, radius, xCenter, yCenter) {
  var pts = [];

  for (var i = 1; i <= sides; i += 1) {
    var x = xCenter + radius * Math.cos(i * 2 * Math.PI / sides);
    var y = yCenter + radius * Math.sin(i * 2 * Math.PI / sides);
    pts.push([x,y]);
  }

  return pts;
}

export function drawRegularPolygon(ctx, sides, radius, xCenter, yCenter) {
  var pts = [];

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

  return pts;
}

export function drawConnectingLines(ctx, aPts, bPts) {
  for (var i=0; i < aPts.length; i++) {
    var aPt = aPts[i];
    var bPt = bPts[i];

    ctx.beginPath();
    ctx.moveTo(aPt[0], aPt[1]);
    ctx.lineTo(bPt[0], bPt[1]);
    ctx.stroke();
  }
}

function getRegularAngle(sides) {
  return (180 + (sides - 3) * 180) / sides;
}

export function getOuterPolygonSideLength(sides, yOffset, innerRadius) {
  // Get bottom angle of trapezoid
  var botAngle = getRegularAngle(sides) / 2;

  // Get top length of trapezoid of and the offset between the bottom and top
  // edges
  var topLength = 2 * innerRadius * Math.sin(180/sides);

  // Offsets on either side of the line
  return yOffset / Math.tan(botAngle / (180/Math.PI)) * 2;
}
