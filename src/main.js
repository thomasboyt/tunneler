import Tunnel from "sound-and-vision/tunnel";
import Enemy from "sound-and-vision/enemy";
import Player from "sound-and-vision/player";
module c from "sound-and-vision/constants";

var Game = function(canvasId, width, height) {
  window.coq = new Coquette(this, canvasId, width, height, "#000");

  this.sides = 8;

  coq.entities.create(Tunnel);

  coq.entities.create(Enemy, {
    sector: Math.floor(Math.random() * this.sides),
  });

  coq.entities.create(Player, {
    zindex: 1
  });

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

new Game("container", c.CANVAS_WIDTH, c.CANVAS_HEIGHT);
