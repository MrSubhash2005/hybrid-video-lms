import { makeScene2D, Txt } from '@revideo/2d';
import { waitFor } from '@revideo/core';
import {Terminal} from './component';

export default makeScene2D('git-add', function* (view) {
  const data = {
    command: 'git add .',
    output: [
      "Changes staged successfully"
    ]
  };
  const subtitle = "Stages files for the next commit.";

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
