import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.SARVAM_API_KEY;
if (!API_KEY) {
  throw new Error(
    'SARVAM_API_KEY environment variable is not configured. ' +
    'Set it in your .env file or in the process environment before running this script.'
  );
}
const OUTPUT_DIR = path.join(__dirname, 'public/assets/audio');


// Make sure output folder exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 60 step subtitles - optimized for phonetic pronunciation and high-energy tone
const subtitlesList = [
  "Yo, welcome to the ultimate Git Masterclass! Today, we are cracking open Git's hood to see exactly how it works. No boring slides, just pure code and internals.",
  "First, let us check our Git client version. Run git version. If you do not have Git installed, what are you even doing with your life?",
  "Next, we set the global username. Run git config global user dot name. Tell Git who is coding, so you get credit for your masterpieces.",
  "Now, set your email. Run git config global user dot email. This links your local edits directly to your GitHub profile account.",
  "Let us verify our settings. Run git config list. Boom! Name and email are saved globally on your machine.",
  "Time to activate Git! Run git init inside your project folder. This creates the hidden dot Git database directory.",
  "Inside this dot Git folder, Git tracks every file, every commit, every branch, and config reference. It is the brain of your repository.",
  "Let us create three mock files in our working area. index html, styles css, and app j s.",
  "Run git status. Notice the red filenames? Those are untracked files. Git knows they exist, but is not watching them yet.",
  "Run git diff. Since these files are untracked, there is nothing to compare yet, but modifying tracked files shows exactly what lines changed.",
  "Let us stage just index html. Staging is like putting files in a box, getting them ready to ship. Staged files turn green!",
  "Run git status again. See? index html is staged and green, while styles css and app j s are still red and untracked.",
  "Now, run git add dot. The dot tells Git to grab everything in the directory. Now all our files are staged and ready!",
  "Time to commit! Run git commit with a message. Git wraps our staged files into a permanent commit object with a unique hash.",
  "Run git log. Here is our commit history! We can see the author, timestamp, commit hash, and the main branch pointer.",
  "Let us build a branch. Run git branch feature x. This creates a lightweight branch pointer referencing our active commit.",
  "Run git branch. The asterisk shows which branch we are currently working on. Right now, it is main.",
  "Let us switch branches! Run git switch feature x. Now our HEAD pointer is targetting the feature x branch.",
  "On feature x branch, we create a new file called contact html. This keeps our main codebase completely untouched.",
  "Run git status on our branch. Only contact html is untracked here, while our main branch remains clean.",
  "Stage the new page. Staging registers contact html to the branch index directory.",
  "Commit the change. This creates a brand new commit node linked back to our initial commit.",
  "Let us switch back to main. Run git switch main. Notice the contact html page disappears from our folder.",
  "Run git status on main. The workspace is totally clean, proving our feature edits are isolated.",
  "Now, let us merge feature x. Run git merge. Since main had no new commits, Git fast forwards main straight to our feature commit!",
  "Since the merge is complete, we delete the branch pointer. Run git branch dash d. Clean and tidy.",
  "Now, let us modify app j s on main to simulate active project development.",
  "Commit the app change directly. Run git commit dash a m. This stages and commits the change in a single line.",
  "Wait! Imagine you are working on a new bug fix, but need to clean your workspace immediately. Run git stash to shelve your edits.",
  "Run git stash list. Your progress is saved safely on a stack, and your working folder is clean!",
  "Ready to resume? Run git stash pop. Git pulls your edits off the stack and restores them to your working files.",
  "What if you committed by mistake? Run git reset dash dash soft HEAD tilde one. This removes the commit but keeps your file edits staged!",
  "Run git status. See? The commit is gone, but your files are still green and staged in the index!",
  "But what if you want to completely erase the commit AND all edits? Run git reset dash dash hard. Boom! Clean slate!",
  "Wait! Did you panic because you hard reset by mistake? Run git reflog. Git keeps a record of every HEAD movement!",
  "We can recover that lost commit! Run git reset dash dash hard with the commit hash we found in reflog. Magic!",
  "If you already pushed your commits to a remote server, do not reset! Run git revert. This appends a new commit that reverses the edits.",
  "Let us create a merge conflict. On main branch, we edit contact html and change a contact line.",
  "Commit the edit on main branch. The local commit graph moves forward.",
  "Now, create branch feature y pointing to our current commit.",
  "Switch to feature y branch to set up the conflicting edits.",
  "On feature y, edit the exact same line of contact html but with a different email address.",
  "Commit the edit on feature y. The feature branch pointer moves forward.",
  "Switch back to main. We are going to trigger a merge conflict.",
  "Run git merge feature y. Conflict! Git stops and flags that both branches changed the same lines.",
  "Run git status. contact html is marked as modified by both sides.",
  "Open contact html, delete the conflict markers, and choose the final correct line.",
  "Stage the resolved file. Running git add tells Git that the conflict is settled.",
  "Run git commit. Git creates a merge commit with two parent commits, joining our branch histories.",
  "Let us push our code online! Run git remote add origin. This links our local repo to a remote GitHub URL.",
  "Run git remote dash v. This displays the remote link URLs config.",
  "Run git push origin main. This uploads our commits and sets origin main as our upstream tracking reference.",
  "Run git fetch. This downloads remote metadata and commit logs without merging them into your local workspace.",
  "Run git pull. This fetches the remote database changes and immediately merges them into your active branch.",
  "Want a clean commit history? Run git rebase interactive. This lets you reorganize your commit history.",
  "Inside interactive rebase, we select squash to combine multiple commits into a single node.",
  "We rewrite the squashed commit log message to keep the history clean and readable.",
  "If you mess up during rebase, do not panic! Run git rebase dash dash abort to restore everything back to how it was.",
  "Run git remote prune. This deletes local tracking pointers for branches that were deleted on the remote server.",
  "Masterclass complete! You now understand local, staging, branching, merging, conflicts, resets, stashes, remotes, and rebases. You are a Git legend!"
];

async function generateAllTTS() {
  console.log("Starting Sarvam AI Voice Generator...");
  
  for (let i = 0; i < subtitlesList.length; i++) {
    const filename = `step_${i}.wav`;
    const outputPath = path.join(OUTPUT_DIR, filename);
    
    // We force regeneration by deleting the old files or overwriting them directly
    console.log(`[${i+1}/60] Generating TTS for: "${subtitlesList[i]}"`);
    
    try {
      const response = await fetch("https://api.sarvam.ai/text-to-speech", {
        method: "POST",
        headers: {
          "api-subscription-key": API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: subtitlesList[i],
          target_language_code: "en-IN",
          speaker: "aditya",
          model: "bulbul:v3"
        })
      });
      
      if (!response.ok) {
        throw new Error(`Sarvam API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      if (!data.audios || !data.audios[0]) {
        throw new Error("No audio content returned from Sarvam API");
      }
      
      const base64Data = data.audios[0];
      const audioBuffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(outputPath, audioBuffer);
      console.log(`Successfully saved ${filename}`);
    } catch (err) {
      console.error(`Failed to generate step_${i}:`, err.message);
      // Wait a bit to avoid hitting rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log("Voice generation completed!");
}

generateAllTTS();
