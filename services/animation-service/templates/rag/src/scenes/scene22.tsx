import { makeScene2D, Rect, Txt, Line, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { AnimatedArrow } from '../components/AnimatedArrow';
import { Caption } from '../components/Caption';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { drawIn } from '../animations/draw';
import { pulseScale } from '../animations/pulse';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene22', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const queryCardRef = createRef<Rect>();
  const denseCardRef = createRef<Rect>();
  const sparseCardRef = createRef<Rect>();
  const rrfCardRef = createRef<Rect>();
  const resultCardRef = createRef<Rect>();

  const arrow1Ref = createRef<Line>();
  const arrow2Ref = createRef<Line>();
  const arrow3Ref = createRef<Line>();
  const arrow4Ref = createRef<Line>();
  const arrow5Ref = createRef<Line>();

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
            fill={THEME.colors.success}
            text={'Hybrid Search'}
          />
        </Rect>

        {/* Query */}
        <Card ref={queryCardRef} x={-620} y={0} width={180} height={100} opacity={0} alignItems={'center'} justifyContent={'center'}>
          <Badge text={'QUERY'} color={THEME.colors.primary} marginBottom={6} />
          <Txt fontFamily={THEME.fonts.main} fontSize={16} fill={THEME.colors.text} text={'User Question'} textAlign={'center'} />
        </Card>

        {/* Arrow 1: query → dense */}
        <AnimatedArrow ref={arrow1Ref} points={[[-520, -40], [-330, -40]]} glowColor={THEME.colors.cyan} />
        {/* Arrow 2: query → sparse */}
        <AnimatedArrow ref={arrow2Ref} points={[[-520, 40], [-330, 40]]} glowColor={THEME.colors.warning} />

        {/* Dense retrieval */}
        <Card ref={denseCardRef} x={-160} y={-80} width={240} height={90} opacity={0} glowColor={THEME.colors.cyan} showGlow={true} alignItems={'center'} justifyContent={'center'}>
          <Badge text={'DENSE'} color={THEME.colors.cyan} marginBottom={6} />
          <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.textMuted} text={'Top-K semantic docs'} />
        </Card>

        {/* Sparse retrieval */}
        <Card ref={sparseCardRef} x={-160} y={80} width={240} height={90} opacity={0} glowColor={THEME.colors.warning} alignItems={'center'} justifyContent={'center'}>
          <Badge text={'SPARSE'} color={THEME.colors.warning} marginBottom={6} />
          <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.textMuted} text={'Top-K keyword docs'} />
        </Card>

        {/* Arrow 3+4 → RRF */}
        <AnimatedArrow ref={arrow3Ref} points={[[-40, -80], [120, -20]]} glowColor={THEME.colors.success} />
        <AnimatedArrow ref={arrow4Ref} points={[[-40, 80], [120, 20]]} glowColor={THEME.colors.success} />

        {/* RRF Fusion */}
        <Card ref={rrfCardRef} x={280} y={0} width={240} height={100} opacity={0} glowColor={THEME.colors.success} showGlow={true} alignItems={'center'} justifyContent={'center'}>
          <Badge text={'RRF FUSION'} color={THEME.colors.success} marginBottom={8} />
          <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.text} text={'Score merge & re-rank'} textAlign={'center'} />
        </Card>

        {/* Arrow 5: RRF Fusion →  */}
        <AnimatedArrow ref={arrow5Ref} points={[[-520, 40], [-330, 40]]} glowColor={THEME.colors.warning} />

        {/* Final results */}
        <Card ref={resultCardRef} x={540} y={0} width={220} height={130} opacity={0} glowColor={THEME.colors.primary} showGlow={true} alignItems={'center'} justifyContent={'center'}>
          <Badge text={'TOP RESULTS'} color={THEME.colors.primary} marginBottom={8} />
          <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.success} text={'High recall ✓'} marginBottom={4} />
          <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.success} text={'High precision ✓'} />
        </Card>
        <Audio
          src="/audio/female/step_15.wav"
          play
        />

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
  const elapsedTime = 24.3;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[15] - elapsedTime
  );

  yield* all(
    cameraRef().scale(1.04, ragDurationsFemale[15]),
    cameraRef().position.y(10, ragDurationsFemale[15]),
    chain(
      waitFor(1),

      fadeIn(titleRef(), 0.6),
      waitFor(2),

      popIn(queryCardRef(), 0.6),
      waitFor(2),

      all(drawIn(arrow1Ref(), 0.5), drawIn(arrow2Ref(), 0.5)),
      waitFor(2),

      all(
        popIn(denseCardRef(), 0.5),
        popIn(sparseCardRef(), 0.5)
      ),
      waitFor(2),

      all(drawIn(arrow3Ref(), 0.5), drawIn(arrow4Ref(), 0.5)),
      waitFor(2),

      popIn(rrfCardRef(), 0.6),
      waitFor(2),

      (drawIn(arrow5Ref(), 0.5)),
      waitFor(2),

      popIn(resultCardRef(), 0.6),
      waitFor(2),

      popIn(resultCardRef(), 1.06),
      waitFor(2),

      fadeIn(captionRef(), 0.5),
      typeText(
        captionTxt,
        'Hybrid search merges dense and sparse results using Reciprocal Rank Fusion for the best of both worlds.',
        2.6
      ),

      waitFor(remainingTime)
    )
  );
});
