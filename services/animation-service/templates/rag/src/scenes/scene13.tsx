import { makeScene2D, Rect, Txt, Line, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Caption } from '../components/Caption';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { drawIn } from '../animations/draw';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene13', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const traditionalCardRef = createRef<Rect>();
  const vsTextRef = createRef<Rect>();
  const vectorCardRef = createRef<Rect>();

  const arrow1Ref = createRef<Line>();
  const arrow2Ref = createRef<Line>();

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
            fill={THEME.colors.primary}
            text={'Why Vector Databases are Needed'}
          />
        </Rect>

        {/* Traditional DB Card */}
        <Card
          ref={traditionalCardRef}
          x={-420}
          y={0}
          width={340}
          height={300}
          opacity={0}
          glowColor={THEME.colors.error}
        >
          <Badge text={'TRADITIONAL DB'} color={THEME.colors.error} marginBottom={16} />
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={20}
            fontWeight={700}
            fill={THEME.colors.text}
            text={'Exact Keyword Match'}
            marginBottom={10}
          />
          <Audio
            src="/audio/female/step_9.wav"
            play
          />
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={16}
            fill={THEME.colors.textMuted}
            text={'"Find rows WHERE text = \'RAG\'"'}
            textWrap={true}
            textAlign={'center'}
            marginBottom={12}
          />
          <Line
            points={[[-20, -5], [20, 5]]}
            stroke={THEME.colors.error}
            lineWidth={3}
            end={0}
            ref={arrow1Ref}
          />
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={15}
            fill={THEME.colors.error}
            text={'❌  Misses semantic meaning'}
            marginTop={10}
          />
        </Card>

        {/* VS separator */}
        <Rect ref={vsTextRef} x={0} y={0} opacity={0}>
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={52}
            fontWeight={900}
            fill={THEME.colors.textMuted}
            text={'VS'}
          />
        </Rect>

        {/* Vector DB Card */}
        <Card
          ref={vectorCardRef}
          x={420}
          y={0}
          width={340}
          height={300}
          opacity={0}
          glowColor={THEME.colors.cyan}
          showGlow={true}
        >
          <Badge text={'VECTOR DB'} color={THEME.colors.cyan} marginBottom={16} />
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={20}
            fontWeight={700}
            fill={THEME.colors.text}
            text={'Semantic Similarity Search'}
            marginBottom={10}
          />
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={16}
            fill={THEME.colors.textMuted}
            text={'"Find vectors nearest to query embedding"'}
            textWrap={true}
            textAlign={'center'}
            marginBottom={12}
          />
          <Line
            points={[[-20, -5], [20, 5]]}
            stroke={THEME.colors.success}
            lineWidth={3}
            end={0}
            ref={arrow2Ref}
          />
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={15}
            fill={THEME.colors.success}
            text={'✓  Understands context & meaning'}
            marginTop={10}
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
  const elapsedTime = 27.6;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[9] - elapsedTime
  );

  yield* all(
    // Slow camera drift
    cameraRef().scale(1.04, ragDurationsFemale[9]),
    cameraRef().position.y(-10, ragDurationsFemale[9]),
    // Scene animation sequence
    chain(
      waitFor(2),

      // Fade in Title
      fadeIn(titleRef(), 0.6),
      waitFor(2),

      // Pop in Traditional DB card
      popIn(traditionalCardRef(), 0.7),
      waitFor(2),
      drawIn(arrow1Ref(), 0.4),
      waitFor(2),

      // Fade in VS
      fadeIn(vsTextRef(), 0.5),
      waitFor(2),

      // Pop in Vector DB card
      popIn(vectorCardRef(), 0.7),
      waitFor(2),
      drawIn(arrow2Ref(), 0.4),
      waitFor(5),

      // Caption
      fadeIn(captionRef(), 2),
      typeText(
        captionTxt,
        'Traditional databases match exact keywords. Vector databases find semantically similar content — even with different words.',
        3.0
      ),

      waitFor(remainingTime)
    )
  );
});
