import { makeScene2D, Txt } from '@revideo/2d';
import { waitFor } from '@revideo/core';
import {Terminal} from './component';

export default makeScene2D('git-log', function* (view) {
  const data = {
    command: 'git log',
    output: ['commit a1b2c3d', 'Author: User <user@example.com>', 'Date:   Thu Jul 2 12:00:00 2026', '', '    Initial commit']
  };
  const subtitle = "Displays the commit history.";

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
