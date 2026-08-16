import {makeProject} from '@revideo/core';

import gitAdd from '../templates/git/git-add/scene';
import gitBranch from '../templates/git/git-branch/scene';
import gitCommit from '../templates/git/git-commit/scene';
import gitInit from '../templates/git/git-init/scene';
import gitIntro from '../templates/git/git-intro/scene';
import gitLog from '../templates/git/git-log/scene';
import gitMerge from '../templates/git/git-merge/scene';
import gitPull from '../templates/git/git-pull/scene';
import gitPush from '../templates/git/git-push/scene';
import gitStatus from '../templates/git/git-status/scene';
import gitSwitch from '../templates/git/git-switch/scene';

export default makeProject({
  scenes: [
    gitAdd,
    gitBranch,
    gitCommit,
    gitInit,
    gitIntro,
    gitLog,
    gitMerge,
    gitPull,
    gitPush,
    gitStatus,
    gitSwitch,
  ],
});