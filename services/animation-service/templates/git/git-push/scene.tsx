import { makeScene2D, Txt } from '@revideo/2d';
import { waitFor } from '@revideo/core';
import {Terminal} from './component';

export default makeScene2D('git-push', function* (view) {
  const data = {
    command: 'git push',
    output: ['Enumerating objects: 3, done.', 'Total 3 (delta 0), reused 0 (delta 0), pack-reused 0', 'To github.com:user/repo.git', ' * [new branch]      main -> main']
  };
  const subtitle = "Uploads local commits to the remote repository.";

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
