import { Layout, Rect, Txt } from "@revideo/2d";

export const Terminal = ({
  command,
  output,
}: {
  command: string;
  output: string[];
}) => (
  <Layout width={1920} height={1080}>
    <Rect
      width={1920}
      height={1080}
      fill={"#000000"}
      radius={20}
    />

    <Txt
  x={0}
  y={-420}
  text={`$ ${command}`}
  fill={"white"}
  fontFamily={"monospace"}
  fontSize={42}
  textAlign={"center"}
/>

{output.map((line, i) => (
  <Txt
    key={i.toString()}
    x={0}
    y={-360 + i * 50}
    text={line}
    fill={"#cccccc"}
    fontFamily={"monospace"}
    fontSize={36}
    textAlign={"center"}
  />
))}
  </Layout>
);
