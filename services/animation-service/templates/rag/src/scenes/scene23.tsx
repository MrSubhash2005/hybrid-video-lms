import { makeScene2D, Rect, Txt, Line, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Document } from '../components/Document';
import { AnimatedArrow } from '../components/AnimatedArrow';
import { Caption } from '../components/Caption';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { drawIn } from '../animations/draw';
import { slideOutTo } from '../animations/slide';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene23', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const retrievedLabelRef = createRef<Rect>();
  const doc1Ref = createRef<Rect>();
  const doc2Ref = createRef<Rect>();
  const doc3Ref = createRef<Rect>();
  const doc4Ref = createRef<Rect>();

  const arrow1Ref = createRef<Line>();

  const rerankerCardRef = createRef<Rect>();

  const arrow2Ref = createRef<Line>();

  const topNLabelRef = createRef<Rect>();
  const result1Ref = createRef<Rect>();
  const result2Ref = createRef<Rect>();

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
            fill={THEME.colors.purple}
            text={'Re-ranking'}
          />
        </Rect>
        <Audio
          src="/audio/female/step_16.wav"
          play
        />

        {/* Retrieved docs label */}
        <Rect ref={retrievedLabelRef} x={-530} y={-250} opacity={0}>
          <Badge text={'RETRIEVED: top-20'} color={THEME.colors.primary} />
        </Rect>

        {/* Four retrieved docs stacked */}
        <Rect ref={doc1Ref} x={-530} y={-100} opacity={0}>
          <Document linesCount={3} highlightedLine={0} highlightColor={THEME.colors.primary} />
        </Rect>
        <Rect ref={doc2Ref} x={-530} y={-20} opacity={0}>
          <Document linesCount={3} highlightedLine={1} highlightColor={THEME.colors.textMuted} />
        </Rect>
        <Rect ref={doc3Ref} x={-530} y={60} opacity={0}>
          <Document linesCount={3} highlightedLine={0} highlightColor={THEME.colors.textMuted} />
        </Rect>
        <Rect ref={doc4Ref} x={-530} y={140} opacity={0}>
          <Document linesCount={3} highlightedLine={-1} />
        </Rect>

        {/* Arrow to re-ranker */}
        <AnimatedArrow ref={arrow1Ref} points={[[-380, 20], [-220, 20]]} glowColor={THEME.colors.purple} />

        {/* Re-ranker Card */}
        <Card
          ref={rerankerCardRef}
          x={0}
          y={20}
          width={300}
          height={200}
          opacity={0}
          glowColor={THEME.colors.purple}
          showGlow={true}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Badge text={'RE-RANKER'} color={THEME.colors.purple} marginBottom={12} />
          <Txt fontFamily={THEME.fonts.main} fontSize={18} fontWeight={700} fill={THEME.colors.text} text={'Cross-Encoder Model'} textAlign={'center'} marginBottom={8} />
          <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.textMuted} text={'Scores (query, doc) pairs\nmore precisely than embedding'} textAlign={'center'} />
        </Card>

        {/* Arrow to final results */}
        <AnimatedArrow ref={arrow2Ref} points={[[160, 20], [300, 20]]} glowColor={THEME.colors.success} />

        {/* Top-N label */}
        <Rect ref={topNLabelRef} x={520} y={-200} opacity={0}>
          <Badge text={'TOP-3 FINAL'} color={THEME.colors.success} />
        </Rect>

        {/* Final top results */}
        <Rect ref={result1Ref} x={520} y={-20} opacity={0}>
          <Document linesCount={3} highlightedLine={0} highlightColor={THEME.colors.success} />
        </Rect>
        <Rect ref={result2Ref} x={520} y={80} opacity={0}>
          <Document linesCount={3} highlightedLine={1} highlightColor={THEME.colors.success} />
        </Rect>

        {/* Caption */}
        <Caption
          ref={captionRef}
          text={''}
          y={370}
          opacity={0}
        />

      </Rect>
    </Background>
  );

  const captionTxt = captionRef().children()[0] as Txt;
  const elapsedTime = 24.3;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[16] - elapsedTime
  );

  yield* all(
    cameraRef().scale(1.04, ragDurationsFemale[16]),
    cameraRef().position.y(10, ragDurationsFemale[16]),
    chain(
      waitFor(1),

      fadeIn(titleRef(), 0.6),
      waitFor(2),

      // Fade in retrieved docs label
      fadeIn(retrievedLabelRef(), 0.5),
      waitFor(2),

      // Pop in all four docs
      all(
        popIn(doc1Ref(), 0.4),
        chain(waitFor(2), popIn(doc2Ref(), 0.4)),
        chain(waitFor(2), popIn(doc3Ref(), 0.4)),
        chain(waitFor(2), popIn(doc4Ref(), 0.4))
      ),
      waitFor(2),

      // Draw arrow to re-ranker
      drawIn(arrow1Ref(), 0.5),
      waitFor(2),

      // Pop in re-ranker
      popIn(rerankerCardRef(), 0.6),
      waitFor(2),

      // Slide low-scoring docs away
      all(
        slideOutTo(doc3Ref(), 0, 60, 0.4),
        slideOutTo(doc4Ref(), 0, 80, 0.4)
      ),
      waitFor(2),

      // Draw arrow to results
      drawIn(arrow2Ref(), 0.5),
      waitFor(2),

      // Pop in final results
      fadeIn(topNLabelRef(), 0.4),
      all(
        popIn(result1Ref(), 0.5),
        chain(waitFor(2), popIn(result2Ref(), 0.5))
      ),
      waitFor(2),

      fadeIn(captionRef(), 0.5),
      typeText(
        captionTxt,
        'A re-ranker cross-encodes query-document pairs for precision scoring, promoting the most relevant chunks to the top.',
        2.8
      ),

      waitFor(remainingTime)
    )
  );
});
