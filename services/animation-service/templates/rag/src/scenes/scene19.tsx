import { makeScene2D, Rect, Txt, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Caption } from '../components/Caption';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { slideInFrom } from '../animations/slide';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene19', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const docCardRef = createRef<Rect>();
  const metaCardRef = createRef<Rect>();

  const filter1Ref = createRef<Rect>();
  const filter2Ref = createRef<Rect>();
  const filter3Ref = createRef<Rect>();

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
            text={'Metadata in RAG'}
          />
        </Rect>

        {/* Document card on the left */}
        <Card
          ref={docCardRef}
          x={-350}
          y={-20}
          width={320}
          height={280}
          opacity={0}
        >
          <Badge text={'DOCUMENT CHUNK'} color={THEME.colors.primary} marginBottom={14} />
          <Txt fontFamily={THEME.fonts.mono} fontSize={15} fill={THEME.colors.textMuted} text={'"...The transformer\narchitecture was\nproposed in 2017..."'} textWrap={true} textAlign={'center'} />
        </Card>

        {/* Metadata card on the right */}
        <Card
          ref={metaCardRef}
          x={200}
          y={-20}
          width={420}
          height={280}
          opacity={0}
          glowColor={THEME.colors.cyan}
          showGlow={true}
        >
          <Badge text={'METADATA'} color={THEME.colors.cyan} marginBottom={14} />
          <Rect layout direction={'column'} gap={10} width={'100%'}>
            <Rect layout direction={'row'} gap={12} alignItems={'center'}>
              <Txt fontFamily={THEME.fonts.mono} fontSize={14} fill={THEME.colors.primary} text={'source:'} />
              <Txt fontFamily={THEME.fonts.mono} fontSize={14} fill={THEME.colors.text} text={'"attention_is_all_you_need.pdf"'} />
            </Rect>
            <Rect layout direction={'row'} gap={12} alignItems={'center'}>
              <Txt fontFamily={THEME.fonts.mono} fontSize={14} fill={THEME.colors.primary} text={'date:'} />
              <Txt fontFamily={THEME.fonts.mono} fontSize={14} fill={THEME.colors.text} text={'"2017-06-12"'} />
            </Rect>
            <Rect layout direction={'row'} gap={12} alignItems={'center'}>
              <Txt fontFamily={THEME.fonts.mono} fontSize={14} fill={THEME.colors.primary} text={'author:'} />
              <Txt fontFamily={THEME.fonts.mono} fontSize={14} fill={THEME.colors.text} text={'"Vaswani et al."'} />
            </Rect>
            <Rect layout direction={'row'} gap={12} alignItems={'center'}>
              <Txt fontFamily={THEME.fonts.mono} fontSize={14} fill={THEME.colors.primary} text={'topic:'} />
              <Txt fontFamily={THEME.fonts.mono} fontSize={14} fill={THEME.colors.text} text={'"NLP / Transformers"'} />
            </Rect>
          </Rect>
        </Card>

        {/* Filter badges below */}
        <Rect ref={filter1Ref} x={-240} y={200} opacity={0}>
          <Badge text={'FILTER: date > 2020'} color={THEME.colors.warning} />
        </Rect>
        <Rect ref={filter2Ref} x={60} y={200} opacity={0}>
          <Badge text={'FILTER: topic = NLP'} color={THEME.colors.cyan} />
        </Rect>
        <Rect ref={filter3Ref} x={360} y={200} opacity={0}>
          <Badge text={'FILTER: source = arxiv'} color={THEME.colors.purple} />
        </Rect>
        <Audio
          src="/audio/female/step_12.wav"
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
  const elapsedTime = 19.2;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[12] - elapsedTime
  );
  yield* all(
    cameraRef().scale(1.04, ragDurationsFemale[12]),
    cameraRef().position.y(10, ragDurationsFemale[12]),

    chain(
      waitFor(1),

      fadeIn(titleRef(), 0.6),
      waitFor(2),

      // Pop in document and metadata cards
      all(
        popIn(docCardRef(), 2),
        chain(waitFor(2), slideInFrom(metaCardRef(), 60, 0, 2))
      ),
      waitFor(2),

      // Slide in filter badges
      all(
        slideInFrom(filter1Ref(), 0, 30, 2),
        chain(waitFor(2), slideInFrom(filter2Ref(), 0, 30, 2)),
        chain(waitFor(2), slideInFrom(filter3Ref(), 0, 30, 2))
      ),
      waitFor(2),

      fadeIn(captionRef(), 2),
      typeText(
        captionTxt,
        'Metadata tags each chunk with source, date, and topic — enabling pre-filtering before vector search.',
        2.6
      ),

      waitFor(remainingTime)
    )
  );
});
