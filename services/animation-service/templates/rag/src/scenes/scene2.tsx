import { makeScene2D, Rect, Txt, Line, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Caption } from '../components/Caption';
import { Badge } from '../components/Badge';
import { AnimatedArrow } from '../components/AnimatedArrow';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { drawIn } from '../animations/draw';
import { shakeNode } from '../animations/shake';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene2', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const userCardRef = createRef<Rect>();
  const arrow1Ref = createRef<Line>();

  const llmCardRef = createRef<Rect>();
  const arrow2Ref = createRef<Line>();

  const answerCardRef = createRef<Rect>();
  const answerTextRef = createRef<Txt>();

  const captionRef = createRef<Rect>();
  const queryTextRef = createRef<Txt>();

  view.add(
    <Background>
      <Rect
        ref={cameraRef}
        size={['100%', '100%']}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Audio
          src="/audio/female/step_1.wav"
          play
        />
        {/* Title */}
        <Rect ref={titleRef} y={-350} opacity={0}>
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={48}
            fontWeight={800}
            fill={THEME.colors.error}
            text={'The Problem: Hallucinations'}
          />
        </Rect>

        {/* User Query */}
        <Card
          ref={userCardRef}
          x={-450}
          y={-100}
          width={350}
          height={180}
          opacity={0}
        >
          <Badge
            text={'USER QUERY'}
            color={THEME.colors.primary}
            marginBottom={10}
          />

          <Txt
            ref={queryTextRef}
            fontFamily={THEME.fonts.main}
            fontSize={20}
            fill={THEME.colors.text}
            text={''}
            textWrap
          />
        </Card>

        {/* Arrow */}
        <AnimatedArrow
          ref={arrow1Ref}
          points={[[-275, -100], [-150, -100]]}
          glowColor={THEME.colors.primary}
        />

        {/* LLM */}
        <Card
          ref={llmCardRef}
          x={0}
          y={-100}
          width={300}
          height={180}
          opacity={0}
          glowColor={THEME.colors.purple}
        >
          <Badge
            text={'BASE LLM'}
            color={THEME.colors.purple}
            marginBottom={10}
          />

          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={18}
            fill={THEME.colors.textMuted}
            text={'Processing static parameters...'}
            textAlign={'center'}
          />
        </Card>

        {/* Arrow */}
        <AnimatedArrow
          ref={arrow2Ref}
          points={[[150, -100], [275, -100]]}
          glowColor={THEME.colors.purple}
        />

        {/* Hallucinated Answer */}
        <Card
          ref={answerCardRef}
          x={450}
          y={-100}
          width={350}
          height={180}
          opacity={0}
          glowColor={THEME.colors.error}
        >
          <Badge
            text={'HALLUCINATED ANSWER'}
            color={THEME.colors.error}
            marginBottom={10}
          />

          <Txt
            ref={answerTextRef}
            fontFamily={THEME.fonts.main}
            fontSize={20}
            fill={THEME.colors.error}
            text={''}
            textWrap
          />
        </Card>

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

  // Time already consumed before the final wait
  const elapsedTime = 27.5;
  const remainingTime = Math.max(
    0,
    ragDurationsFemale[1] - elapsedTime
  );

  yield* all(
    // Camera movement lasts exactly as long as the narration
    cameraRef().scale(1.04, ragDurationsFemale[1]),
    cameraRef().position.x(-10, ragDurationsFemale[1]),

    chain(
      waitFor(1),

      fadeIn(titleRef(), 2),
      waitFor(2),

      all(
        popIn(userCardRef(), 2),
        typeText(
          queryTextRef(),
          'Who won the soccer world tournament in 2026?',
          2
        )
      ),

      waitFor(2),

      chain(
        drawIn(arrow1Ref(), 2),
        popIn(llmCardRef(), 2)
      ),

      waitFor(2),

      chain(
        drawIn(arrow2Ref(), 2),
        all(
          popIn(answerCardRef(), 2),
          typeText(
            answerTextRef(),
            'FC Solar won the world tournament (Incorrect Fact!)',
            2
          )
        )
      ),

      waitFor(2),

      shakeNode(answerCardRef(), 20, 2),

      fadeIn(captionRef(), 2),

      typeText(
        captionTxt,
        'When LLMs rely only on training data, they confidently hallucinate facts they do not know.',
        2.5
      ),

      waitFor(remainingTime)
    )
  );
});