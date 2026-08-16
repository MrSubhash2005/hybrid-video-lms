export const colors = {
  background: "#F7F3E9",
  primaryAccent: "#16A34A",
  secondaryAccent: "#65A30D",
  tertiaryAccent: "#D97706",
  text: "#1C1917",
  muted: "#A8A29E",
  nodeBorder: "#292524",
  codeBlockBackground: "#EDE8DA",
} as const;

export const fonts = {
  heading: "Poppins",
  body: "Poppins",
  code: "JetBrains Mono",
} as const;

export const fontWeights = {
  headingWeight: 600,
  bodyWeight: 400,
} as const;

export const animationDurations = {
  fadeIn: 0.4,
  fadeOut: 0.4,
  highlight: 0.3,
  moveTo: 0.6,
  transform: 0.6,
  pointerMove: 0.5,
} as const;

export const easing = "easeInOut" as const;

export const canvas = {
  width: 1920,
  height: 1080,
} as const;

export const nodeStyle = {
  borderRadius: 12,
  borderWidth: 2,
  shadowColor: "rgba(0, 0, 0, 0.05)",
} as const;

export const pointerStyle = {
  strokeWidth: 2,
  arrowheadSize: 8,
} as const;

export const codeBlock = {
  maxWidth: canvas.width * 0.42, // ~800px
  maxHeight: canvas.height * 0.8, // ~860px
  marginRight: 40,
} as const;
