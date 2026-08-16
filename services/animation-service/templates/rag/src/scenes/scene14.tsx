import { makeScene2D, Rect, Txt, Line, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Vector } from '../components/Vector';
import { AnimatedArrow } from '../components/AnimatedArrow';
import { Caption } from '../components/Caption';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { drawIn } from '../animations/draw';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene14', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const textCardRef = createRef<Rect>();
  const arrow1Ref = createRef<Line>();
  const encoderCardRef = createRef<Rect>();
  const arrow2Ref = createRef<Line>();
  const vectorRef = createRef<Rect>();
  const dimLabelRef = createRef<Rect>();
  const captionRef = createRef<Rect>();

  view.add(
    <Background>
      <Rect ref={cameraRef} size={['100%', '100%']} justifyContent={'center'} alignItems={'center'}>

        {/* Title */}
        <Rect ref={titleRef} y={-390} opacity={0}>
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={48}
            fontWeight={800}
            fill={THEME.colors.cyan}
            text={'What is an Embedding?'}
          />
        </Rect>
        <Audio
          src="/audio/female/step_6.wav"
          play
        />

        {/* Input Text Card */}
        <Card
          ref={textCardRef}
          x={-480}
          y={-20}
          width={260}
          height={160}
          opacity={0}
        >
          <Badge text={'RAW TEXT'} color={THEME.colors.primary} marginBottom={12} />
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={18}
            fill={THEME.colors.text}
            text={'"The Eiffel Tower\nis in Paris"'}
            textAlign={'center'}
          />
        </Card>

        {/* Arrow 1 */}
        <AnimatedArrow
          ref={arrow1Ref}
          points={[[-350, -20], [-140, -20]]}
          glowColor={THEME.colors.primary}
        />

        {/* Encoder Card */}
        <Card
          ref={encoderCardRef}
          x={0}
          y={-20}
          width={280}
          height={160}
          opacity={0}
          glowColor={THEME.colors.primary}
          showGlow={true}
        >
          <Badge text={'ENCODER MODEL'} color={THEME.colors.primary} marginBottom={12} />
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={20}
            fontWeight={700}
            fill={THEME.colors.text}
            text={'Neural Network'}
            textAlign={'center'}
          />
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={14}
            fill={THEME.colors.textMuted}
            text={'(e.g. text-embedding-ada-002)'}
            textAlign={'center'}
          />
        </Card>

        {/* Arrow 2 */}
        <AnimatedArrow
          ref={arrow2Ref}
          points={[[140, -20], [180, -20]]}
          glowColor={THEME.colors.cyan}
        />

        {/* Vector Output */}
        <Vector
          ref={vectorRef}
          x={450}
          y={-20}
          opacity={0}
          values={[0.82, -0.41, 0.09, 0.95, -0.73, 0.36]}
          glow={true}
        />

        {/* Dimensionality label */}
        <Rect ref={dimLabelRef} x={450} y={70} opacity={0}>
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={16}
            fill={THEME.colors.textMuted}
            text={'← 1536-dimensional vector →'}
          />
        </Rect>

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
  const elapsedTime = 22.0;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[6] - elapsedTime
  );
  yield* all(
    // Slow camera drift
    cameraRef().scale(1.04, ragDurationsFemale[6]),
    cameraRef().position.x(10, ragDurationsFemale[6]),

    chain(
      waitFor(2),

      fadeIn(titleRef(), 0.6),
      waitFor(2),

      popIn(textCardRef(), 0.6),
      waitFor(2),

      drawIn(arrow1Ref(), 0.5),
      waitFor(1),

      popIn(encoderCardRef(), 0.6),
      waitFor(2),

      drawIn(arrow2Ref(), 0.5),
      waitFor(1),

      popIn(vectorRef(), 0.7),
      waitFor(2),

      fadeIn(dimLabelRef(), 0.5),
      waitFor(2),

      fadeIn(captionRef(), 2),
      typeText(
        captionTxt,
        'An embedding is a dense numerical vector that captures the semantic meaning of text in high-dimensional space.',
        2.8
      ),

      waitFor(remainingTime)
    )
  );
});
