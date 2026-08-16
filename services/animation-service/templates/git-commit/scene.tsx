import { makeScene2D, Txt } from '@revideo/2d';
import { waitFor } from '@revideo/core';
import {Terminal} from './component';

export default makeScene2D("git-commit", function* (view) {
  const data = {
    command: 'it commit -m \"Initial commit\""',
    output: ['[main (root-commit) a1b2c3d] Initial commit', '1 file changed, 1 insertion(+)']
  };
  const subtitle = "Records stagedchanges to the repository.";

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
