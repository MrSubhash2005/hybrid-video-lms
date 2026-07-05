export default class SlideTransition {
  constructor(direction = "left", duration = 1) {
    this.direction = direction;
    this.duration = duration;
  }

  apply() {
    return {
      type: "slide",
      direction: this.direction,
      duration: this.duration,
    };
  }
}