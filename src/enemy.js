import TunnelLine from "sound-and-vision/line";

class Enemy extends TunnelLine {
  constructor(game, settings) {
    settings.width = 7;
    super(game, settings);
  }
}

export default Enemy;
