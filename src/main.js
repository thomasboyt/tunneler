import Tunnel from "sound-and-vision/tunnel";
import Enemy from "sound-and-vision/enemy";

var Game = function(canvasId, width, height) {
  window.coq = new Coquette(this, canvasId, width, height, "#000");

  this.sides = 8;

  coq.entities.create(Tunnel);

  this.spawnTimerInc = 0;
};

Game.prototype.update = function(dt) {
  this.spawnTimerInc += dt;
  if (this.spawnTimerInc > 300) {
    coq.entities.create(Enemy, {
      sector: Math.floor(Math.random() * this.sides),
    });
    this.spawnTimerInc = 0;
  }
};

new Game("container", 500, 500);
