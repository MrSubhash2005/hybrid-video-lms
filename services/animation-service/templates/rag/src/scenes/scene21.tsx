import { makeScene2D, Rect, Txt, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Vector } from '../components/Vector';
import { Caption } from '../components/Caption';
import { popIn } from '../animations/pop';
import { fadeIn } from '../animations/fade';
import { slideInFrom } from '../animations/slide';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene21', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const denseColRef = createRef<Rect>();
  const sparseColRef = createRef<Rect>();
  const dividerRef = createRef<Rect>();

  const pro1Ref = createRef<Rect>();
  const pro2Ref = createRef<Rect>();
  const con1Ref = createRef<Rect>();
  const con2Ref = createRef<Rect>();

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
            fill={THEME.colors.text}
            text={'Dense vs Sparse Retrieval'}
          />
        </Rect>
        <Audio
          src="/audio/female/step_14.wav"
          play
        />

        {/* Dense column */}
        <Rect
          ref={denseColRef}
          layout
          direction={'column'}
          gap={20}
          x={-330}
          y={10}
          alignItems={'center'}
          opacity={0}
        >
          <Badge text={'DENSE RETRIEVAL'} color={THEME.colors.cyan} />
          <Vector values={[0.82, -0.41, 0.09, 0.95]} glow={true} />
          <Card width={320} height={100} alignItems={'center'} justifyContent={'center'}>
            <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.success} fontWeight={700} text={'✓ Understands paraphrases'} marginBottom={6} />
            <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.success} fontWeight={700} text={'✓ Language-agnostic'} />
          </Card>
          <Card width={320} height={80} alignItems={'center'} justifyContent={'center'}>
            <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.error} fontWeight={700} text={'✗ Expensive to index'} marginBottom={4} />
            <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.error} fontWeight={700} text={'✗ Can hallucinate matches'} />
          </Card>
        </Rect>

        {/* Vertical divider */}
        <Rect ref={dividerRef} x={0} y={30} width={2} height={350} fill={'rgba(148,163,184,0.2)'} opacity={0} />

        {/* Sparse column */}
        <Rect
          ref={sparseColRef}
          layout
          direction={'column'}
          gap={20}
          x={330}
          y={10}
          alignItems={'center'}
          opacity={0}
        >
          <Badge text={'SPARSE RETRIEVAL'} color={THEME.colors.warning} />
          <Card width={320} height={60} alignItems={'center'} justifyContent={'center'}>
            <Txt fontFamily={THEME.fonts.mono} fontSize={16} fill={THEME.colors.text} text={'BM25(q, d) = Σ IDF · TF'} />
          </Card>
          <Card width={320} height={100} alignItems={'center'} justifyContent={'center'}>
            <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.success} fontWeight={700} text={'✓ Fast & lightweight'} marginBottom={6} />
            <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.success} fontWeight={700} text={'✓ Exact term precision'} />
          </Card>
          <Card width={320} height={80} alignItems={'center'} justifyContent={'center'}>
            <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.error} fontWeight={700} text={'✗ Misses synonyms'} marginBottom={4} />
            <Txt fontFamily={THEME.fonts.main} fontSize={15} fill={THEME.colors.error} fontWeight={700} text={'✗ No semantic reasoning'} />
          </Card>
        </Rect>

        {/* Caption */}
        <Caption
          ref={captionRef}
          text={''}
          y={400}
          opacity={0}
        />

      </Rect>
    </Background>
  );

  const captionTxt = captionRef().children()[0] as Txt;
  const elapsedTime = 5.9;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[14] - elapsedTime
  );
  yield* all(
    cameraRef().scale(1.04, ragDurationsFemale[14]),
    cameraRef().position.x(5, ragDurationsFemale[14]),
    chain(
      waitFor(0.4),

      fadeIn(titleRef(), 0.6),
      waitFor(0.3),

      fadeIn(dividerRef(), 0.4),

      all(
        slideInFrom(denseColRef(), -60, 0, 0.7),
        chain(waitFor(0.2), slideInFrom(sparseColRef(), 60, 0, 0.7))
      ),
      waitFor(0.5),

      fadeIn(captionRef(), 0.5),
      typeText(
        captionTxt,
        'Dense retrieval captures meaning but is compute-heavy. Sparse retrieval is fast but keyword-bound. Use both together.',
        2.8
      ),

      waitFor(remainingTime)
    )
  );
});
