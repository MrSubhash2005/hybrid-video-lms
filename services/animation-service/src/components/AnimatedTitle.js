export default class AnimatedTitle {
  constructor(text, options = {}) {
    if (!text || typeof text !== "string") {
      throw new Error("AnimatedTitle requires a valid text string.");
    }

    this.text = text;
    this.fontSize = options.fontSize ?? 64;
    this.color = options.color ?? "#ffffff";
    this.duration = options.duration ?? 2;
    this.fontFamily = options.fontFamily ?? "Arial";
    this.fontWeight = options.fontWeight ?? "bold";
    this.align = options.align ?? "center";
  }

  render() {
    return {
      type: "title",
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