export default class FadeTransition {
  constructor(duration = 1) {
    this.duration = duration;
  }

  apply() {
    return {
      type: "fade",
      duration: this.duration,
    };
  }
}