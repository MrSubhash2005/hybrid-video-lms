import { makeScene2D, Txt } from '@revideo/2d';
import { waitFor } from '@revideo/core';
import {Terminal} from './component';

export default makeScene2D("git-merge", function* (view) {
  const data = {
    command: "git merge",
    output: ["Updating a1b2c3d..e4f5g6h", "Fast-forward"]
  };
  const subtitle = "Combines changes from another branch.";

  view.add(
    <>
      <Terminal
        command={data.command}
        output={data.output}
      />
      <Txt
        text={subtitle}
        y={420}
        fill={"white"}
        fontFamily={"monospace"}
        fontSize={36}
      />
    </>
  );
  yield* waitFor(2);
});
