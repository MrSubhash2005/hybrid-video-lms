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
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene4', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const userCardRef = createRef<Rect>();
  const arrow1Ref = createRef<Line>();

  const llmCardRef = createRef<Rect>();
  const arrow2Ref = createRef<Line>();

  const answerCardRef = createRef<Rect>();
  const captionRef = createRef<Rect>();

  view.add(
    <Background>
      <Rect
        ref={cameraRef}
        size={['100%', '100%']}
        justifyContent={'center'}
        alignItems={'center'}
      >

        <Rect ref={titleRef} y={-400} opacity={0}>
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={48}
            fontWeight={800}
            fill={THEME.colors.text}
            text={'Traditional LLM Pipeline'}
          />
        </Rect>

        <Card
          ref={userCardRef}
          x={-500}
          y={0}
          width={280}
          height={180}
          opacity={0}
        >
          <Badge
            text={'USER'}
            color={THEME.colors.primary}
            marginBottom={10}
          />
          <Audio
            src="/audio/female/step_3.wav"
            play
          />
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={22}
            fontWeight={700}
            fill={THEME.colors.text}
            text={'Asks a Question'}
            textAlign={'center'}
          />
        </Card>

        <AnimatedArrow
          ref={arrow1Ref}
          points={[[-330, 0], [-180, 0]]}
          glowColor={THEME.colors.primary}
        />

        <Card
          ref={llmCardRef}
          x={0}
          y={0}
          width={280}
          height={180}
          opacity={0}
          glowColor={THEME.colors.purple}
        >
          <Badge
            text={'LLM'}
            color={THEME.colors.purple}
            marginBottom={10}
          />
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={20}
            fontWeight={700}
            fill={THEME.colors.text}
            text={'Base Model\n(Static weights)'}
            textAlign={'center'}
          />
        </Card>

        <AnimatedArrow
          ref={arrow2Ref}
          points={[[180, 0], [330, 0]]}
          glowColor={THEME.colors.purple}
        />

        <Card
          ref={answerCardRef}
          x={500}
          y={0}
          width={280}
          height={180}
          opacity={0}
          glowColor={THEME.colors.success}
        >
          <Badge
            text={'ANSWER'}
            color={THEME.colors.success}
            marginBottom={10}
          />
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={22}
            fontWeight={700}
            fill={THEME.colors.text}
            text={'Generates Response'}
            textAlign={'center'}
          />
        </Card>

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

  // Total animation time before the final wait
  const elapsedTime = 25.8;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[3] - elapsedTime
  );

  yield* all(
    // Camera lasts for the entire narration
    cameraRef().scale(1.04, ragDurationsFemale[3]),
    cameraRef().position.y(-10, ragDurationsFemale[3]),

    chain(
      waitFor(1),

      fadeIn(titleRef(), 2),
      waitFor(2),

      popIn(userCardRef(), 2),
      waitFor(2),

      drawIn(arrow1Ref(), 2),
      waitFor(2),

      popIn(llmCardRef(), 2),
      waitFor(2),

      drawIn(arrow2Ref(), 2),
      waitFor(2),

      popIn(answerCardRef(), 2),
      waitFor(2),

      fadeIn(captionRef(), 2),

      typeText(
        captionTxt,
        'In traditional systems, questions go directly to the model, which only knows what it learned in training.',
        2.8
      ),

      waitFor(remainingTime)
    )
  );
});
