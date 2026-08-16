import { makeScene2D, Rect, Txt, Line, Audio } from '@revideo/2d';
import { all, chain, createRef, waitFor } from '@revideo/core';
import { THEME } from '../utils/theme';
import { Background } from '../components/Background';
import { Badge } from '../components/Badge';
import { Caption } from '../components/Caption';
import { fadeIn } from '../animations/fade';
import { drawIn } from '../animations/draw';
import { popIn } from '../animations/pop';
import { typeText } from '../animations/typing';
import { ragDurationsFemale } from '../rag_durations_female';

export default makeScene2D('scene26', function* (view) {
  const cameraRef = createRef<Rect>();
  const titleRef = createRef<Rect>();

  const adv1Ref = createRef<Rect>();
  const adv2Ref = createRef<Rect>();
  const adv3Ref = createRef<Rect>();
  const adv4Ref = createRef<Rect>();
  const adv5Ref = createRef<Rect>();

  const check1Ref = createRef<Line>();
  const check2Ref = createRef<Line>();
  const check3Ref = createRef<Line>();
  const check4Ref = createRef<Line>();
  const check5Ref = createRef<Line>();

  const badgeRef = createRef<Rect>();
  const captionRef = createRef<Rect>();

  view.add(
    <Background>
      <Rect ref={cameraRef} size={['100%', '100%']} justifyContent={'center'} alignItems={'center'}>

        {/* Title */}
        <Rect ref={titleRef} y={-380} opacity={0}>
          <Txt
            fontFamily={THEME.fonts.main}
            fontSize={48}
            fontWeight={800}
            fill={THEME.colors.success}
            text={'Advantages of RAG'}
          />
        </Rect>
        <Audio
          src="/audio/female/step_19.wav"
          play
        />

        {/* List container */}
        <Rect layout direction={'column'} gap={22} y={-60} alignItems={'start'} x={-100}>

          <Rect ref={adv1Ref} layout direction={'row'} gap={20} alignItems={'center'} opacity={0}>
            <Line ref={check1Ref} points={[[0, 10], [8, 18], [24, 2]]} stroke={THEME.colors.success} lineWidth={4} end={0} />
            <Txt fontFamily={THEME.fonts.main} fontSize={26} fontWeight={700} fill={THEME.colors.text} text={'No retraining needed for new knowledge'} />
          </Rect>

          <Rect ref={adv2Ref} layout direction={'row'} gap={20} alignItems={'center'} opacity={0}>
            <Line ref={check2Ref} points={[[0, 10], [8, 18], [24, 2]]} stroke={THEME.colors.success} lineWidth={4} end={0} />
            <Txt fontFamily={THEME.fonts.main} fontSize={26} fontWeight={700} fill={THEME.colors.text} text={'Dramatically reduces hallucination'} />
          </Rect>

          <Rect ref={adv3Ref} layout direction={'row'} gap={20} alignItems={'center'} opacity={0}>
            <Line ref={check3Ref} points={[[0, 10], [8, 18], [24, 2]]} stroke={THEME.colors.success} lineWidth={4} end={0} />
            <Txt fontFamily={THEME.fonts.main} fontSize={26} fontWeight={700} fill={THEME.colors.text} text={'Citeable, verifiable sources'} />
          </Rect>

          <Rect ref={adv4Ref} layout direction={'row'} gap={20} alignItems={'center'} opacity={0}>
            <Line ref={check4Ref} points={[[0, 10], [8, 18], [24, 2]]} stroke={THEME.colors.success} lineWidth={4} end={0} />
            <Txt fontFamily={THEME.fonts.main} fontSize={26} fontWeight={700} fill={THEME.colors.text} text={'Works with private & domain-specific data'} />
          </Rect>

          <Rect ref={adv5Ref} layout direction={'row'} gap={20} alignItems={'center'} opacity={0}>
            <Line ref={check5Ref} points={[[0, 10], [8, 18], [24, 2]]} stroke={THEME.colors.success} lineWidth={4} end={0} />
            <Txt fontFamily={THEME.fonts.main} fontSize={26} fontWeight={700} fill={THEME.colors.text} text={'Cost-effective vs full fine-tuning'} />
          </Rect>

        </Rect>

        {/* Summary badge */}
        <Rect ref={badgeRef} y={230} opacity={0}>
          <Badge text={'RAG = ACCURATE · FRESH · EXPLAINABLE'} color={THEME.colors.success} />
        </Rect>

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
  const elapsedTime = 29.2;

  const remainingTime = Math.max(
    0,
    ragDurationsFemale[19] - elapsedTime
  );

  yield* all(
    cameraRef().scale(1.04, ragDurationsFemale[19]),
    cameraRef().position.y(-5, ragDurationsFemale[19]),

    chain(
      waitFor(1),

      fadeIn(titleRef(), 0.6),
      waitFor(2),

      // Animate list items with checkmarks
      all(fadeIn(adv1Ref(), 2), drawIn(check1Ref(), 2)),
      waitFor(2),
      all(fadeIn(adv2Ref(), 2), drawIn(check2Ref(), 2)),
      waitFor(2),
      all(fadeIn(adv3Ref(), 2), drawIn(check3Ref(), 2)),
      waitFor(2),
      all(fadeIn(adv4Ref(), 2), drawIn(check4Ref(), 2)),
      waitFor(2),
      all(fadeIn(adv5Ref(), 2), drawIn(check5Ref(), 2)),
      waitFor(2),

      popIn(badgeRef(), 2),
      waitFor(2),

      fadeIn(captionRef(), 2),
      typeText(
        captionTxt,
        'RAG makes LLMs accurate, current, and cost-effective — without expensive retraining or fine-tuning cycles.',
        2.6
      ),

      waitFor(remainingTime)
    )
  );
});
