export default class AnimatedSubtitle {
  constructor(text, options = {}) {
    if (!text || typeof text !== "string") {
      throw new Error("AnimatedSubtitle requires a valid text string.");
    }

    this.text = text;
    this.fontSize = options.fontSize ?? 36;
    this.color = options.color ?? "#dddddd";
    this.duration = options.duration ?? 2;
    this.fontFamily = options.fontFamily ?? "Arial";
    this.fontWeight = options.fontWeight ?? "normal";
    this.align = options.align ?? "center";
  }

  render() {
    return {
      type: "subtitle",
      text: this.text,
      fontSize: this.fontSize,
      color: this.color,
      duration: this.duration,
      fontFamily: this.fontFamily,
      fontWeight: this.fontWeight,
      align: this.align,
    };
  }
}