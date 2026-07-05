export default class ZoomTransition {
  constructor(scale = 1.2, duration = 1) {
    this.scale = scale;
    this.duration = duration;
  }

  apply() {
    return {
      type: "zoom",
      scale: this.scale,
      duration: this.duration,
    };
  }
}