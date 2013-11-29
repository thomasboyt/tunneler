import Tunnel from "sound-and-vision/tunnel";

var Game = function(canvasId, width, height) {
  window.coq = new Coquette(this, canvasId, width, height, "#000");

  coq.entities.create(Tunnel);
};

new Game("container", 500, 500);
