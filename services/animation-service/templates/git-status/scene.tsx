import { makeScene2D, Txt } from '@revideo/2d';
import { waitFor } from '@revideo/core';
import {Terminal} from './component';

export default makeScene2D('git-status', function* (view) {
  const data = {
    command: 'git status',
    output: ['On branch main', 'nothing to commit, working tree clean']
  };
  const subtitle = "Displays the state of the working directory and staging area.";

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
