import { makeScene2D, Rect, Txt, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Document } from '../components/Document';
import { Caption } from '../components/Caption';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { slideInFrom } from '../animations/slide';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene18', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const sourceDocRef = createRef<Rect>();

  const fixedCardRef = createRef<Rect>();
  const semanticCardRef = createRef<Rect>();
  const slidingCardRef = createRef<Rect>();

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
            fill={THEME.colors.warning}
            text={'Chunking Strategies'}
          />
        </Rect>

        {/* Source Document */}
        <Rect ref={sourceDocRef} x={0} y={-210} opacity={0} layout direction={'row'} alignItems={'center'} gap={20}>
          <Document linesCount={5} highlightedLine={-1} />
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={20}
            fontWeight={700}
            fill={THEME.colors.textMuted}
            text={'Full Source Document\n→  split into chunks'}
          />
        </Rect>
        <Audio
          src="/audio/female/step_5.wav"
          play
        />

        {/* Three strategy cards */}
        <Card
          ref={fixedCardRef}
          x={-420}
          y={80}
          width={300}
          height={220}
          opacity={0}
          glowColor={THEME.colors.primary}
        >
          <Badge text={'FIXED SIZE'} color={THEME.colors.primary} marginBottom={12} />
          <Txt fontFamily={THEME.fonts.main} fontSize={16} fontWeight={700} fill={THEME.colors.text} text={'Split every N tokens'} marginBottom={8} />
          <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.textMuted} text={'e.g. 512 tokens per chunk\n+ optional overlap'} textAlign={'center'} />
        </Card>

        <Card
          ref={semanticCardRef}
          x={0}
          y={80}
          width={300}
          height={220}
          opacity={0}
          glowColor={THEME.colors.cyan}
          showGlow={true}
        >
          <Badge text={'SEMANTIC'} color={THEME.colors.cyan} marginBottom={12} />
          <Txt fontFamily={THEME.fonts.main} fontSize={16} fontWeight={700} fill={THEME.colors.text} text={'Split by meaning'} marginBottom={8} />
          <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.textMuted} text={'Paragraphs, sentences,\nor topic boundaries'} textAlign={'center'} />
        </Card>

        <Card
          ref={slidingCardRef}
          x={420}
          y={80}
          width={300}
          height={220}
          opacity={0}
          glowColor={THEME.colors.purple}
        >
          <Badge text={'SLIDING WINDOW'} color={THEME.colors.purple} marginBottom={12} />
          <Txt fontFamily={THEME.fonts.main} fontSize={16} fontWeight={700} fill={THEME.colors.text} text={'Overlapping windows'} marginBottom={8} />
          <Txt fontFamily={THEME.fonts.main} fontSize={14} fill={THEME.colors.textMuted} text={'Preserves context\nacross chunk boundaries'} textAlign={'center'} />
        </Card>

        {/* Caption */}
        <Caption
          ref={captionRef}
          text={''}
          y={380}
          opacity={0}
        />

      </Rect>
    </Background>
  );

  const captionTxt = captionRef().children()[0] as Txt;
  const elapsedTime = 19.4;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[5] - elapsedTime
  );

  yield* all(
    cameraRef().scale(1.04, ragDurationsFemale[5]),
    cameraRef().position.x(10, ragDurationsFemale[5]),

    chain(
      waitFor(1),

      fadeIn(titleRef(), 0.6),
      waitFor(2),

      slideInFrom(sourceDocRef(), 0, -40, 0.6),
      waitFor(2),

      // Pop in three strategy cards
      all(
        popIn(fixedCardRef(), 2),
        chain(waitFor(2), popIn(semanticCardRef(), 2)),
        chain(waitFor(2), popIn(slidingCardRef(), 2))
      ),
      waitFor(2),

      fadeIn(captionRef(), 2),
      typeText(
        captionTxt,
        'Chunking breaks documents into manageable pieces. Semantic chunking preserves meaning; sliding windows preserve context.',
        2.8
      ),

      waitFor(remainingTime)
    )
  );
});
