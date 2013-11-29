var Game = function(canvasId, width, height) {
  window.coq = new Coquette(this, canvasId, width, height, "#000");
};

new Game("container", 500, 500);
