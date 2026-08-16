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
import { pulseScale } from '../animations/pulse';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene16', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const queryVecRef = createRef<Rect>();
  const arrow1Ref = createRef<Line>();
  const arrow2Ref = createRef<Line>();
  const arrow3Ref = createRef<Line>();

  const doc1Ref = createRef<Rect>();
  const doc2Ref = createRef<Rect>();
  const doc3Ref = createRef<Rect>();

  const score1Ref = createRef<Rect>();
  const score2Ref = createRef<Rect>();
  const score3Ref = createRef<Rect>();

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
            text={'Similarity Search'}
          />
        </Rect>
        <Audio
          src="/audio/female/step_10.wav"
          play
        />

        {/* Query Vector (left) */}
        <Rect x={-450} y={0} opacity={0} ref={queryVecRef}>

          <Vector values={[0.77, -0.12, 0.54, 0.33]} glow={true} />
        </Rect>

        {/* Arrows to candidates */}
        <AnimatedArrow
          ref={arrow1Ref}
          points={[[-260, -150], [-60, -150]]}
          glowColor={THEME.colors.success}
        />
        <AnimatedArrow
          ref={arrow2Ref}
          points={[[-260, 0], [-60, 0]]}
          glowColor={THEME.colors.warning}
        />
        <AnimatedArrow
          ref={arrow3Ref}
          points={[[-260, 150], [-60, 150]]}
          glowColor={THEME.colors.error}
        />

        {/* Candidate Doc 1 — highest match */}
        <Card
          ref={doc1Ref}
          x={160}
          y={-150}
          width={280}
          height={140}
          opacity={0}
          glowColor={THEME.colors.success}
          showGlow={true}
        >
          <Badge text={'DOC A'} color={THEME.colors.success} marginBottom={16} />
          <Txt fontFamily={THEME.fonts.main} fontSize={16} fill={THEME.colors.textMuted} text={'"RAG retrieves from vector stores"'} textAlign={'center'} />
        </Card>

        {/* Candidate Doc 2 */}
        <Card
          ref={doc2Ref}
          x={160}
          y={0}
          width={280}
          height={140}
          opacity={0}
          glowColor={THEME.colors.warning}
        >
          <Badge text={'DOC B'} color={THEME.colors.warning} marginBottom={16} />
          <Txt fontFamily={THEME.fonts.main} fontSize={16} fill={THEME.colors.textMuted} text={'"Databases store structured data"'} textAlign={'center'} />
        </Card>

        {/* Candidate Doc 3 — lowest match */}
        <Card
          ref={doc3Ref}
          x={160}
          y={150}
          width={280}
          height={140}
          opacity={0}
        >
          <Badge text={'DOC C'} color={THEME.colors.error} marginBottom={16} />
          <Txt fontFamily={THEME.fonts.main} fontSize={16} fill={THEME.colors.textMuted} text={'"The stock market rose today"'} textAlign={'center'} />
        </Card>

        {/* Similarity Scores */}
        <Rect ref={score1Ref} x={440} y={-150} opacity={0}>
          <Txt fontFamily={THEME.fonts.mono} fontSize={24} fontWeight={700} fill={THEME.colors.success} text={'0.97'} />
        </Rect>
        <Rect ref={score2Ref} x={440} y={0} opacity={0}>
          <Txt fontFamily={THEME.fonts.mono} fontSize={24} fontWeight={700} fill={THEME.colors.warning} text={'0.61'} />
        </Rect>
        <Rect ref={score3Ref} x={440} y={150} opacity={0}>
          <Txt fontFamily={THEME.fonts.mono} fontSize={24} fontWeight={700} fill={THEME.colors.error} text={'0.12'} />
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
  const elapsedTime = 17.9;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[10] - elapsedTime
  );

  yield* all(
    cameraRef().scale(1.04, ragDurationsFemale[10]),
    cameraRef().position.x(-10, ragDurationsFemale[10]),

    chain(
      waitFor(1),

      fadeIn(titleRef(), 0.6),
      waitFor(2),

      popIn(queryVecRef(), 0.6),
      waitFor(2),

      // Draw all arrows and pop docs simultaneously
      all(
        drawIn(arrow1Ref(), 0.5),
        drawIn(arrow2Ref(), 0.5),
        drawIn(arrow3Ref(), 0.5)
      ),
      waitFor(1),

      all(
        popIn(doc1Ref(), 0.5),
        popIn(doc2Ref(), 0.5),
        popIn(doc3Ref(), 0.5)
      ),
      waitFor(2),

      // Pop scores in sequence
      all(
        popIn(score1Ref(), 0.4),
        chain(waitFor(1), popIn(score2Ref(), 0.4)),
        chain(waitFor(1), popIn(score3Ref(), 0.4))
      ),
      waitFor(2),

      // Pulse the best match


      fadeIn(captionRef(), 0.5),
      typeText(
        captionTxt,
        'Similarity search ranks candidate documents by how close their vector is to the query vector.',
        2.5
      ),

      waitFor(remainingTime)
    )
  );
});
