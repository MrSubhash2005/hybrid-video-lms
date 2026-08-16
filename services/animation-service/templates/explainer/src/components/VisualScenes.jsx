import React from 'react';
import { Scene1Intro } from '../scenes/Scene1Intro';
import { Scene2Architecture } from '../scenes/Scene2Architecture';
import { Scene3Problems } from '../scenes/Scene3Problems';
import { Scene4Design } from '../scenes/Scene4Design';
import { Scene5Walkthrough } from '../scenes/Scene5Walkthrough';
import { Scene6Workflow } from '../scenes/Scene6Workflow';
import { Scene7Demo } from '../scenes/Scene7Demo';
import { Scene8Summary } from '../scenes/Scene8Summary';
import { Scene9Production } from '../scenes/Scene9Production';

export const VisualScenes = ({ currentScene, currentTime, activeChapter, activeSectionIndex, isPlaying }) => {
  // Compute relative scene progress between 0.0 and 1.0 based on dynamic chapter times
  const start = activeChapter ? activeChapter.start : 0;
  const end = activeChapter ? activeChapter.end : 1;
  const duration = end - start;
  const sceneProgress = duration > 0 ? Math.max(0, Math.min((currentTime - start) / duration, 1)) : 0;

  switch (currentScene) {
    case 1:
      return <Scene1Intro sceneProgress={sceneProgress} sectionIndex={activeSectionIndex} />;
    case 2:
      return <Scene2Architecture currentTime={currentTime} sceneProgress={sceneProgress} sectionIndex={activeSectionIndex} />;
    case 3:
      return <Scene3Problems currentTime={currentTime} sceneProgress={sceneProgress} sectionIndex={activeSectionIndex} />;
    case 4:
      return <Scene4Design currentTime={currentTime} sceneProgress={sceneProgress} sectionIndex={activeSectionIndex} />;
    case 5:
      return <Scene5Walkthrough currentTime={currentTime} sceneProgress={sceneProgress} sectionIndex={activeSectionIndex} isPlaying={isPlaying} />;
    case 6:
      return <Scene6Workflow currentTime={currentTime} sceneProgress={sceneProgress} sectionIndex={activeSectionIndex} />;
    case 7:
      return <Scene7Demo sceneProgress={sceneProgress} sectionIndex={activeSectionIndex} />;
    case 8:
      return <Scene8Summary currentTime={currentTime} sceneProgress={sceneProgress} sectionIndex={activeSectionIndex} />;
    case 9:
      return <Scene9Production sceneProgress={sceneProgress} sectionIndex={activeSectionIndex} />;
    default:
      return <Scene1Intro sceneProgress={sceneProgress} sectionIndex={activeSectionIndex} />;
  }
};
