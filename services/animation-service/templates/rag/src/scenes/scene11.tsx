import { makeScene2D, Rect, Txt, Line } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Database } from '../components/Database';
import { Document } from '../components/Document';
import { Vector } from '../components/Vector';
import { PromptBox } from '../components/PromptBox';
import { Caption } from '../components/Caption';
import { Badge } from '../components/Badge';
import { AnimatedArrow } from '../components/AnimatedArrow';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { drawIn } from '../animations/draw';
import { typeText } from '../animations/typing';

export default makeScene2D('scene11', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const userCardRef = createRef<Rect>();
  const vectorCardRef = createRef<Rect>();
  const dbContainerRef = createRef<Rect>();
  const docContainerRef = createRef<Rect>();
  const promptContainerRef = createRef<Rect>();
  const llmCardRef = createRef<Rect>();

  const arrow1Ref = createRef<Line>();
  const arrow2Ref = createRef<Line>();
  const arrow3Ref = createRef<Line>();
  const arrow4Ref = createRef<Line>();
  const arrow5Ref = createRef<Line>();

  const successBadgeRef = createRef<Rect>();
  const captionRef = createRef<Rect>();

  view.add(
    <Background>
      <Rect ref={cameraRef} size={['100%', '100%']} justifyContent={'center'} alignItems={'center'}>

        {/* Title */}
        <Rect ref={titleRef} y={-400} opacity={0}>
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={48}
            fontWeight={800}
            fill={THEME.colors.primary}
            text={'Full End-to-End RAG Workflow'}
          />
        </Rect>

        {/* User Card */}
        <Card ref={userCardRef} x={-750} y={0} width={160} height={120} opacity={0}>
          <Badge text={'QUERY'} color={THEME.colors.primary} marginBottom={6} />
          <Txt fontFamily={THEME.fonts.main} fontSize={16} fill={THEME.colors.text} text={'User Question'} />
        </Card>

        {/* Vector */}
        <Vector ref={vectorCardRef} x={-480} y={0} opacity={0} scale={0.7} values={[0.82, -0.41, 0.09]} />

        {/* Database */}
        <Rect ref={dbContainerRef} x={-180} y={0} opacity={0} scale={0.7}>
          <Database label={'V-DB'} />
        </Rect>

        {/* Document */}
        <Rect ref={docContainerRef} x={120} y={0} opacity={0} scale={0.65}>
          <Document highlightedLine={1} />
        </Rect>

        {/* Prompt */}
        <Rect ref={promptContainerRef} x={420} y={0} opacity={0} scale={0.55}>
          <PromptBox questionText={'Query?'} contextText={'Facts...'} />
        </Rect>

        {/* LLM */}
        <Card ref={llmCardRef} x={740} y={0} width={180} height={120} opacity={0} glowColor={THEME.colors.purple}>
          <Badge text={'LLM'} color={THEME.colors.purple} marginBottom={6} />
          <Txt fontFamily={THEME.fonts.main} fontSize={16} fill={THEME.colors.text} text={'Grounded Answer'} />
        </Card>

        {/* Success badge appearing below LLM */}
        <Rect ref={successBadgeRef} x={740} y={110} opacity={0}>
          <Badge text={'ACCURATE & FRESH'} color={THEME.colors.success} />
        </Rect>

        {/* Connectors */}
        <AnimatedArrow ref={arrow1Ref} points={[[-660, 0], [-570, 0]]} glowColor={THEME.colors.primary} />
        <AnimatedArrow ref={arrow2Ref} points={[[-390, 0], [-270, 0]]} glowColor={THEME.colors.cyan} />
        <AnimatedArrow ref={arrow3Ref} points={[[-90, 0], [40, 0]]} glowColor={THEME.colors.cyan} />
        <AnimatedArrow ref={arrow4Ref} points={[[200, 0], [290, 0]]} glowColor={THEME.colors.cyan} />
        <AnimatedArrow ref={arrow5Ref} points={[[550, 0], [640, 0]]} glowColor={THEME.colors.purple} />

        {/* Caption */}
        <Caption
          ref={captionRef}
          text={''}
          y={350}
          opacity={0}
        />

      </Rect>
    </Background>
  );

  const captionTxt = captionRef().children()[0] as Txt;

  yield* all(
    // Slow camera drift
    cameraRef().scale(1.04, 15),
    cameraRef().position.y(-10, 15),

    // Scene animation sequence
    chain(
      waitFor(1),

      // Fade in Title
      fadeIn(titleRef(), 0.6),

      // Pop User Card
      popIn(userCardRef(), 0.5),
      drawIn(arrow1Ref(), 0.4),

      // Pop Vector
      popIn(vectorCardRef(), 0.5, 0.7),
      drawIn(arrow2Ref(), 0.4),

      // Pop DB
      popIn(dbContainerRef(), 0.5, 0.7),
      drawIn(arrow3Ref(), 0.4),

      // Pop Document
      popIn(docContainerRef(), 0.5, 0.65),
      drawIn(arrow4Ref(), 0.4),

      // Pop Prompt
      popIn(promptContainerRef(), 0.5, 0.55),
      drawIn(arrow5Ref(), 0.4),

      // Pop LLM
      popIn(llmCardRef(), 0.5),
      waitFor(2),

      // Pop Success badge below LLM to represent verified answer
      popIn(successBadgeRef(), 0.5),
      waitFor(2),

      // Caption
      fadeIn(captionRef(), 0.5),
      typeText(captionTxt, 'By connecting query embeddings directly to a vector database, RAG grounds the LLM in real-world facts.', 2.8),

      waitFor(17)
    )
  );
});
