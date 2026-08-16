import { makeScene2D, Rect, Txt, Line } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Caption } from '../components/Caption';
import { fadeIn } from '../animations/fade';
import { popIn } from '../animations/pop';
import { drawIn } from '../animations/draw';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene17', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const vectorALineRef = createRef<Line>();
  const vectorBLineRef = createRef<Line>();
  const vectorCLineRef = createRef<Line>();

  const labelARef = createRef<Rect>();
  const labelBRef = createRef<Rect>();
  const labelCRef = createRef<Rect>();

  const formulaCardRef = createRef<Rect>();
  const scoreCardRef = createRef<Rect>();
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
            text={'Cosine Similarity Concept'}
          />
        </Rect>

        {/* Vector A — Query (rightward) */}
        <Line
          ref={vectorALineRef}
          points={[[-100, 100], [100, -80]]}
          stroke={THEME.colors.primary}
          lineWidth={5}
          endArrow
          arrowSize={14}
          shadowColor={THEME.colors.primary}
          shadowBlur={8}
          end={0}
          x={-280}
          y={50}
        />
        <Rect ref={labelARef} x={-150} y={-80} opacity={0}>
          <Txt fontFamily={THEME.fonts.main} fontSize={20} fontWeight={700} fill={THEME.colors.primary} text={'Query (A)'} />
        </Rect>

        {/* Vector B — Close match (nearby angle) */}
        <Line
          ref={vectorBLineRef}
          points={[[-100, 100], [60, -60]]}
          stroke={THEME.colors.success}
          lineWidth={5}
          endArrow
          arrowSize={14}
          shadowColor={THEME.colors.success}
          shadowBlur={8}
          end={0}
          x={-280}
          y={50}
        />
        <Rect ref={labelBRef} x={-200} y={-20} opacity={0}>
          <Txt fontFamily={THEME.fonts.main} fontSize={20} fontWeight={700} fill={THEME.colors.success} text={'Close Match (B)'} />
        </Rect>

        {/* Vector C — Far match (wide angle) */}
        <Line
          ref={vectorCLineRef}
          points={[[-100, 100], [-80, -80]]}
          stroke={THEME.colors.error}
          lineWidth={5}
          endArrow
          arrowSize={14}
          shadowColor={THEME.colors.error}
          shadowBlur={8}
          end={0}
          x={-280}
          y={50}
        />
        <Rect ref={labelCRef} x={-420} y={-60} opacity={0}>
          <Txt fontFamily={THEME.fonts.main} fontSize={20} fontWeight={700} fill={THEME.colors.error} text={'Far Match (C)'} />
        </Rect>

        {/* Formula Card */}
        <Card
          ref={formulaCardRef}
          x={330}
          y={-60}
          width={380}
          height={160}
          opacity={0}
          glowColor={THEME.colors.cyan}
          showGlow={true}
        >
          <Badge text={'FORMULA'} color={THEME.colors.cyan} marginBottom={12} />
          <Txt
            fontFamily={THEME.fonts.mono}
            fontSize={22}
            fontWeight={700}
            fill={THEME.colors.text}
            text={'cos(θ) = (A·B) / (|A|·|B|)'}
            textAlign={'center'}
          />
        </Card>

        {/* Score Card */}
        <Card
          ref={scoreCardRef}
          x={330}
          y={120}
          width={380}
          height={120}
          opacity={0}
        >
          <Txt fontFamily={THEME.fonts.main} fontSize={16} fill={THEME.colors.textMuted} text={'Score range: –1 (opposite) → +1 (identical)'} textAlign={'center'} />
          <Txt fontFamily={THEME.fonts.main} fontSize={16} fontWeight={700} fill={THEME.colors.success} text={'Smaller angle = Higher similarity'} textAlign={'center'} marginTop={8} />
        </Card>

        {/* Caption */}
        <Caption
          ref={captionRef}
          text={''}
          y={420}
          opacity={0}
        />

      </Rect>
    </Background>
  );

  const captionTxt = captionRef().children()[0] as Txt;
  const elapsedTime = 19.4;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[11] - elapsedTime
  );

  yield* all(
    cameraRef().scale(1.04, ragDurationsFemale[11]),
    cameraRef().position.y(-10, ragDurationsFemale[11]),

    chain(
      waitFor(1),

      fadeIn(titleRef(), 0.6),
      waitFor(2),

      // Draw vectors
      all(
        drawIn(vectorALineRef(), 0.6),
        chain(waitFor(2), drawIn(vectorBLineRef(), 0.6)),
        chain(waitFor(2), drawIn(vectorCLineRef(), 0.6))
      ),
      waitFor(2),

      // Pop labels
      all(
        popIn(labelARef(), 0.4),
        popIn(labelBRef(), 0.4),
        popIn(labelCRef(), 0.4)
      ),
      waitFor(2),

      // Pop formula and score cards
      popIn(formulaCardRef(), 0.6),
      waitFor(2),
      popIn(scoreCardRef(), 0.5),
      waitFor(2),

      fadeIn(captionRef(), 2),
      typeText(
        captionTxt,
        'Cosine similarity measures the angle between two vectors. A smaller angle means greater semantic similarity.',
        2.8
      ),

      waitFor(remainingTime)
    )
  );
});
