import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_FILE = path.join(__dirname, 'public/script.js');

const stepsData = [
  {
    id: "git-intro",
    name: "1. Git Intro",
    subtitle: "Yo, welcome to the ultimate Git Masterclass! Today, we are cracking open Git's hood to see exactly how it works. No boring slides, just pure code and internals.",
    internals: "No Git repository active. Working files are untracked."
  },
  {
    id: "git-version",
    name: "2. Check Version",
    command: "git --version",
    output: ["git version 2.43.0"],
    subtitle: "First, let us check our Git client version. Run git version. If you do not have Git installed, what are you even doing with your life?",
    internals: "Executes client binary to fetch compiler version metadata."
  },
  {
    id: "git-config-name",
    name: "3. Config Name",
    command: "git config --global user.name \"Alice\"",
    output: ["Saving profile metadata..."],
    subtitle: "Next, we set the global username. Run git config global user dot name. Tell Git who is coding, so you get credit for your masterpieces.",
    internals: "Appends [user] name = Alice inside ~/.gitconfig file."
  },
  {
    id: "git-config-email",
    name: "4. Config Email",
    command: "git config --global user.email \"alice@example.com\"",
    output: ["Saving profile email..."],
    subtitle: "Now, set your email. Run git config global user dot email. This links your local edits directly to your GitHub profile account.",
    internals: "Appends email = alice@example.com inside ~/.gitconfig file."
  },
  {
    id: "git-config-list",
    name: "5. Config List",
    command: "git config --list",
    output: ["user.name=Alice", "user.email=alice@example.com", "core.repositoryformatversion=0"],
    subtitle: "Let us verify our settings. Run git config list. Boom! Name and email are saved globally on your machine.",
    internals: "Reads environment variables and configuration files on disk."
  },
  {
    id: "git-init",
    name: "6. Git Init",
    command: "git init",
    output: ["Initialized empty Git repository in /workspace/.git/"],
    subtitle: "Time to activate Git! Run git init inside your project folder. This creates the hidden dot Git database directory.",
    internals: "Generates the hidden .git/ metadata database layout."
  },
  {
    id: "git-init-dir",
    name: "7. Git Database",
    subtitle: "Inside this dot Git folder, Git tracks every file, every commit, every branch, and config reference. It is the brain of your repository.",
    internals: "Directory .git/ contains: HEAD, config, description, hooks/, info/, objects/, refs/."
  },
  {
    id: "git-files-create",
    name: "8. Create Files",
    subtitle: "Let us create three mock files in our working area. index html, styles css, and app j s.",
    internals: "Files reside on local OS disk space; Git is not yet tracking them."
  },
  {
    id: "git-status-untracked",
    name: "9. Git Status",
    command: "git status",
    output: ["On branch main", "No commits yet", "Untracked files: index.html, styles.css, app.js"],
    subtitle: "Run git status. Notice the red filenames? Those are untracked files. Git knows they exist, but is not watching them yet.",
    internals: "Git index checks local workspace hashes and finds unregistered file keys."
  },
  {
    id: "git-diff-unstaged",
    name: "10. Git Diff",
    command: "git diff",
    output: ["diff --git a/index.html b/index.html", "--- a/index.html", "+++ b/index.html", "+  <h1>Initial Title</h1>"],
    subtitle: "Run git diff. Since these files are untracked, there is nothing to compare yet, but modifying tracked files shows exactly what lines changed.",
    internals: "Compares file diff hashes directly against the staged index database cache."
  },
  {
    id: "git-add-single",
    name: "11. Git Add One",
    command: "git add index.html",
    output: ["Staging index.html..."],
    subtitle: "Let us stage just index html. Staging is like putting files in a box, getting them ready to ship. Staged files turn green!",
    internals: "Calculates blob SHA-1 of index.html and writes reference entry to .git/index."
  },
  {
    id: "git-status-partial",
    name: "12. Partial Status",
    command: "git status",
    output: ["Changes to be committed: index.html", "Untracked files: styles.css, app.js"],
    subtitle: "Run git status again. See? index html is staged and green, while styles css and app j s are still red and untracked.",
    internals: "Index caches index.html, but styles.css and app.js remain untracked."
  },
  {
    id: "git-add-all",
    name: "13. Stage All Files",
    command: "git add .",
    output: ["Staging styles.css, app.js..."],
    subtitle: "Now, run git add dot. The dot tells Git to grab everything in the directory. Now all our files are staged and ready!",
    internals: "Writes blobs for all files, registering them inside .git/index cache."
  },
  {
    id: "git-commit-initial",
    name: "14. Root Commit",
    command: "git commit -m \"Initial commit\"",
    output: ["[main (root-commit) a1b2c3d] Initial commit", " 3 files changed"],
    subtitle: "Time to commit! Run git commit with a message. Git wraps our staged files into a permanent commit object with a unique hash.",
    internals: "Writes commit object in objects/ database. Refs refs/heads/main points to a1b2c3d."
  },
  {
    id: "git-log-initial",
    name: "15. Local Logs",
    command: "git log --oneline",
    output: ["a1b2c3d (HEAD -> main) Initial commit"],
    subtitle: "Run git log. Here is our commit history! We can see the author, timestamp, commit hash, and the main branch pointer.",
    internals: "Traverses active commit references from HEAD to compile list logs."
  },
  {
    id: "git-branch-create",
    name: "16. Create Branch",
    command: "git branch feature-x",
    output: [],
    subtitle: "Let us build a branch. Run git branch feature x. This creates a lightweight branch pointer referencing our active commit.",
    internals: "Writes .git/refs/heads/feature-x pointing to hash a1b2c3d."
  },
  {
    id: "git-branch-list",
    name: "17. List Branches",
    command: "git branch",
    output: ["* main", "  feature-x"],
    subtitle: "Run git branch. The asterisk shows which branch we are currently working on. Right now, it is main.",
    internals: "Reads files names within refs/heads/ to locate branches list."
  },
  {
    id: "git-switch-branch",
    name: "18. Switch Branch",
    command: "git switch feature-x",
    output: ["Switched to branch 'feature-x'"],
    subtitle: "Let us switch branches! Run git switch feature x. Now our HEAD pointer is targetting the feature x branch.",
    internals: "Updates .git/HEAD file reference to point to refs/heads/feature-x."
  },
  {
    id: "git-files-feature",
    name: "19. Branch Work",
    subtitle: "On feature x branch, we create a new file called contact html. This keeps our main codebase completely untouched.",
    internals: "New untracked contact.html file exists locally on branch feature-x."
  },
  {
    id: "git-status-branch",
    name: "20. Branch Status",
    command: "git status",
    output: ["On branch feature-x", "Untracked files: contact.html"],
    subtitle: "Run git status on our branch. Only contact html is untracked here, while our main branch remains clean.",
    internals: "Index compared on active branch refs/heads/feature-x context."
  },
  {
    id: "git-add-branch",
    name: "21. Branch Stage",
    command: "git add contact.html",
    output: ["Staging contact.html..."],
    subtitle: "Stage the new page. Staging registers contact html to the branch index directory.",
    internals: "Computes SHA-1 hash and stages contact.html inside .git/index list."
  },
  {
    id: "git-commit-branch",
    name: "22. Feature Commit",
    command: "git commit -m \"Add contact page\"",
    output: ["[feature-x e4f5g6h] Add contact page", " 1 file changed"],
    subtitle: "Commit the change. This creates a brand new commit node linked back to our initial commit.",
    internals: "Updates refs/heads/feature-x to point to newly created commit e4f5g6h."
  },
  {
    id: "git-switch-back",
    name: "23. Switch to Main",
    command: "git switch main",
    output: ["Switched to branch 'main'"],
    subtitle: "Let us switch back to main. Run git switch main. Notice the contact html page disappears from our folder.",
    internals: "HEAD updates to main. working directory reverts to main commit files state."
  },
  {
    id: "git-status-main",
    name: "24. Main Status",
    command: "git status",
    output: ["On branch main", "nothing to commit, working tree clean"],
    subtitle: "Run git status on main. The workspace is totally clean, proving our feature edits are isolated.",
    internals: "Local workspace files match objects referenced in main reference index."
  },
  {
    id: "git-merge-ff",
    name: "25. Merge Branch",
    command: "git merge feature-x",
    output: ["Updating a1b2c3d..e4f5g6h", "Fast-forward", " contact.html | 1 +"],
    subtitle: "Now, let us merge feature x. Run git merge. Since main had no new commits, Git fast forwards main straight to our feature commit!",
    internals: "Advances refs/heads/main reference pointer value to commit hash e4f5g6h."
  },
  {
    id: "git-branch-delete",
    name: "26. Delete Branch",
    command: "git branch -d feature-x",
    output: ["Deleted branch feature-x (was e4f5g6h)."],
    subtitle: "Since the merge is complete, we delete the branch pointer. Run git branch dash d. Clean and tidy.",
    internals: "Deletes reference file .git/refs/heads/feature-x from disk storage."
  },
  {
    id: "git-edit-main",
    name: "27. Modify Main",
    subtitle: "Now, let us modify app j s on main to simulate active project development.",
    internals: "Local app.js edits are cached as modified in Working Directory."
  },
  {
    id: "git-commit-main",
    name: "28. Commit Main",
    command: "git commit -am \"Update app.js\"",
    output: ["[main c5d6e7f] Update app.js", " 1 file changed"],
    subtitle: "Commit the app change directly. Run git commit dash a m. This stages and commits the change in a single line.",
    internals: "Creates commit c5d6e7f pointing to parent e4f5g6h, main moves forward."
  },
  {
    id: "git-stash-save",
    name: "29. Git Stash",
    command: "git stash",
    output: ["Saved working directory WIP...", "HEAD is now at c5d6e7f"],
    subtitle: "Wait! Imagine you are working on a new bug fix, but need to clean your workspace immediately. Run git stash to shelve your edits.",
    internals: "Shelves workspace states under refs/stash logs database."
  },
  {
    id: "git-stash-list",
    name: "30. Stash List",
    command: "git stash list",
    output: ["stash@{0}: WIP on main: c5d6e7f Update app.js"],
    subtitle: "Run git stash list. Your progress is saved safely on a stack, and your working folder is clean!",
    internals: "Reads reference lines within .git/logs/refs/stash file."
  },
  {
    id: "git-stash-pop",
    name: "31. Pop Stash",
    command: "git stash pop",
    output: ["On branch main", "modified: app.js", "Dropped refs/stash@{0}"],
    subtitle: "Ready to resume? Run git stash pop. Git pulls your edits off the stack and restores them to your working files.",
    internals: "Re-applies stashed objects index and pops stack refs."
  },
  {
    id: "git-reset-soft",
    name: "32. Reset Soft",
    command: "git reset --soft HEAD~1",
    output: ["Resetting branch HEAD..."],
    subtitle: "What if you committed by mistake? Run git reset dash dash soft HEAD tilde one. This removes the commit but keeps your file edits staged!",
    internals: "Updates main reference value back to previous commit e4f5g6h."
  },
  {
    id: "git-status-soft",
    name: "33. Soft Status",
    command: "git status",
    output: ["Changes to be committed: app.js"],
    subtitle: "Run git status. See? The commit is gone, but your files are still green and staged in the index!",
    internals: "Staging index remains staged, branch pointer has rewound."
  },
  {
    id: "git-reset-hard",
    name: "34. Reset Hard",
    command: "git reset --hard e4f5g6h",
    output: ["HEAD is now at e4f5g6h Add contact page"],
    subtitle: "But what if you want to completely erase the commit AND all edits? Run git reset dash dash hard. Boom! Clean slate!",
    internals: "Moves main back. Clears index cache, overwrites local files to match e4f5g6h."
  },
  {
    id: "git-reflog",
    name: "35. Git Reflog",
    command: "git reflog",
    output: ["e4f5g6h HEAD@{0}: reset: moving to e4f5g6h", "c5d6e7f HEAD@{1}: commit: Update app.js"],
    subtitle: "Wait! Did you panic because you hard reset by mistake? Run git reflog. Git keeps a record of every HEAD movement!",
    internals: "Reads reference logs database tracking every HEAD movement on disk."
  },
  {
    id: "git-recover-commit",
    name: "36. Recover Commit",
    command: "git reset --hard c5d6e7f",
    output: ["HEAD is now at c5d6e7f Update app.js"],
    subtitle: "We can recover that lost commit! Run git reset dash dash hard with the commit hash we found in reflog. Magic!",
    internals: "Points HEAD and main branch refs back to c5d6e7f."
  },
  {
    id: "git-revert",
    name: "37. Git Revert",
    command: "git revert c5d6e7f",
    output: ["[main g8h9i0j] Revert \"Update app.js\"", " 1 file changed"],
    subtitle: "If you already pushed your commits to a remote server, do not reset! Run git revert. This appends a new commit that reverses the edits.",
    internals: "Creates inverse commit g8h9i0j on main branch history."
  },
  {
    id: "git-conflict-edit-main",
    name: "38. Edit Main File",
    subtitle: "Let us create a merge conflict. On main branch, we edit contact html and change a contact line.",
    internals: "Working file contact.html has line edits locally."
  },
  {
    id: "git-conflict-commit-main",
    name: "39. Commit Main",
    command: "git commit -am \"Main change in contact\"",
    output: ["[main m1m2m3m] Main change in contact", " 1 file changed"],
    subtitle: "Commit the edit on main branch. The local commit graph moves forward.",
    internals: "Creates commit m1m2m3m pointing to parent g8h9i0j."
  },
  {
    id: "git-conflict-branch",
    name: "40. Branch feature-y",
    command: "git branch feature-y",
    output: [],
    subtitle: "Now, create branch feature y pointing to our current commit.",
    internals: "Creates refs/heads/feature-y reference file."
  },
  {
    id: "git-conflict-switch",
    name: "41. Switch feature-y",
    command: "git switch feature-y",
    output: ["Switched to branch 'feature-y'"],
    subtitle: "Switch to feature y branch to set up the conflicting edits.",
    internals: "HEAD updates to refs/heads/feature-y."
  },
  {
    id: "git-conflict-edit-feat",
    name: "42. Edit Feature File",
    subtitle: "On feature y, edit the exact same line of contact html but with a different email address.",
    internals: "Working file contact.html has conflicting line edits."
  },
  {
    id: "git-conflict-commit-feat",
    name: "43. Commit Feature",
    command: "git commit -am \"Feature change in contact\"",
    output: ["[feature-y f1f2f3f] Feature change in contact", " 1 file changed"],
    subtitle: "Commit the edit on feature y. The feature branch pointer moves forward.",
    internals: "Creates commit f1f2f3f pointing to parent m1m2m3m."
  },
  {
    id: "git-conflict-switch-main",
    name: "44. Switch main",
    command: "git switch main",
    output: ["Switched to branch 'main'"],
    subtitle: "Switch back to main. We are going to trigger a merge conflict.",
    internals: "HEAD resets back to refs/heads/main."
  },
  {
    id: "git-conflict-merge-trigger",
    name: "45. Trigger Conflict",
    command: "git merge feature-y",
    output: ["Auto-merging contact.html", "CONFLICT (content): Merge conflict in contact.html", "Automatic merge failed; fix conflicts and commit."],
    subtitle: "Run git merge feature y. Conflict! Git stops and flags that both branches changed the same lines.",
    internals: "Index updates conflict keys, merging remains uncompleted."
  },
  {
    id: "git-conflict-status",
    name: "46. Inspect Conflict",
    command: "git status",
    output: ["You have unmerged paths.", "  both modified:   contact.html"],
    subtitle: "Run git status. contact html is marked as modified by both sides.",
    internals: "Git flags three stages of files in index cache."
  },
  {
    id: "git-conflict-resolve",
    name: "47. Resolve Conflict",
    subtitle: "Open contact html, delete the conflict markers, and choose the final correct line.",
    internals: "File contact.html is updated locally to resolved content."
  },
  {
    id: "git-conflict-add",
    name: "48. Stage Resolved",
    command: "git add contact.html",
    output: ["Staging resolved contact.html..."],
    subtitle: "Stage the resolved file. Running git add tells Git that the conflict is settled.",
    internals: "Clears unmerged keys from staging index database."
  },
  {
    id: "git-conflict-commit-merge",
    name: "49. Merge Commit",
    command: "git commit -m \"Merge branch feature-y\"",
    output: ["[main r1r2r3r] Merge branch feature-y"],
    subtitle: "Run git commit. Git creates a merge commit with two parent commits, joining our branch histories.",
    internals: "Commit object r1r2r3r has parent pointers to both main and feature-y commits."
  },
  {
    id: "git-remote-add",
    name: "50. Remote Link",
    command: "git remote add origin https://github.com/alice/repo.git",
    output: [],
    subtitle: "Let us push our code online! Run git remote add origin. This links our local repo to a remote GitHub URL.",
    internals: "Appends [remote \"origin\"] settings inside .git/config."
  },
  {
    id: "git-remote-list",
    name: "51. Remote List",
    command: "git remote -v",
    output: ["origin  https://github.com/alice/repo.git (fetch)", "origin  https://github.com/alice/repo.git (push)"],
    subtitle: "Run git remote dash v. This displays the remote link URLs config.",
    internals: "Parses remote sections within .git/config configuration file."
  },
  {
    id: "git-push",
    name: "52. Push Commit",
    command: "git push -u origin main",
    output: ["Writing objects...", "To github.com:alice/repo.git", " * [new branch]      main -> main"],
    subtitle: "Run git push origin main. This uploads our commits and sets origin main as our upstream tracking reference.",
    internals: "Uploads commits database to server. Updates origin/main references."
  },
  {
    id: "git-fetch",
    name: "53. Fetch Changes",
    command: "git fetch origin",
    output: ["From github.com:alice/repo", " * branch            main       -> FETCH_HEAD"],
    subtitle: "Run git fetch. This downloads remote metadata and commit logs without merging them into your local workspace.",
    internals: "Downloads remote database objects, updates remote reference branches."
  },
  {
    id: "git-pull",
    name: "54. Pull Changes",
    command: "git pull origin main",
    output: ["Already up to date."],
    subtitle: "Run git pull. This fetches the remote database changes and immediately merges them into your active branch.",
    internals: "Runs fetch then merges origin/main directly into local main branch."
  },
  {
    id: "git-rebase-i",
    name: "55. Launch Rebase",
    command: "git rebase -i HEAD~2",
    output: ["Rebase editor active..."],
    subtitle: "Want a clean commit history? Run git rebase interactive. This lets you reorganize your commit history.",
    internals: "Saves rebase state files inside .git/rebase-merge/ database."
  },
  {
    id: "git-rebase-squash",
    name: "56. Squash Commits",
    subtitle: "Inside interactive rebase, we select squash to combine multiple commits into a single node.",
    internals: "Git groups tree changes and prepares new commit packaging."
  },
  {
    id: "git-rebase-reword",
    name: "57. Reword Commit",
    subtitle: "We rewrite the squashed commit log message to keep the history clean and readable.",
    internals: "Opens editor to modify target commit message metadata."
  },
  {
    id: "git-rebase-abort",
    name: "58. Abort Rebase",
    command: "git rebase --abort",
    output: ["Rebase aborted. HEAD restored."],
    subtitle: "If you mess up during rebase, do not panic! Run git rebase dash dash abort to restore everything back to how it was.",
    internals: "Deletes .git/rebase-merge/ files, resets HEAD to original hash."
  },
  {
    id: "git-remote-prune",
    name: "59. Prune Branches",
    command: "git remote prune origin",
    output: ["Pruning origin/feature-z..."],
    subtitle: "Run git remote prune. This deletes local tracking pointers for branches that were deleted on the remote server.",
    internals: "Cleans stale refs/remotes/origin/ pointers from local directory."
  },
  {
    id: "git-summary",
    name: "60. Summary",
    subtitle: "Masterclass complete! You now understand local, staging, branching, merging, conflicts, resets, stashes, remotes, and rebases. You are a Git legend!",
    internals: "Git internals index, databases, logs, refs, config structures fully operational."
  }
];

const codeContent = `// Course Timeline - 60 steps of variable duration matched to voice narration
const steps = ${JSON.stringify(stepsData, null, 2)};

const stepDurations = [10.44,8.477324,8.050658,7.026667,6.258685,6.514649,8.562676,6.429342,6.770658,7.88,7.623991,8.221314999999999,6.343991,7.197324,7.026667,7.453333,5.746667,6.685351,6.941315,6.429342,6.087982,4.9786850000000005,6.258685,5.234649,8.562676,5.746667,4.296009,7.453333,7.026667,5.149342,6.173333,8.221314999999999,6.002676,7.112018,7.282676,6.173333,7.709342,5.746667,3.6986850000000002,3.6133330000000004,3.272018,5.746667,3.527982,3.0160090000000004,6.770658,4.893333,5.661315,5.149342,5.32,6.941315,4.381315,6.685351,5.149342,6.258685,5.4053510000000005,5.746667,4.04,7.453333,5.661315,12.658684999999998];
const totalDuration = stepDurations.reduce((a, b) => a + b, 0);
window.stepDurations = stepDurations;
window.totalDuration = totalDuration;

function getStepStartTime(idx) {
  let time = 0;
  for (let i = 0; i < idx && i < stepDurations.length; i++) {
    time += stepDurations[i];
  }
  return time;
}

function getCurrentStepIndex(time) {
  let accumulated = 0;
  for (let i = 0; i < stepDurations.length; i++) {
    accumulated += stepDurations[i];
    if (time < accumulated) {
      return i;
    }
  }
  return stepDurations.length - 1;
}

function getRelativeTimeInsideStep(time) {
  let accumulated = 0;
  for (let i = 0; i < stepDurations.length; i++) {
    const duration = stepDurations[i];
    if (time < accumulated + duration) {
      return {
        stepIdx: i,
        relativeTime: time - accumulated,
        stepDuration: duration
      };
    }
    accumulated += duration;
  }
  return {
    stepIdx: stepDurations.length - 1,
    relativeTime: stepDurations[stepDurations.length - 1],
    stepDuration: stepDurations[stepDurations.length - 1]
  };
}

let currentTime = 0;
let isPlaying = false;
let isMuted = false;
let volume = 0.8;
let lastTimeUpdate = 0;
let animationFrameId = null;
let currentAudio = null;

// DOM Elements
const videoCanvas = document.getElementById("video-canvas");
const videoContainer = document.getElementById("video-container");
const subtitlesP = document.getElementById("subtitles-p");
const seekFill = document.getElementById("seek-fill");
const seekHandle = document.getElementById("seek-handle");
const seekContainer = document.getElementById("seek-container");
const btnPlay = document.getElementById("btn-play");
const btnVolume = document.getElementById("btn-volume");
const volumeSliderFill = document.querySelector(".volume-slider-fill");
const volumeSliderContainer = document.querySelector(".volume-slider-container");
const videoTimer = document.getElementById("video-timer");
const chapterIndicator = document.getElementById("chapter-indicator");

// Terminal DOM elements - modified to grab parent container for rolling text history
const terminalBody = document.getElementById("terminal-body");

// File rows DOM
const workingFileRow = document.getElementById("working-file-row");
const stagingFileRow = document.getElementById("staging-file-row");

// Panels DOM
const panelIntro = document.getElementById("panel-intro");
const panelSplit = document.getElementById("panel-split");
const subpanelFiles = document.getElementById("subpanel-files");
const subpanelGraph = document.getElementById("subpanel-graph");
const subpanelRemote = document.getElementById("subpanel-remote");
const subpanelDiff = document.getElementById("subpanel-diff");
const subpanelStash = document.getElementById("subpanel-stash");

// Stash stack file rows DOM
const stashWorkingRow = document.getElementById("stash-working-row");
const stashStackRow = document.getElementById("stash-stack-row");

// Initialize Player
document.addEventListener("DOMContentLoaded", () => {
  renderFrame(0);

  // Play button click
  btnPlay.addEventListener("click", togglePlay);
  
  // Previous / Next buttons
  document.getElementById("btn-prev").addEventListener("click", navigateStepPrev);
  document.getElementById("btn-next").addEventListener("click", navigateStepNext);

  // Spacebar to play/pause
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space" && e.target === document.body) {
      e.preventDefault();
      togglePlay();
    }
  });

  // Seek bar events
  seekContainer.addEventListener("click", handleSeekClick);
  
  // Mute / Volume slider
  btnVolume.addEventListener("click", toggleMute);
  volumeSliderContainer.addEventListener("click", handleVolumeClick);

  // Fullscreen trigger
  document.getElementById("btn-fullscreen").addEventListener("click", toggleFullscreen);
});

// Toggle Play/Pause
function togglePlay() {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
}

function play() {
  isPlaying = true;
  btnPlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
  lastTimeUpdate = performance.now();
  if (currentAudio) {
    currentAudio.play().catch(e => {});
  }
  animateLoop();
}

function pause() {
  isPlaying = false;
  btnPlay.innerHTML = '<i class="fa-solid fa-play"></i>';
  if (currentAudio) {
    currentAudio.pause();
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
}

// Animation core loop
function animateLoop() {
  if (!isPlaying) return;
  
  const now = performance.now();
  const elapsed = (now - lastTimeUpdate) / 1000; // convert to seconds
  lastTimeUpdate = now;
  
  currentTime += elapsed;
  if (currentTime >= totalDuration) {
    currentTime = 0;
    pause();
  }
  
  renderFrame(currentTime);
  animationFrameId = requestAnimationFrame(animateLoop);
}

// Scrub to a specific timestamp
function seekToTime(time) {
  currentTime = Math.max(0, Math.min(time, totalDuration));
  
  // Sync current audio playhead if already loaded
  const { stepIdx, relativeTime } = getRelativeTimeInsideStep(currentTime);
  if (currentAudio && currentAudio.stepIdx === stepIdx) {
    currentAudio.currentTime = relativeTime;
  }
  
  renderFrame(currentTime);
  if (isPlaying) {
    lastTimeUpdate = performance.now();
    if (currentAudio) {
      currentAudio.play().catch(e => {});
    }
  }
}

// Navigation step commands
function navigateStepPrev() {
  const currentIdx = getCurrentStepIndex(currentTime);
  const targetIdx = Math.max(0, currentIdx - 1);
  seekToTime(getStepStartTime(targetIdx));
}

// Navigation step next
function navigateStepNext() {
  const currentIdx = getCurrentStepIndex(currentTime);
  const targetIdx = Math.min(steps.length - 1, currentIdx + 1);
  seekToTime(getStepStartTime(targetIdx));
}

// Get active step object based on currentTime
function getCurrentStep(time) {
  const idx = getCurrentStepIndex(time);
  return steps[idx] || steps[steps.length - 1];
}

// Handle Seek Click
function handleSeekClick(e) {
  const rect = seekContainer.getBoundingClientRect();
  const percentage = (e.clientX - rect.left) / rect.width;
  seekToTime(percentage * totalDuration);
}

// Handle Volume Click
function handleVolumeClick(e) {
  const rect = volumeSliderContainer.getBoundingClientRect();
  const vol = (e.clientX - rect.left) / rect.width;
  volume = Math.max(0, Math.min(vol, 1));
  volumeSliderFill.style.width = \`\${volume * 100}%\`;
  isMuted = false;
  updateVolumeIcon();
  if (currentAudio) {
    currentAudio.volume = volume;
  }
}

// Toggle Mute
function toggleMute() {
  isMuted = !isMuted;
  updateVolumeIcon();
  if (currentAudio) {
    currentAudio.volume = isMuted ? 0 : volume;
  }
}

function updateVolumeIcon() {
  if (isMuted || volume === 0) {
    btnVolume.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    volumeSliderFill.style.width = '0%';
  } else {
    btnVolume.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    volumeSliderFill.style.width = \`\${volume * 100}%\`;
  }
}

// Toggle Fullscreen
function toggleFullscreen() {
  const doc = document;
  const container = videoContainer;

  const fullscreenElement = doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement;

  if (!fullscreenElement) {
    const requestFS = container.requestFullscreen || container.webkitRequestFullscreen || container.mozRequestFullScreen || container.msRequestFullscreen;
    if (requestFS) {
      requestFS.call(container).catch(err => {
        console.error(\`Error attempting to enable fullscreen: \${err.message}\`);
      });
    }
  } else {
    const exitFS = doc.exitFullscreen || doc.webkitExitFullscreen || doc.mozCancelFullScreen || doc.msExitFullscreen;
    if (exitFS) {
      exitFS.call(doc);
    }
  }
}

// Render local & remote commit graphs inside SVG - modified with high-fidelity SMIL drawing & scale animations
function drawVisualGraph(canvasId, commits, activePointerList, isMini = false) {
  const svg = document.getElementById(canvasId);
  svg.innerHTML = \`
    <defs>
      <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="glow-pink" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  \`;

  if (commits.length === 0) {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "50%");
    text.setAttribute("y", "50%");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "#444b5d");
    text.setAttribute("font-size", "10px");
    text.setAttribute("font-family", "var(--font-mono)");
    text.textContent = "Graph empty";
    svg.appendChild(text);
    return;
  }

  // Draw lines with drawing animations
  commits.forEach(commit => {
    if (commit.parent) {
      const parents = Array.isArray(commit.parent) ? commit.parent : [commit.parent];
      parents.forEach(pId => {
        const parent = commits.find(c => c.sha === pId);
        if (parent) {
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", parent.x);
          line.setAttribute("y1", parent.y);
          line.setAttribute("x2", commit.x);
          line.setAttribute("y2", commit.y);
          line.setAttribute("stroke", "#444b5d");
          line.setAttribute("stroke-width", "3");
          
          // Animate line drawing
          const dx = commit.x - parent.x;
          const dy = commit.y - parent.y;
          const len = Math.sqrt(dx*dx + dy*dy);
          line.setAttribute("stroke-dasharray", len);
          line.setAttribute("stroke-dashoffset", len);
          
          const anim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
          anim.setAttribute("attributeName", "stroke-dashoffset");
          anim.setAttribute("from", len);
          anim.setAttribute("to", 0);
          anim.setAttribute("dur", "0.5s");
          anim.setAttribute("fill", "freeze");
          line.appendChild(anim);
          
          svg.appendChild(line);
        }
      });
    }
  });

  // Draw commit nodes with bounce scale animation
  commits.forEach(commit => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", commit.x);
    circle.setAttribute("cy", commit.y);
    circle.setAttribute("r", isMini ? "7" : "10");
    
    let color = "var(--accent-cyan)";
    let filter = "url(#glow-cyan)";
    
    if (commit.sha.startsWith("f1f") || (commit.sha === "e4f5g6h" && activePointerList.HEAD === "feature-x")) {
      color = "var(--accent-pink)";
      filter = "url(#glow-pink)";
    } else if (canvasId.includes("cloud")) {
      color = "var(--accent-purple)";
      filter = "url(#glow-purple)";
    }
    
    circle.setAttribute("fill", "#000");
    circle.setAttribute("stroke", color);
    circle.setAttribute("stroke-width", "3");
    circle.setAttribute("filter", filter);
    
    // Scale up node animation
    const animScale = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animScale.setAttribute("attributeName", "r");
    animScale.setAttribute("from", "0");
    animScale.setAttribute("to", isMini ? "7" : "10");
    animScale.setAttribute("dur", "0.35s");
    animScale.setAttribute("fill", "freeze");
    circle.appendChild(animScale);
    
    svg.appendChild(circle);

    // Text label animations (Fade-in)
    if (!isMini) {
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", commit.x);
      text.setAttribute("y", commit.y - 16);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "#fff");
      text.setAttribute("font-family", "var(--font-mono)");
      text.setAttribute("font-size", "9.5px");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("opacity", "0");
      text.textContent = commit.sha;
      
      const animFade = document.createElementNS("http://www.w3.org/2000/svg", "animate");
      animFade.setAttribute("attributeName", "opacity");
      animFade.setAttribute("from", "0");
      animFade.setAttribute("to", "1");
      animFade.setAttribute("dur", "0.4s");
      animFade.setAttribute("begin", "0.2s");
      animFade.setAttribute("fill", "freeze");
      text.appendChild(animFade);
      
      svg.appendChild(text);

      const msg = document.createElementNS("http://www.w3.org/2000/svg", "text");
      msg.setAttribute("x", commit.x);
      msg.setAttribute("y", commit.y + 20);
      msg.setAttribute("text-anchor", "middle");
      msg.setAttribute("fill", "#8892b0");
      msg.setAttribute("font-size", "8.5px");
      msg.setAttribute("opacity", "0");
      msg.textContent = commit.message;
      
      const animFadeMsg = document.createElementNS("http://www.w3.org/2000/svg", "animate");
      animFadeMsg.setAttribute("attributeName", "opacity");
      animFadeMsg.setAttribute("from", "0");
      animFadeMsg.setAttribute("to", "1");
      animFadeMsg.setAttribute("dur", "0.4s");
      animFadeMsg.setAttribute("begin", "0.25s");
      animFadeMsg.setAttribute("fill", "freeze");
      msg.appendChild(animFadeMsg);
      
      svg.appendChild(msg);
    } else {
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", commit.x);
      text.setAttribute("y", commit.y - 12);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "#fff");
      text.setAttribute("font-family", "var(--font-mono)");
      text.setAttribute("font-size", "7.5px");
      text.setAttribute("opacity", "0");
      text.textContent = commit.sha;
      
      const animFade = document.createElementNS("http://www.w3.org/2000/svg", "animate");
      animFade.setAttribute("attributeName", "opacity");
      animFade.setAttribute("from", "0");
      animFade.setAttribute("to", "1");
      animFade.setAttribute("dur", "0.4s");
      animFade.setAttribute("begin", "0.2s");
      animFade.setAttribute("fill", "freeze");
      text.appendChild(animFade);
      
      svg.appendChild(text);
    }
  });
}

// Render reference badges on graph layouts
function renderRefBadges(containerId, pointers) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  if (!pointers || !pointers.branches) return;

  if (pointers.HEAD) {
    container.innerHTML += \`
      <div class="pointer-badge pointer-head">
        <i class="fa-solid fa-crosshairs"></i>
        <span>HEAD: \${pointers.HEAD}</span>
      </div>
    \`;
  }

  Object.keys(pointers.branches).forEach(b => {
    let style = "pointer-branch";
    if (b.includes("origin/")) style = "pointer-remote";
    container.innerHTML += \`
      <div class="pointer-badge \${style}">
        <i class="fa-solid fa-code-branch"></i>
        <span>\${b}: \${pointers.branches[b]}</span>
      </div>
    \`;
  });
}

// Deterministic Visual Frame Renderer based on playhead position (time)
function renderFrame(time) {
  // Audio state synchronization
  const { stepIdx, relativeTime, stepDuration } = getRelativeTimeInsideStep(time);
  
  if (!currentAudio || currentAudio.stepIdx !== stepIdx) {
    if (currentAudio) {
      currentAudio.pause();
    }
    currentAudio = new Audio(\`assets/audio/step_\${stepIdx}.wav\`);
    currentAudio.stepIdx = stepIdx;
    currentAudio.volume = isMuted ? 0 : volume;
    
    if (isPlaying) {
      currentAudio.currentTime = relativeTime;
      currentAudio.play().catch(e => {});
    }
  } else {
    if (isPlaying) {
      if (currentAudio.paused) {
        currentAudio.currentTime = relativeTime;
        currentAudio.play().catch(e => {});
      } else if (Math.abs(currentAudio.currentTime - relativeTime) > 0.6) {
        currentAudio.currentTime = relativeTime;
      }
    } else {
      if (!currentAudio.paused) {
        currentAudio.pause();
      }
    }
  }

  // 1. Update seek bar
  const percent = (time / totalDuration) * 100;
  seekFill.style.width = \`\${percent}%\`;
  seekHandle.style.left = \`\${percent}%\`;

  // 2. Display time timer
  const pad = (v) => (v < 10 ? "0" + v : v);
  const elapsedMin = Math.floor(time / 60);
  const elapsedSec = Math.floor(time % 60);
  const totalMin = Math.floor(totalDuration / 60);
  const totalSec = Math.floor(totalDuration % 60);
  videoTimer.textContent = \`\${pad(elapsedMin)}:\${pad(elapsedSec)} / \${pad(totalMin)}:\${pad(totalSec)}\`;

  // 3. Find active step
  const step = getCurrentStep(time);
  chapterIndicator.textContent = \`\${stepIdx + 1}/60: \${step.name.toUpperCase()}\`;

  // 4. Update subtitles
  subtitlesP.textContent = step.subtitle;

  // 5. Hide panel layouts initially
  panelIntro.classList.remove("active");
  panelSplit.classList.remove("active");
  
  // Hide visual subpanels inside split panel
  subpanelFiles.classList.remove("active");
  subpanelGraph.classList.remove("active");
  subpanelRemote.classList.remove("active");
  subpanelDiff.classList.remove("active");
  subpanelStash.classList.remove("active");

  // 6. Draw overlays depending on active step index/ID
  if (step.id === "git-intro") {
    panelIntro.classList.add("active");
  }
  else {
    panelSplit.classList.add("active");
    updateTerminal(time, stepIdx, relativeTime, step);

    // Swap content panels clearly depending on step index ranges
    
    // Files subpanel (Steps 3-5, 8-13, 20-21, 33, 42, 46-48)
    if (stepIdx === 2 || stepIdx === 3 || stepIdx === 4 || stepIdx === 7 || stepIdx === 8 || stepIdx === 10 || stepIdx === 11 || stepIdx === 12 || stepIdx === 19 || stepIdx === 20 || stepIdx === 32 || stepIdx === 41 || stepIdx === 45 || stepIdx === 46 || stepIdx === 47) {
      subpanelFiles.classList.add("active");

      if (stepIdx === 2 || stepIdx === 3 || stepIdx === 4 || stepIdx === 7) {
        updateFileList([], []);
      }
      else if (stepIdx === 8) {
        updateFileList(
          [{ name: "index.html", status: "untracked" }, { name: "styles.css", status: "untracked" }, { name: "app.js", status: "untracked" }],
          []
        );
      }
      else if (stepIdx === 10) {
        updateFileList(
          [{ name: "styles.css", status: "untracked" }, { name: "app.js", status: "untracked" }],
          [{ name: "index.html", status: "staged" }]
        );
      }
      else if (stepIdx === 11) {
        updateFileList(
          [{ name: "styles.css", status: "untracked" }, { name: "app.js", status: "untracked" }],
          [{ name: "index.html", status: "staged" }]
        );
      }
      else if (stepIdx === 12) {
        // Stages files at 40% duration
        if (relativeTime < stepDuration * 0.4) {
          updateFileList(
            [{ name: "styles.css", status: "untracked" }, { name: "app.js", status: "untracked" }],
            [{ name: "index.html", status: "staged" }]
          );
        } else {
          updateFileList(
            [],
            [{ name: "index.html", status: "staged" }, { name: "styles.css", status: "staged" }, { name: "app.js", status: "staged" }]
          );
        }
      }
      else if (stepIdx === 19 || stepIdx === 20) {
        if (stepIdx === 19) {
          updateFileList([{ name: "contact.html", status: "untracked" }], []);
        } else {
          // stage branch file at 40% duration
          if (relativeTime < stepDuration * 0.4) {
            updateFileList([{ name: "contact.html", status: "untracked" }], []);
          } else {
            updateFileList([], [{ name: "contact.html", status: "staged" }]);
          }
        }
      }
      else if (stepIdx === 32) {
        // soft reset preserves app.js staged
        updateFileList([], [{ name: "app.js", status: "staged" }]);
      }
      else if (stepIdx === 41 || stepIdx === 45 || stepIdx === 46 || stepIdx === 47) {
        if (stepIdx === 41) {
          updateFileList([{ name: "contact.html", status: "modified" }], []);
        } else if (stepIdx === 45) {
          updateFileList([{ name: "contact.html", status: "modified" }], []); // conflict flagged
        } else if (stepIdx === 46) {
          updateFileList([{ name: "contact.html", status: "modified" }], []);
        } else {
          // resolved staged at 40% duration
          if (relativeTime < stepDuration * 0.4) {
            updateFileList([{ name: "contact.html", status: "modified" }], []);
          } else {
            updateFileList([], [{ name: "contact.html", status: "staged" }]);
          }
        }
      }
    }
    // Diff Subpanel (Step 10)
    else if (stepIdx === 9) {
      subpanelDiff.classList.add("active");
    }
    // Stash Subpanel (Steps 29-31)
    else if (stepIdx === 28 || stepIdx === 29 || stepIdx === 30) {
      subpanelStash.classList.add("active");

      if (stepIdx === 28) {
        if (relativeTime < stepDuration * 0.4) {
          updateStashFileList([{ name: "app.js", status: "modified" }], []);
        } else {
          updateStashFileList([], [{ name: "app.js", status: "staged" }]);
        }
      }
      else if (stepIdx === 29) {
        updateStashFileList([], [{ name: "app.js", status: "staged" }]);
      }
      else if (stepIdx === 30) {
        if (relativeTime < stepDuration * 0.4) {
          updateStashFileList([], [{ name: "app.js", status: "staged" }]);
        } else {
          updateStashFileList([{ name: "app.js", status: "modified" }], []);
        }
      }
    }
    // Remote Split Subpanel (Steps 50-54, 59)
    else if (stepIdx === 49 || stepIdx === 50 || stepIdx === 51 || stepIdx === 52 || stepIdx === 53 || stepIdx === 58) {
      subpanelRemote.classList.add("active");

      const localCommits = [
        { sha: "a1b2c3d", message: "Initial commit", parent: null, x: 50, y: 40 },
        { sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 130, y: 40 },
        { sha: "m1m2m3m", message: "Main change", parent: "e4f5g6h", x: 210, y: 40 },
        { sha: "r1r2r3r", message: "Merge commit", parent: ["m1m2m3m", "f1f2f3f"], x: 290, y: 40 }
      ];
      const remoteCommits = [];
      const localPointers = { HEAD: "main", branches: { main: "r1r2r3r" } };
      const remotePointers = { branches: {} };

      if (stepIdx === 51) {
        // Push completes at 40% duration
        if (relativeTime >= stepDuration * 0.4) {
          remoteCommits.push({ sha: "a1b2c3d", message: "Initial commit", parent: null, x: 50, y: 40 });
          remoteCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 130, y: 40 });
          remoteCommits.push({ sha: "m1m2m3m", message: "Main change", parent: "e4f5g6h", x: 210, y: 40 });
          remoteCommits.push({ sha: "r1r2r3r", message: "Merge commit", parent: ["m1m2m3m", "f1f2f3f"], x: 290, y: 40 });
          remotePointers.branches.main = "r1r2r3r";
          localPointers.branches["origin/main"] = "r1r2r3r";
        }
      }
      else if (stepIdx > 51) {
        remoteCommits.push({ sha: "a1b2c3d", message: "Initial commit", parent: null, x: 50, y: 40 });
        remoteCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 130, y: 40 });
        remoteCommits.push({ sha: "m1m2m3m", message: "Main change", parent: "e4f5g6h", x: 210, y: 40 });
        remoteCommits.push({ sha: "r1r2r3r", message: "Merge commit", parent: ["m1m2m3m", "f1f2f3f"], x: 290, y: 40 });
        remotePointers.branches.main = "r1r2r3r";
        localPointers.branches["origin/main"] = "r1r2r3r";
      }

      drawVisualGraph("remote-local-graph", localCommits, localPointers, true);
      drawVisualGraph("remote-cloud-graph", remoteCommits, remotePointers, true);

      renderRefBadges("remote-local-pointers", localPointers);
      renderRefBadges("remote-cloud-pointers", remotePointers);
    }
    // Commit Graph Subpanel (Steps 6, 7, 14, 15, 16-19, 22-28, 32, 34-41, 43-45, 49, 55-58, 60)
    else {
      subpanelGraph.classList.add("active");
      
      const localCommits = [];
      const pointers = { HEAD: "main", branches: {} };

      // Root init commits
      if (stepIdx >= 13) {
        localCommits.push({ sha: "a1b2c3d", message: "Initial commit", parent: null, x: 70, y: 110 });
        pointers.branches.main = "a1b2c3d";
      }

      // Feature X commits setup
      if (stepIdx === 15) {
        if (relativeTime >= stepDuration * 0.4) {
          pointers.branches["feature-x"] = "a1b2c3d";
        }
      }
      else if (stepIdx === 16 || stepIdx === 17 || stepIdx === 18 || stepIdx === 19 || stepIdx === 20) {
        pointers.branches["feature-x"] = "a1b2c3d";
        if (stepIdx >= 17) pointers.HEAD = "feature-x";
      }
      else if (stepIdx === 21) {
        pointers.HEAD = "feature-x";
        pointers.branches.main = "a1b2c3d";
        if (relativeTime < stepDuration * 0.4) {
          pointers.branches["feature-x"] = "a1b2c3d";
        } else {
          localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 180, y: 150 });
          pointers.branches["feature-x"] = "e4f5g6h";
        }
      }
      else if (stepIdx === 22) {
        pointers.HEAD = "main";
        pointers.branches.main = "a1b2c3d";
        pointers.branches["feature-x"] = "e4f5g6h";
        localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 180, y: 150 });
      }
      else if (stepIdx === 23) {
        pointers.HEAD = "main";
        pointers.branches.main = "a1b2c3d";
        pointers.branches["feature-x"] = "e4f5g6h";
        localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 180, y: 150 });
      }
      else if (stepIdx === 24) {
        // Fast forward merges at 40% duration
        if (relativeTime < stepDuration * 0.4) {
          pointers.HEAD = "main";
          pointers.branches.main = "a1b2c3d";
          pointers.branches["feature-x"] = "e4f5g6h";
          localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 180, y: 150 });
        } else {
          pointers.HEAD = "main";
          pointers.branches.main = "e4f5g6h";
          pointers.branches["feature-x"] = "e4f5g6h";
          localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 180, y: 110 }); // straightens
        }
      }
      else if (stepIdx === 25) {
        pointers.HEAD = "main";
        pointers.branches.main = "e4f5g6h";
        localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 180, y: 110 });
      }
      else if (stepIdx === 26 || stepIdx === 27) {
        pointers.HEAD = "main";
        localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 180, y: 110 });
        if (stepIdx === 27) {
          localCommits.push({ sha: "c5d6e7f", message: "Update app.js", parent: "e4f5g6h", x: 290, y: 110 });
          pointers.branches.main = "c5d6e7f";
        } else {
          pointers.branches.main = "e4f5g6h";
        }
      }
      else if (stepIdx === 31) {
        // reset soft moves main back to e4f5g6h
        localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 180, y: 110 });
        pointers.HEAD = "main";
        if (relativeTime < stepDuration * 0.4) {
          localCommits.push({ sha: "c5d6e7f", message: "Update app.js", parent: "e4f5g6h", x: 290, y: 110 });
          pointers.branches.main = "c5d6e7f";
        } else {
          pointers.branches.main = "e4f5g6h";
        }
      }
      else if (stepIdx === 33) {
        localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 180, y: 110 });
        pointers.HEAD = "main";
        if (relativeTime < stepDuration * 0.4) {
          pointers.branches.main = "e4f5g6h";
        } else {
          // Wipes back to e4f5g6h
          pointers.branches.main = "e4f5g6h";
        }
      }
      else if (stepIdx === 34) {
        localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 180, y: 110 });
        pointers.HEAD = "main";
        pointers.branches.main = "e4f5g6h";
      }
      else if (stepIdx === 35) {
        localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 180, y: 110 });
        pointers.HEAD = "main";
        if (relativeTime < stepDuration * 0.4) {
          pointers.branches.main = "e4f5g6h";
        } else {
          // Recover commit c5d6e7f
          localCommits.push({ sha: "c5d6e7f", message: "Update app.js", parent: "e4f5g6h", x: 290, y: 110 });
          pointers.branches.main = "c5d6e7f";
        }
      }
      else if (stepIdx === 36) {
        localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 180, y: 110 });
        localCommits.push({ sha: "c5d6e7f", message: "Update app.js", parent: "e4f5g6h", x: 290, y: 110 });
        pointers.HEAD = "main";
        if (relativeTime < stepDuration * 0.4) {
          pointers.branches.main = "c5d6e7f";
        } else {
          // Revert commit g8h9i0j appears
          localCommits.push({ sha: "g8h9i0j", message: "Revert Update app.js", parent: "c5d6e7f", x: 380, y: 110 });
          pointers.branches.main = "g8h9i0j";
        }
      }
      else if (stepIdx === 38) {
        localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 120, y: 110 });
        localCommits.push({ sha: "g8h9i0j", message: "Revert Update app.js", parent: "e4f5g6h", x: 200, y: 110 });
        pointers.HEAD = "main";
        if (relativeTime < stepDuration * 0.4) {
          pointers.branches.main = "g8h9i0j";
        } else {
          // Main change commit m1m2m3m appears
          localCommits.push({ sha: "m1m2m3m", message: "Main change in contact", parent: "g8h9i0j", x: 280, y: 110 });
          pointers.branches.main = "m1m2m3m";
        }
      }
      else if (stepIdx === 39 || stepIdx === 40) {
        localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 120, y: 110 });
        localCommits.push({ sha: "g8h9i0j", message: "Revert Update app.js", parent: "e4f5g6h", x: 200, y: 110 });
        localCommits.push({ sha: "m1m2m3m", message: "Main change in contact", parent: "g8h9i0j", x: 280, y: 110 });
        pointers.branches.main = "m1m2m3m";
        if (stepIdx === 39) {
          pointers.HEAD = "main";
          if (relativeTime >= stepDuration * 0.4) pointers.branches["feature-y"] = "m1m2m3m";
        } else {
          pointers.HEAD = "feature-y";
          pointers.branches["feature-y"] = "m1m2m3m";
        }
      }
      else if (stepIdx === 42) {
        localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 120, y: 110 });
        localCommits.push({ sha: "g8h9i0j", message: "Revert Update app.js", parent: "e4f5g6h", x: 180, y: 110 });
        localCommits.push({ sha: "m1m2m3m", message: "Main change in contact", parent: "g8h9i0j", x: 250, y: 110 });
        pointers.HEAD = "feature-y";
        pointers.branches.main = "m1m2m3m";
        
        if (relativeTime < stepDuration * 0.4) {
          pointers.branches["feature-y"] = "m1m2m3m";
        } else {
          // Feature-y commit f1f2f3f appears
          localCommits.push({ sha: "f1f2f3f", message: "Feature change in contact", parent: "m1m2m3m", x: 320, y: 150 });
          pointers.branches["feature-y"] = "f1f2f3f";
        }
      }
      else if (stepIdx === 43) {
        localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 120, y: 110 });
        localCommits.push({ sha: "g8h9i0j", message: "Revert Update app.js", parent: "e4f5g6h", x: 180, y: 110 });
        localCommits.push({ sha: "m1m2m3m", message: "Main change in contact", parent: "g8h9i0j", x: 250, y: 110 });
        localCommits.push({ sha: "f1f2f3f", message: "Feature change in contact", parent: "m1m2m3m", x: 320, y: 150 });
        pointers.HEAD = "main";
        pointers.branches.main = "m1m2m3m";
        pointers.branches["feature-y"] = "f1f2f3f";
      }
      else if (stepIdx === 44) {
        // Merge conflicts triggered
        localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 120, y: 110 });
        localCommits.push({ sha: "g8h9i0j", message: "Revert Update app.js", parent: "e4f5g6h", x: 180, y: 110 });
        localCommits.push({ sha: "m1m2m3m", message: "Main change in contact", parent: "g8h9i0j", x: 250, y: 110 });
        localCommits.push({ sha: "f1f2f3f", message: "Feature change in contact", parent: "m1m2m3m", x: 320, y: 150 });
        pointers.HEAD = "main";
        pointers.branches.main = "m1m2m3m";
        pointers.branches["feature-y"] = "f1f2f3f";
      }
      else if (stepIdx === 48) {
        // Merge commit r1r2r3r completed at 40% duration
        localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 100, y: 110 });
        localCommits.push({ sha: "g8h9i0j", message: "Revert Update app.js", parent: "e4f5g6h", x: 160, y: 110 });
        localCommits.push({ sha: "m1m2m3m", message: "Main change in contact", parent: "g8h9i0j", x: 220, y: 110 });
        localCommits.push({ sha: "f1f2f3f", message: "Feature change in contact", parent: "m1m2m3m", x: 280, y: 150 });
        pointers.HEAD = "main";
        pointers.branches["feature-y"] = "f1f2f3f";
        
        if (relativeTime < stepDuration * 0.4) {
          pointers.branches.main = "m1m2m3m";
        } else {
          localCommits.push({ sha: "r1r2r3r", message: "Merge branch feature-y", parent: ["m1m2m3m", "f1f2f3f"], x: 350, y: 110 });
          pointers.branches.main = "r1r2r3r";
        }
      }
      else if (stepIdx === 54 || stepIdx === 55 || stepIdx === 56 || stepIdx === 57) {
        // Rebase states visualization
        localCommits.push({ sha: "a1b2c3d", message: "Initial commit", parent: null, x: 70, y: 110 });
        localCommits.push({ sha: "e4f5g6h", message: "Add contact page", parent: "a1b2c3d", x: 180, y: 110 });
        localCommits.push({ sha: "m1m2m3m", message: "Main change in contact", parent: "e4f5g6h", x: 290, y: 110 });
        pointers.HEAD = "main";
        pointers.branches.main = "m1m2m3m";
      }

      drawVisualGraph("canvas-commit-graph", localCommits, pointers);
      renderRefBadges("graph-pointers", pointers);
    }
  }
}

// Update terminal typewriting simulation - modified with continuous history buffer scroll
function updateTerminal(time, stepIdx, relativeTime, step) {
  let lines = [];
  
  // 1. Reconstruct history of all steps before stepIdx
  for (let i = 0; i <= stepIdx - 1; i++) {
    const s = steps[i];
    if (s && s.command) {
      lines.push(\`<div class="history-line"><span class="prompt">$</span> <span class="typed-command">\${s.command}</span></div>\`);
      if (s.output) {
        s.output.forEach(line => {
          let cls = "output-line";
          if (line.includes("Initialized") || line.includes("Fast-forward") || line.includes("staged") || line.includes("rebased") || line.includes("Successfully")) {
            cls = "output-line success";
          } else if (line.includes("Untracked") || line.includes("modified:") || line.includes("CONFLICT")) {
            cls = "output-line warning";
          } else if (line.includes("commit") || line.includes("HEAD")) {
            cls = "output-line info";
          }
          lines.push(\`<div class="\${cls}">\${line}</div>\`);
        });
      }
    }
  }
  
  // 2. Render the active step typing or prompt cursor
  if (step.command) {
    const charsToType = Math.floor(relativeTime / 0.02);
    const isTypingComplete = charsToType >= step.command.length;
    
    if (!isTypingComplete) {
      const typed = step.command.substring(0, charsToType);
      lines.push(\`<div class="active-line"><span class="prompt">$</span> <span class="typing-command">\${typed}</span><span class="cursor"></span></div>\`);
    } else {
      lines.push(\`<div class="active-line"><span class="prompt">$</span> <span class="typed-command">\${step.command}</span></div>\`);
      
      const timeAfterTyping = relativeTime - (step.command.length * 0.02);
      const linesToShow = Math.floor(timeAfterTyping / 0.12);
      
      if (step.output) {
        step.output.forEach((line, index) => {
          if (index < linesToShow) {
            let cls = "output-line";
            if (line.includes("Initialized") || line.includes("Fast-forward") || line.includes("staged") || line.includes("rebased") || line.includes("Successfully")) {
              cls = "output-line success";
            } else if (line.includes("Untracked") || line.includes("modified:") || line.includes("CONFLICT")) {
              cls = "output-line warning";
            } else if (line.includes("commit") || line.includes("HEAD")) {
              cls = "output-line info";
            }
            lines.push(\`<div class="\${cls}">\${line}</div>\`);
          }
        });
      }
    }
  } else {
    lines.push(\`<div class="active-line"><span class="prompt">$</span> <span class="cursor"></span></div>\`);
  }
  
  // Keep only the last 18 lines to prevent overflow and ensure commands are always visible
  const maxLines = 18;
  const recentLines = lines.slice(-maxLines);
  
  // 3. Inject and auto-scroll
  terminalBody.innerHTML = recentLines.join("\\n");
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Render files config in the split layout file rows
function updateFileList(workingFiles, stagedFiles) {
  workingFileRow.innerHTML = "";
  stagingFileRow.innerHTML = "";

  if (workingFiles.length > 0) {
    workingFiles.forEach(file => {
      const card = document.createElement("div");
      card.className = "file-card";
      card.innerHTML = \`
        <i class="fa-solid fa-file-code"></i>
        <span>\${file.name}</span>
      \`;
      workingFileRow.appendChild(card);
    });
  } else {
    workingFileRow.innerHTML = \`<span style="color:#555; font-size:10px; font-style:italic;">No untracked files</span>\`;
  }

  if (stagedFiles.length > 0) {
    stagedFiles.forEach(file => {
      const card = document.createElement("div");
      card.className = "file-card";
      card.innerHTML = \`
        <i class="fa-solid fa-file-circle-check"></i>
        <span>\${file.name}</span>
      \`;
      stagingFileRow.appendChild(card);
    });
  } else {
    stagingFileRow.innerHTML = \`<span style="color:#555; font-size:10px; font-style:italic;">Staging area empty</span>\`;
  }
}

// Render files config inside stash list area
function updateStashFileList(workingFiles, stashFiles) {
  stashWorkingRow.innerHTML = "";
  stashStackRow.innerHTML = "";

  if (workingFiles.length > 0) {
    workingFiles.forEach(file => {
      const card = document.createElement("div");
      card.className = "file-card";
      card.innerHTML = \`
        <i class="fa-solid fa-file-code"></i>
        <span>\${file.name}</span>
      \`;
      stashWorkingRow.appendChild(card);
    });
  } else {
    stashWorkingRow.innerHTML = \`<span style="color:#444; font-size:10px; font-style:italic;">No modified working files</span>\`;
  }

  if (stashFiles.length > 0) {
    stashFiles.forEach(file => {
      const card = document.createElement("div");
      card.className = "file-card";
      card.innerHTML = \`
        <i class="fa-solid fa-vault"></i>
        <span>\${file.name}</span>
      \`;
      stashStackRow.appendChild(card);
    });
  } else {
    stashStackRow.innerHTML = \`<span style="color:#444; font-size:10px; font-style:italic;">Stash stack empty</span>\`;
  }
}

window.renderFrame = renderFrame;
window.pause = pause;
`;

fs.writeFileSync(TARGET_FILE, codeContent);
console.log("Successfully compiled and updated script.js!");
