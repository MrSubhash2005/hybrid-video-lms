import { makeScene2D, Rect, Txt, Line, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Database } from '../components/Database';
import { AnimatedArrow } from '../components/AnimatedArrow';
import { Caption } from '../components/Caption';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { drawIn } from '../animations/draw';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene25', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const queryCardRef = createRef<Rect>();
  const arrow1Ref = createRef<Line>();
  const embedCardRef = createRef<Rect>();
  const arrow2Ref = createRef<Line>();
  const dbContainerRef = createRef<Rect>();
  const arrow3Ref = createRef<Line>();
  const rerankerCardRef = createRef<Rect>();
  const arrow4Ref = createRef<Line>();
  const promptCardRef = createRef<Rect>();
  const arrow5Ref = createRef<Line>();
  const llmCardRef = createRef<Rect>();

  const captionRef = createRef<Rect>();

  view.add(
    <Background>
      <Rect ref={cameraRef} size={['100%', '100%']} justifyContent={'center'} alignItems={'center'}>

        {/* Title */}
        <Rect ref={titleRef} y={-390} opacity={0}>
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={44}
            fontWeight={800}
            fill={THEME.colors.primary}
            text={'Complete Retrieval Pipeline'}
          />
        </Rect>
        <Audio
          src="/audio/female/step_18.wav"
          play
        />

        {/* 1. Query */}
        <Card ref={queryCardRef} x={-750} y={0} width={160} height={110} opacity={0} alignItems={'center'} justifyContent={'center'}>
          <Badge text={'QUERY'} color={THEME.colors.primary} marginBottom={6} />
          <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.text} text={'User Input'} textAlign={'center'} />
        </Card>

        <AnimatedArrow ref={arrow1Ref} points={[[-660, 0], [-580, 0]]} glowColor={THEME.colors.primary} />

        {/* 2. Embed */}
        <Card ref={embedCardRef} x={-480} y={0} width={160} height={110} opacity={0} glowColor={THEME.colors.cyan} alignItems={'center'} justifyContent={'center'}>
          <Badge text={'EMBED'} color={THEME.colors.cyan} marginBottom={6} />
          <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.text} text={'Encoder NN'} textAlign={'center'} />
        </Card>

        <AnimatedArrow ref={arrow2Ref} points={[[-390, 0], [-310, 0]]} glowColor={THEME.colors.cyan} />

        {/* 3. Vector DB */}
        <Rect ref={dbContainerRef} x={-200} y={0} opacity={0} scale={0.72}>
          <Database label={'VECTOR DB'} glow={true} />
        </Rect>

        <AnimatedArrow ref={arrow3Ref} points={[[-100, 0], [20, 0]]} glowColor={THEME.colors.cyan} />

        {/* 4. Re-ranker */}
        <Card ref={rerankerCardRef} x={140} y={0} width={180} height={110} opacity={0} glowColor={THEME.colors.purple} alignItems={'center'} justifyContent={'center'}>
          <Badge text={'RE-RANK'} color={THEME.colors.purple} marginBottom={6} />
          <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.text} text={'Cross-Encoder'} textAlign={'center'} />
        </Card>

        <AnimatedArrow ref={arrow4Ref} points={[[240, 0], [340, 0]]} glowColor={THEME.colors.purple} />

        {/* 5. Prompt */}
        <Card ref={promptCardRef} x={460} y={0} width={180} height={110} opacity={0} glowColor={THEME.colors.warning} alignItems={'center'} justifyContent={'center'}>
          <Badge text={'PROMPT'} color={THEME.colors.warning} marginBottom={6} />
          <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.text} text={'Augmented'} textAlign={'center'} />
        </Card>

        <AnimatedArrow ref={arrow5Ref} points={[[560, 0], [650, 0]]} glowColor={THEME.colors.success} />

        {/* 6. LLM */}
        <Card ref={llmCardRef} x={760} y={0} width={160} height={110} opacity={0} glowColor={THEME.colors.success} showGlow={true} alignItems={'center'} justifyContent={'center'}>
          <Badge text={'LLM'} color={THEME.colors.success} marginBottom={6} />
          <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.success} text={'Final Answer'} textAlign={'center'} />
        </Card>

        {/* Caption */}
        <Caption
          ref={captionRef}
          text={''}
          y={360}
          opacity={0}
        />

      </Rect>
    </Background>
  );

  const captionTxt = captionRef().children()[0] as Txt;
  const elapsedTime = 35.2;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[18] - elapsedTime
  );

  yield* all(
    cameraRef().scale(1.04, ragDurationsFemale[18]),
    cameraRef().position.y(10, ragDurationsFemale[18]),

    chain(
      waitFor(1),

      fadeIn(titleRef(), 0.6),
      waitFor(2),

      // Animate pipeline stage by stage
      popIn(queryCardRef(), 5),
      drawIn(arrow1Ref(), 1),

      popIn(embedCardRef(), 5),
      drawIn(arrow2Ref(), 1),

      popIn(dbContainerRef(), 5, 0.72),
      drawIn(arrow3Ref(), 1),

      popIn(rerankerCardRef(), 5),
      drawIn(arrow4Ref(), 1),

      popIn(promptCardRef(), 5),
      drawIn(arrow5Ref(), 1),

      popIn(llmCardRef(), 5),
      waitFor(2),

      fadeIn(captionRef(), 0.5),
      typeText(
        captionTxt,
        'The full retrieval pipeline: Query → Embed → VectorDB → Re-rank → Augment Prompt → LLM Answer.',
        2.6
      ),

      waitFor(remainingTime)
    )
  );
});
