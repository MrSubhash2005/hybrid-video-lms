import { makeScene2D, Rect, Txt, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Caption } from '../components/Caption';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene20', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const denseCardRef = createRef<Rect>();
  const sparseCardRef = createRef<Rect>();
  const hybridCardRef = createRef<Rect>();

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
            text={'Retriever Types'}
          />
        </Rect>

        {/* Dense Retriever */}
        <Card
          ref={denseCardRef}
          x={-420}
          y={10}
          width={340}
          height={300}
          opacity={0}
          glowColor={THEME.colors.cyan}
          showGlow={true}
        >
          <Badge text={'DENSE'} color={THEME.colors.cyan} marginBottom={16} />
          <Txt fontFamily={THEME.fonts.main} fontSize={20} fontWeight={700} fill={THEME.colors.text} text={'Vector Embeddings'} textAlign={'center'} marginBottom={12} />
          <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.textMuted} text={'Uses neural networks to encode queries and documents into dense vectors for semantic matching.'} textWrap={true} textAlign={'center'} />
          <Txt fontFamily={THEME.fonts.main} fontSize={14} fontWeight={700} fill={THEME.colors.cyan} text={'e.g. DPR, E5, BGE'} marginTop={12} />
        </Card>

        {/* Sparse Retriever */}
        <Card
          ref={sparseCardRef}
          x={0}
          y={10}
          width={340}
          height={300}
          opacity={0}
          glowColor={THEME.colors.warning}
        >
          <Badge text={'SPARSE'} color={THEME.colors.warning} marginBottom={16} />
          <Txt fontFamily={THEME.fonts.main} fontSize={20} fontWeight={700} fill={THEME.colors.text} text={'Keyword Matching'} textAlign={'center'} marginBottom={12} />
          <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.textMuted} text={'Uses TF-IDF or BM25 to score documents by exact keyword frequency and inverse rarity.'} textWrap={true} textAlign={'center'} />
          <Txt fontFamily={THEME.fonts.main} fontSize={14} fontWeight={700} fill={THEME.colors.warning} text={'e.g. BM25, TF-IDF'} marginTop={12} />
        </Card>
        <Audio
          src="/audio/female/step_13.wav"
          play
        />

        {/* Hybrid Retriever */}
        <Card
          ref={hybridCardRef}
          x={420}
          y={10}
          width={340}
          height={300}
          opacity={0}
          glowColor={THEME.colors.success}
          showGlow={true}
        >
          <Badge text={'HYBRID'} color={THEME.colors.success} marginBottom={16} />
          <Txt fontFamily={THEME.fonts.main} fontSize={20} fontWeight={700} fill={THEME.colors.text} text={'Best of Both'} textAlign={'center'} marginBottom={12} />
          <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.textMuted} text={'Merges dense and sparse results with Reciprocal Rank Fusion for higher precision.'} textWrap={true} textAlign={'center'} />
          <Txt fontFamily={THEME.fonts.main} fontSize={14} fontWeight={700} fill={THEME.colors.success} text={'e.g. RRF, LangChain'} marginTop={12} />
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
  const elapsedTime = 17.4;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[13] - elapsedTime
  );

  yield* all(
    cameraRef().scale(1.04, ragDurationsFemale[13]),
    cameraRef().position.y(-10, ragDurationsFemale[13]),

    chain(
      waitFor(1),

      fadeIn(titleRef(), 0.6),
      waitFor(2),

      // Pop in all three cards with stagger
      all(
        popIn(denseCardRef(), 2),
        chain(waitFor(4), popIn(sparseCardRef(), 2)),
        chain(waitFor(6), popIn(hybridCardRef(), 2))
      ),
      waitFor(2),

      fadeIn(captionRef(), 2),
      typeText(
        captionTxt,
        'Dense retrievers understand meaning; sparse retrievers match keywords; hybrid combines both for superior recall.',
        2.8
      ),

      waitFor(remainingTime)
    )
  );
});
