import { makeScene2D,Txt } from '@revideo/2d';
import { waitFor } from '@revideo/core';
import {Terminal} from './component';

export default makeScene2D('git-init', function* (view) {
  const data = {
    command: 'git init',
    output: ['Initialized empty Git repository in /path/to/repo/.git/']
  };
  const subtitle = "Initializes a new Git repository.";

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
