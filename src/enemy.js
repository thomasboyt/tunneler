import TunnelLine from "sound-and-vision/line";

export default class Enemy extends TunnelLine {
  constructor(game, settings) {
    settings.width = 7;
    super(game, settings);
  }
}
