import { makeProject } from "@revideo/core";
import GitAdd from "../templates/git-add/scene";
import GitBranch from "../templates/git-branch/scene";

export default makeProject({
  scenes: [GitAdd, GitBranch],
});